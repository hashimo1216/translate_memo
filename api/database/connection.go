package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"translate_memo/models"
)

var DB *gorm.DB

func Connect() {
	jawsdbURL := os.Getenv("JAWSDB_URL")
	if jawsdbURL == "" {
		panic("JAWSDB_URL environment variable not set")
	}

	connection, err := gorm.Open(mysql.Open(jawsdbURL), &gorm.Config{})

	if err != nil {
		panic("Could not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{}, &models.Folder{}, &models.Memo{})
}
