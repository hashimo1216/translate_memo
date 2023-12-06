package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"translate_memo/database"
	"translate_memo/models"
	"translate_memo/utils"
)

func AddFolderHandler(c *gin.Context) {
	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

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

	folder := models.Folder{
		Name:         data["folderName"],
		LanguageKey:  data["languageKey"],
		NationalFlag: data["nationalFlag"],
		UserID:       userID,
	}

	if err := database.DB.Create(&folder).Error; err != nil {
		c.JSON(500, gin.H{"message": "Failed to create folder"})
		return
	}

	c.JSON(200, folder)
}

func EditFolderHandler(c *gin.Context) {
	folderID := c.Param("id")
	if folderID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "folderID is required"})
	}

	id, err := strconv.ParseUint(folderID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Folder ID"})
		return
	}

	var nameData map[string]string

	if err := c.BindJSON(&nameData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid folder data"})
		return
	}

	if err := database.EditFolder(id, nameData["name"]); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to edit folder"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Folder edited successfully"})
}

func DeleteFolderHandler(c *gin.Context) {
	folderID := c.Param("id")
	if folderID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "folderID is required"})
		return
	}

	id, err := strconv.ParseUint(folderID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Folder ID"})
		return
	}

	if err := database.DeleteFolder(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete folder"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Folder deleted successfully"})
}
