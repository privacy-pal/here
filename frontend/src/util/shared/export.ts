import { useAllGrades } from "api/grades/hooks";
import { ExportToCsv } from 'export-to-csv';
import { Assignment } from "model/assignment";
import { Course } from "model/course";
import { Section } from "model/section";
import { formatSectionTime, formatSurveyTime } from "./formatTime";
import listToMap from "./listToMap";
import { SurveyResponse } from "model/survey";

const options = {
    filename: "",
    fieldSeparator: ',',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
};

export function exportGrades(course: Course, assignments: Assignment[], invitedStudents?: string[], percentage: boolean = false) {
    options.filename = `${course.code}_grades`

    useAllGrades(course.ID, assignments.map((a) => a.ID)).then((grades) => {
        let data = [];
        for (const student of Object.values(course.students)) {
            let entry = {
                "name": student.displayName,
                "email": student.email,
            }
            for (const assignment of assignments) {
                const assignmentGrades = grades[assignment.ID];
                let grade = student.studentID in assignmentGrades ? assignmentGrades[student.studentID].grade : undefined;
                if (percentage) {
                    grade = grade ? grade / assignment.maxScore * 100 : undefined;
                }
                entry[assignment.name.toLowerCase()] = grade ? grade : "N/A";
            }
            data.push(entry);
        }

        if (invitedStudents) {
            for (const email of invitedStudents) {
                let entry = {
                    "name": getNameFromEmail(email),
                    "email": email,
                }
                for (const assignment of assignments) {
                    entry[assignment.name.toLowerCase()] = "N/A";
                }
                data.push(entry);
            }
        }

        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);

    })

}

export function exportStudentList(course: Course, invitedStudents?: string[]) {
    options.filename = `${course.code}_student_list`
    let data = [];
    for (const student of Object.values(course.students)) {
        data.push({
            "name": student.displayName,
            "email": student.email,
            "section": student.defaultSection !== "" ? student.defaultSection : "N/A",
        });
    }

    if (invitedStudents) {
        for (const email of invitedStudents) {
            data.push({
                "name": getNameFromEmail(email),
                "email": email,
                "section": "N/A",
            });
        }
    }

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
}

// get the student name by parsing the email, and getting rid of any numbers
// e.g. jenny_yu2@brown.edu -> Jenny Yu
const getNameFromEmail = (email: string): string => {
    return email.split("@")[0].split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ").replace(/[0-9]/g, '')
}

export function exportSurveyResults(results: Record<string, string[]>, sections: Section[]) {
    const sectionsMap = listToMap(sections) as Record<string, Section>;
    options.filename = `survey_results`
    let data = [];
    for (const sectionID of Object.keys(results)) {
        const section = sectionsMap[sectionID];
        data.push({
            "section": formatSectionTime(section),
            "location": section.location,
            "students": results[sectionID].join(",").replace(/\s+/g, ''),
        });
    }

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
}

export function exportSurveyResponses(responses: SurveyResponse[]) {
    options.filename = `survey_responses`
    let data = [];
    for (const response of responses) {
        data.push({
            "name": response.name,
            "email": response.email,
            "availability": response.availability.map((a) => formatSurveyTime(a).replace(/\s+/g, '')).join(",")
        });
    }
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);

}