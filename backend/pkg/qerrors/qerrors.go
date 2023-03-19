package qerrors

import "errors"

var (
	// Generic errors
	InvalidBody = errors.New("invalid body")

	// Course errors
	CourseNotFoundError      = errors.New("course not found")
	SectionNotFoundError     = errors.New("section not found")
	AssignmentNotFoundError  = errors.New("assignment not found")
	SurveyNotFoundError      = errors.New("survey not found")
	CourseAlreadyExistsError = errors.New("course already exists")

	// User errors
	DeleteUserError    = errors.New("an error occurred while deleting user")
	UserNotFoundError  = errors.New("user not found")
	InvalidEmailError  = errors.New("invalid Brown email address")
	InvalidDisplayName = errors.New("invalid display name provided")
)
