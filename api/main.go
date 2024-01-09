package main

import (
	"os"
	"translate_memo/database"
	"translate_memo/routes"
)

func main() {
	database.Connect()

	r := routes.Setup()
	r.Run()
}
