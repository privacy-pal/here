package privacy

import (
	"cloud.google.com/go/firestore"
	pal "github.com/privacy-pal/privacy-pal/go/pkg"
)

func accessAssignment(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) map[string]interface{} {
	data := map[string]interface{}{
		"name":        dbObj["name"],
		"optional":    dbObj["optional"],
		"maxScore":    dbObj["maxScore"],
		"releaseDate": dbObj["releaseDate"],
		"dueDate":     dbObj["dueDate"],
		"grade":       dbObj["grades"].(map[string]interface{})[dataSubjectId],
	}

	return data
}

func deleteAssignment(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (nodesToTraverse []pal.Locator, deleteNode bool, fieldsToUpdate pal.FieldUpdates, err error) {
	deleteNode = false

	// remove grades[dataSubjectId] if exists
	fieldsToUpdate = pal.FieldUpdates{
		FirestoreUpdates: []firestore.Update{
			{
				Path:  "grades." + dataSubjectId,
				Value: firestore.Delete,
			},
		},
	}

	return
}
