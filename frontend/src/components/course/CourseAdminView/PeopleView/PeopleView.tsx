import SearchBar from "@components/shared/SearchBar/SearchBar";
import SelectMenu from "@components/shared/SelectMenu/SelectMenu";
import { Stack, Typography } from "@mui/material";
import { filterStudentsBySearchQuery } from "@util/shared/formatStudentsList";
import formatSectionInfo from "@util/shared/formatSectionInfo";
import getStudentsInSection, { ALL_STUDENTS, UNASSIGNED } from "@util/shared/getStudentsInSection";
import listToMap from "@util/shared/listToMap";
import { useSections } from "api/section/hooks";
import { Course } from "model/course";
import { Section } from "model/section";
import { useEffect, useState } from "react";
import PeopleTable from "./PeopleTable";
import { useAssignments } from "api/assignment/hooks";

export interface PeopleViewProps {
  course: Course;
}

export default function PeopleView({ course }: PeopleViewProps) {
  const [sections, sectionsLoading] = useSections(course.ID)
  const [sectionsMap, setSectionsMap] = useState<Record<string, Section>>(undefined)
  const [assignments, loading] = useAssignments(course.ID);
  const [filterBySection, setFilterBySection] = useState<string>(ALL_STUDENTS)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    sections && setSectionsMap(listToMap(sections) as Record<string, Section>)
  }, [sections])

  const sectionOptions = () => {
    let options = [ALL_STUDENTS, UNASSIGNED]
    sectionsMap && Object.keys(sectionsMap).forEach((sectionID) => {
      options.push(sectionID)
    })
    return options
  }

  const formatOptions = (val: string | undefined) => {
    if (val === ALL_STUDENTS) return ALL_STUDENTS
    if (val === UNASSIGNED) return UNASSIGNED
    return formatSectionInfo(sectionsMap[val], true)
  }

  const filterStudentsBySection = () => {
    // get students based on filtered section
    let studentIDs = []
    if (!filterBySection) {
      studentIDs = course.students ? Object.keys(course.students) : []
    } else {
      if (!course.students) return []
      studentIDs = getStudentsInSection(course.students, filterBySection)
    }
    return studentIDs.map((studentID) => course.students[studentID])
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={1} alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          People
        </Typography>
        <Stack direction="row" alignItems="center">
          <SelectMenu
            value={filterBySection}
            formatOption={formatOptions}
            options={sectionOptions()}
            onSelect={(val) => setFilterBySection(val)}
          />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Stack>
      </Stack >
      {!course.students || Object.keys(course.students).length === 0 ?
        <Typography mt={3} textAlign="center">No students have joined this course yet.</Typography> :
        (sectionsMap && assignments &&
          <PeopleTable {...{ course, assignments, sectionsMap }} students={filterStudentsBySearchQuery(filterStudentsBySection(), searchQuery)} />)

      }
    </>
  );
}
