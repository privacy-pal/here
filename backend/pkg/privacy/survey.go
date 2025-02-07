package privacy

import (
	"fmt"

	"cloud.google.com/go/firestore"
	pal "github.com/privacy-pal/privacy-pal/go/pkg"
)

func handleAccessSurvey(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (data map[string]interface{}, err error) {
	data = map[string]interface{}{
		"name":        dbObj["name"],
		"description": dbObj["description"],
		"endTime":     dbObj["endTime"],
		"options":     dbObj["options"],
		"responses":   dbObj["responses"].(map[string]interface{})[dataSubjectId],
	}

	return
}

func handleDeleteSurvey(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (nodesToTraverse []pal.Locator, deleteNode bool, fieldsToUpdate pal.FieldUpdates, err error) {
	deleteNode = false

	// remove responses[dataSubjectId] if exists
	updates := []firestore.Update{
		{
			Path:  "responses." + dataSubjectId,
			Value: firestore.Delete,
		},
	}

	// remove the result of dataSubjectId from each entry in results
	results, ok := dbObj["results"].(map[string]interface{})
	if ok { // result could be nil if no results
		for option, data := range results {
			courseUserData, ok := data.([]interface{})
			if !ok {
				err = fmt.Errorf("courseUserData is not a []interface{}")
				return
			}
			for _, data := range courseUserData {
				cud, ok := data.(map[string]interface{})
				if !ok {
					err = fmt.Errorf("cud is not a map[string]interface{}")
					return
				}
				if cud["studentID"] == dataSubjectId {
					updates = append(updates, firestore.Update{
						Path:  "results." + option,
						Value: firestore.ArrayRemove(data),
					})
				}
			}
		}
	}

	fieldsToUpdate = pal.FieldUpdates{
		FirestoreUpdates: updates,
	}

	return
}
