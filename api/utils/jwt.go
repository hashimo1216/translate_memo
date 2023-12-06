package utils

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"strconv"
	"time"
)

func GenerateJWT(userID uint) (string, error) {

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    strconv.Itoa(int(userID)),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
	})

	token, err := claims.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return token, nil
}

func GetUserIDFromJWT(tokenString string) (uint, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID, exists := claims["iss"]
		if !exists {
			return 0, errors.New("UserID claims not found in JWT")
		}

		userIDStr, ok := userID.(string)
		if !ok {
			return 0, errors.New("Invalid format for UserID in JWT")
		}

		userIDUint64, err := strconv.ParseUint(userIDStr, 10, 64)
		if err != nil {
			return 0, errors.New("Invalid format for UserID in JWT")
		}

		return uint(userIDUint64), nil
	}

	return 0, errors.New("Unable to extract userID from JWT")
}
