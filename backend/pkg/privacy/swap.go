package privacy

import (
	pal "github.com/privacy-pal/privacy-pal/go/pkg"
)

func handleAccessSwap(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (data map[string]interface{}, err error) {
	data = map[string]interface{}{
		"oldSectionID": dbObj["oldSectionID"],
		"newSectionID": dbObj["newSectionID"],
		"assignmentID": dbObj["assignmentID"],
		"requestTime":  dbObj["requestTime"],
		"handledTime":  dbObj["handledTime"],
		"reason":       dbObj["reason"],
		"status":       dbObj["status"],
		"handledBy":    dbObj["handledBy"],
	}

	return
}

func handleDeleteSwap(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (nodesToTraverse []pal.Locator, deleteNode bool, fieldsToUpdate pal.FieldUpdates, err error) {
	deleteNode = true
	return
}
