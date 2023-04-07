package auth

import (
	"context"
	"net/http"

	"github.com/fullstackatbrown/here/pkg/models"
	"github.com/fullstackatbrown/here/pkg/qerrors"
	"github.com/fullstackatbrown/here/pkg/repository"
	"github.com/go-chi/chi/v5"
)

// RequireAuth is a middleware that rejects requests without a valid session cookie. The User associated with the
// request is added to the request context, and can be accessed via GetUserFromRequest.

// AuthCtx is a middleware that extracts the user's session cookie, verifies it, and places the current
// user into the context used for the rest of the request.
func AuthCtx() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// tokenCookie, err := r.Cookie(config.Config.SessionCookieName)
			// if err != nil {
			// 	// Missing session cookie.
			// 	rejectUnauthorizedRequest(w)
			// 	return
			// }

			userID := chi.URLParam(r, "userID")

			// Verify the session cookie. In this case an additional check is added to detect
			// if the user's Firebase session was revoked, user deleted/disabled, etc.

			// TODO: verify session cookie
			// user, err := repository.Repository.GetUserByID(userID)
			// if err != nil {
			// 	// Missing session cookie.
			// 	rejectUnauthorizedRequest(w)
			// 	return
			// }

			// For testing only
			user, err := repository.Repository.GetProfileById(userID)
			if err != nil {
				http.Error(w, "testing error: user doesnt exist", http.StatusUnauthorized)
				return
			}

			// create a new request context containing the authenticated user
			ctxWithUser := context.WithValue(r.Context(), "currentUser", user)
			rWithUser := r.WithContext(ctxWithUser)

			next.ServeHTTP(w, rWithUser)
		})
	}
}

// func RequireAdmin() func(http.Handler) http.Handler {
// 	return func(next http.Handler) http.Handler {
// 		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 			user, err := GetUserFromRequest(r)
// 			if err != nil {
// 				rejectUnauthorizedRequest(w)
// 				return
// 			}

// 			if !user.IsAdmin {
// 				rejectForbiddenRequest(w)
// 				return
// 			}

// 			next.ServeHTTP(w, r)
// 		})
// 	}
// }

// GetUserFromRequest returns a User if it exists within the request context. Only works with routes that implement the
// RequireAuth middleware.
// func GetUserFromRequest(r *http.Request) (*models.User, error) {
// 	user := r.Context().Value("currentUser").(*models.User)
// 	if user != nil {
// 		return user, nil
// 	}

// 	return nil, qerrors.UserNotFoundError
// }

// Testing Only
func GetUserFromRequest(r *http.Request) (*models.Profile, error) {
	user := r.Context().Value("currentUser").(*models.Profile)
	if user != nil {
		return user, nil
	}

	return nil, qerrors.UserNotFoundError
}

// Helpers

func rejectUnauthorizedRequest(w http.ResponseWriter) {
	http.Error(w, "You must be authenticated to access this resource", http.StatusUnauthorized)
}

func rejectForbiddenRequest(w http.ResponseWriter) {
	http.Error(w, "You do not have permission to access this resource", http.StatusForbidden)
}
