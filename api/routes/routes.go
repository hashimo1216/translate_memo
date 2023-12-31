package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"translate_memo/controllers"
	"translate_memo/database"
	"translate_memo/middleware"
)

func Setup() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Content-Type"}
	config.AllowOrigins = []string{"https://translate-memo.onrender.com"}

	r.Use(cors.New(config))

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the API!",
		})
	})

	r.POST("/api/signup", controller.Signup)
	r.POST("/api/login", controller.Login)
	r.POST("/api/logout", controller.Logout)
	r.POST("/api/add_folder", controller.AddFolderHandler)
	r.GET("/api/fetch_folders", middleware.AuthMiddleware, database.GetUserFolders)
	r.PUT("/api/edit_folder/:id", controller.EditFolderHandler)
	r.DELETE("api/delete_folder/:id", controller.DeleteFolderHandler)
	r.POST("/api/save_memo", controller.SaveMemoHandler)
	r.DELETE("/api/delete_memo/:id", controller.DeleteMemoHandler)

	return r
}
