package database

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"translate_memo/models"
	"translate_memo/utils"
)

// Folder
func GetUserFolders(c *gin.Context) {
	tokenString, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, err := utils.GetUserIDFromJWT(tokenString)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var user models.User

	if err := DB.Preload("Folders").Where("id = ?", userID).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, []models.Folder{})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	folders := user.Folders

	for i := range folders {
		if folders[i].ID != 0 {
			if err := DB.Model(&folders[i]).Association("Memos").Find(&folders[i].Memos); err != nil {
				if err == gorm.ErrRecordNotFound {
					folders[i].Memos = []models.Memo{} // Set an empty slice if no memos found
				} else {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
			}
		}
	}

	c.JSON(200, folders)
}

func EditFolder(id uint64, nameData string) error {
	var existingFolder models.Folder

	if err := DB.First(&existingFolder, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return fmt.Errorf("Folder not found")
		}
		return err
	}

	existingFolder.Name = nameData

	if err := DB.Save(&existingFolder).Error; err != nil {
		return err
	}

	return nil
}

func DeleteFolder(id uint64) error {
	var folder models.Folder

	if err := DB.First(&folder, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return fmt.Errorf("Folder not found")
		}
		return err
	}

	if err := DB.Where("folder_id = ?", id).Delete(&models.Memo{}).Error; err != nil {
		return err
	}

	if err := DB.Delete(&folder).Error; err != nil {
		return err
	}

	return nil
}

// Memo
func DeleteMemo(id uint64) error {
	var memo models.Memo

	if err := DB.First(&memo, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return fmt.Errorf("Memo not found")
		}
		return err
	}

	if err := DB.Delete(&memo).Error; err != nil {
		return err
	}

	return nil
}
