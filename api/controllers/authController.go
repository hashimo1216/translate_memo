package controller

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"translate_memo/database"
	"translate_memo/models"
	"translate_memo/utils"
)

func Signup(c *gin.Context) {

	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var existingUser models.User
	if err := database.DB.Where("email = ?", data["email"]).First(&existingUser).Error; err == nil {
		c.JSON(409, gin.H{"error": "メールは既に使用されています。"})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not signin"})
	}

	c.SetCookie("jwt", token, 900, "/", "onrender.com", true, true)
}

func Login(c *gin.Context) {
	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.JSON(401, gin.H{"error": "Incorrect password"})
		return
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not login"})
		return
	}

	c.SetCookie("jwt", token, 900, "/", "onrender.com", true, true)

	if err != nil {
		c.JSON(500, gin.H{"message": "Failed to get user folders"})
		return
	}

	c.Status(200)
}

func Logout(c *gin.Context) {
	c.SetCookie("jwt", "", -3600, "/", "onrender.com", true, true)
	c.JSON(200, gin.H{"message": "logout"})
}
