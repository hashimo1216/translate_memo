package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthMiddleware(c *gin.Context) {
	tokenString, err := c.Cookie("jwt")
	if err != nil || tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	c.Next()
}
