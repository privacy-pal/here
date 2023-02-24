package router

import (
	"encoding/json"
	"net/http"

	"github.com/fullstackatbrown/here/pkg/middleware"
	"github.com/fullstackatbrown/here/pkg/models"
	repo "github.com/fullstackatbrown/here/pkg/repository"
	"github.com/fullstackatbrown/here/pkg/utils"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func CourseRoutes() *chi.Mux {
	router := chi.NewRouter()
	// TODO: All course routes require authentication.
	// router.Use(middleware.AuthCtx())

	// router.With(auth.RequireAdmin()).Post("/", createCourseHandler)
	router.Post("/", createCourseHandler)
	router.Route("/{courseID}", func(r chi.Router) {
		r.Use(middleware.CourseCtx())

		r.Get("/", getCourseHandler)
		r.Delete("/", deleteCourseHandler)
		r.Patch("/", updateCourseHandler)
		r.Post("/assignSections", assignSectionsHandler)

		r.Mount("/sections", SectionRoutes())
		r.Mount("/assignments", AssignmentRoutes())
		r.Mount("/swaps", SwapRoutes())
	})

	return router
}

func getCourseHandler(w http.ResponseWriter, r *http.Request) {
	courseID := r.Context().Value("courseID").(string)

	course, err := repo.Repository.GetCourseByID(courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	render.JSON(w, r, course)
}

func createCourseHandler(w http.ResponseWriter, r *http.Request) {

	var req *models.CreateCourseRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	c, err := repo.Repository.CreateCourse(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	render.JSON(w, r, c)
}

func deleteCourseHandler(w http.ResponseWriter, r *http.Request) {
	courseID := r.Context().Value("courseID").(string)

	err := repo.Repository.DeleteCourse(&models.DeleteCourseRequest{CourseID: courseID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Successfully deleted course " + courseID))
}

// DELETE: /{courseID}
func updateCourseHandler(w http.ResponseWriter, r *http.Request) {
	courseID := r.Context().Value("courseID").(string)

	// TODO:

	w.WriteHeader(200)
	w.Write([]byte("Successfully updated course " + courseID))
}

func assignSectionsHandler(w http.ResponseWriter, r *http.Request) {
	courseID := r.Context().Value("courseID").(string)
	course, err := repo.Repository.GetCourseByID(courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	survey, err := repo.Repository.GetSurveyByID(course.SurveyID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res, _ := utils.AssignSections(survey.Capacity, survey.Responses)
	render.JSON(w, r, res)
}
