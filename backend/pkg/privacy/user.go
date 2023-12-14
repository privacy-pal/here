package privacy

import (
	"fmt"

	"github.com/fullstackatbrown/here/pkg/models"
	pal "github.com/privacy-pal/privacy-pal/go/pkg"
)

func accessUser(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) map[string]interface{} {
	data := map[string]interface{}{
		"name":          dbObj["displayName"],
		"email":         dbObj["email"],
		"photoUrl":      dbObj["photoUrl"],
		"isAdmin":       dbObj["isAdmin"],
		"notifications": dbObj["notifications"],
	}

	slice, ok := dbObj["courses"].([]interface{})
	if !ok {
		return data
	}
	courses := make([]string, len(slice))
	for i, v := range slice {
		course, ok := v.(string)
		if !ok {
			return data
		}
		courses[i] = course
	}

	courseMap := make(map[string]pal.Locator)
	for _, courseID := range courses {
		courseMap[courseID] = pal.Locator{
			LocatorType: pal.Document,
			DataType:    CourseDataType,
			FirestoreLocator: pal.FirestoreLocator{
				CollectionPath: []string{models.FirestoreCoursesCollection},
				DocIDs:         []string{courseID},
			},
		}
	}
	data["courses"] = courseMap

	sections, ok := dbObj["defaultSections"].(map[string]interface{})
	if !ok {
		return data
	}
	data["defaultSections"] = []pal.Locator{}
	for courseID, sectionID := range sections {
		data["defaultSections"] = append(data["defaultSections"].([]pal.Locator), pal.Locator{
			LocatorType: pal.Document,
			DataType:    SectionDataType,
			FirestoreLocator: pal.FirestoreLocator{
				CollectionPath: []string{models.FirestoreCoursesCollection, models.FirestoreSectionsCollection},
				DocIDs:         []string{courseID, sectionID.(string)},
			},
		})
	}

	return data
}

func deleteUser(dataSubjectId string, currentDbObjLocator pal.Locator, dbObj pal.DatabaseObject) (nodesToTraverse []pal.Locator, deleteNode bool, fieldsToUpdate pal.FieldUpdates, err error) {
	deleteNode = true

	// add courses to nodesToTraverse
	slice, ok := dbObj["courses"].([]interface{})
	if !ok {
		err = fmt.Errorf("courses field is not a slice")
		return
	}
	courses := make([]string, len(slice))
	for i, v := range slice {
		course, ok := v.(string)
		if !ok {
			err = fmt.Errorf("elements in course field is not a string")
			return
		}
		courses[i] = course
	}
	for _, courseID := range courses {
		nodesToTraverse = append(nodesToTraverse, pal.Locator{
			LocatorType: pal.Document,
			DataType:    CourseDataType,
			FirestoreLocator: pal.FirestoreLocator{
				CollectionPath: []string{models.FirestoreCoursesCollection},
				DocIDs:         []string{courseID},
			},
		})
	}

	// add defaultSections to nodesToTraverse
	sections, ok := dbObj["defaultSections"].(map[string]interface{})
	if !ok {
		err = fmt.Errorf("defaultSections field is not a map")
		return
	}
	for courseID, sectionID := range sections {
		nodesToTraverse = append(nodesToTraverse, pal.Locator{
			LocatorType: pal.Document,
			DataType:    SectionDataType,
			FirestoreLocator: pal.FirestoreLocator{
				CollectionPath: []string{models.FirestoreCoursesCollection, models.FirestoreSectionsCollection},
				DocIDs:         []string{courseID, sectionID.(string)},
			},
		})
	}

	// add actualSections to nodesToTraverse
	actualSections, ok := dbObj["actualSections"].(map[string]interface{})
	if !ok {
		err = fmt.Errorf("actualSections field is not a map")
		return
	}
	for courseID, sectionsMap := range actualSections {
		sections, ok := sectionsMap.(map[string]interface{})
		if !ok {
			err = fmt.Errorf("sectionsMap is not a map")
			return
		}
		for _, sectionID := range sections {
			id, ok := sectionID.(string)
			if !ok {
				err = fmt.Errorf("sectionID is not a string")
				return
			}
			nodesToTraverse = append(nodesToTraverse, pal.Locator{
				LocatorType: pal.Document,
				DataType:    SectionDataType,
				FirestoreLocator: pal.FirestoreLocator{
					CollectionPath: []string{models.FirestoreCoursesCollection, models.FirestoreSectionsCollection},
					DocIDs:         []string{courseID, id},
				},
			})
		}
	}

	return
}
