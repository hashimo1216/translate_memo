package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string   `json:"email" gorm:"unique"`
	Password []byte   `json:"-"`
	Folders  []Folder `gorm:"foreignKey:UserID"`
}

type Folder struct {
	gorm.Model
	Name         string `json:"folderName"`
	LanguageKey  string `json:"languageKey"`
	NationalFlag string `json:"nationalFlag"`
	UserID       uint
	Memos        []Memo `gorm:"foreignKey:FolderID"`
}

type Memo struct {
	gorm.Model
	Text           string `json:"text"`
	TranslatedText string `json:"translatedText"`
	FolderID       uint   `json:"folderID"`
}
