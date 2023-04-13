import { Stack, TablePagination, Typography } from "@mui/material";
import { sortRequestsByTime } from "@util/shared/requestTime";
import { Assignment } from "model/assignment";
import { Course } from "model/course";
import { Section } from "model/section";
import { Swap } from "model/swap";
import { User } from "model/user";
import { FC, useState } from "react";
import StudentRequestCard from "./StudentRequestCard";
import SwapRequestDialog from "./SwapRequestDialog";

export interface StudentRequestsListProps {
    course: Course;
    student: User;
    sectionsMap: Record<string, Section>;
    assignmentsMap: Record<string, Assignment>;
    requests: Swap[];
}

const StudentRequestsList: FC<StudentRequestsListProps> = ({ course, student, sectionsMap, assignmentsMap, requests }) => {
    const assignments = Object.values(assignmentsMap)
    const [swapRequestDialog, setSwapRequestDialog] = useState<Swap | undefined>(undefined)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenSwapRequestDialog = (swap: Swap) => {
        setSwapRequestDialog(swap);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        requests && assignmentsMap && sectionsMap &&
        <>
            <SwapRequestDialog
                open={swapRequestDialog !== undefined}
                onClose={() => { setSwapRequestDialog(undefined) }}
                swap={swapRequestDialog}
                {...{ course, assignments, sectionsMap, student }}
            />
            <Stack direction="column" minHeight={60}>
                {requests.length === 0 &&
                    <Typography variant="body1" ml={4} mr={4} mt={1}>You have made no swap requests</Typography>
                }
                {(rowsPerPage > 0 ?
                    sortRequestsByTime(requests).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    sortRequestsByTime(requests)
                )
                    .map((r) => {
                        const student = course.students[r.studentID];
                        const assignment = r.assignmentID ? assignmentsMap[r.assignmentID] : undefined;
                        const oldSection = r.oldSectionID ? sectionsMap[r.oldSectionID] : undefined;
                        const newSection = r.newSectionID ? sectionsMap[r.newSectionID] : undefined;
                        return <StudentRequestCard
                            key={`request${r.ID}`}
                            request={r} courseID={course.ID} student={student} assignment={assignment}
                            oldSection={oldSection} newSection={newSection} pending={r.status === "pending"}
                            handleOpenSwapRequestDialog={handleOpenSwapRequestDialog}
                        />
                    })}
            </Stack>
            <Stack justifyContent="flex-end">
                {requests && requests.length > rowsPerPage &&
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                        count={requests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ border: "none", padding: 0 }}
                    />
                }
            </Stack>
        </>
    );
};

export default StudentRequestsList;
