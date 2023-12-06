package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"translate_memo/database"
	"translate_memo/models"
)

func SaveMemoHandler(c *gin.Context) {
	var data map[string]interface{}

	if err := c.BindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	folderID := data["folderID"].(float64)

	memo := models.Memo{
		Text:           data["text"].(string),
		TranslatedText: data["translatedText"].(string),
		FolderID:       uint(folderID),
	}

	if err := database.DB.Create(&memo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create memo"})
	}

	c.JSON(http.StatusOK, memo)
}

func DeleteMemoHandler(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
		return
	}

	if err := database.DeleteMemo(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete memo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Memo deleted successfully"})
}
