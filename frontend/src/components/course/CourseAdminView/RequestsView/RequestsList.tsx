import { Stack, TablePagination, Typography } from "@mui/material";
import { handleBadRequestError } from "@util/errors";
import { sortRequestsByTime } from "@util/shared/requestTime";
import SwapAPI from "api/swaps/api";
import { Assignment } from "model/assignment";
import { Course, CourseStatus } from "model/course";
import { Section } from "model/section";
import { Swap, SwapStatus } from "model/swap";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import PastRequest from "./PastRequests/PastRequestCard";
import PendingRequest from "./PendingRequests/PendingRequestCard";

export interface RequestsListProps {
  course: Course;
  assignmentsMap: Record<string, Assignment>;
  sectionsMap: Record<string, Section>;
  type: "pending" | "past";
  requests: Swap[];
}

const RequestsList: FC<RequestsListProps> = ({ course, assignmentsMap, sectionsMap, type, requests }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(type === "pending" ? -1 : 5);
  const isCourseArchived = course.status === CourseStatus.CourseArchived

  const handleSwap = (request: Swap, status: SwapStatus) => {
    toast
      .promise(SwapAPI.handleSwap(course.ID, request.ID, status), {
        loading: "Updating request...",
        success: "Request updated!",
        error: (err) => handleBadRequestError(err),
      })
      .catch(() => { });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    requests && (
      <Stack direction="column">
        {requests.length === 0 &&
          (type === "pending" ? (
            <Typography variant="body1" ml={1} mr={4} mt={2} textAlign="center">
              You&apos;ve handled all requests in your inbox!
            </Typography>
          ) : (
            <Typography variant="body1" ml={1} mr={4} mt={2} textAlign="center">
              You have no past requests
            </Typography>
          ))}
        {assignmentsMap &&
          sectionsMap &&
          (rowsPerPage > 0
            ? sortRequestsByTime(requests).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sortRequestsByTime(requests)
          ).map((r) => {
            const student = course.students[r.studentID];
            const assignment = r.assignmentID ? assignmentsMap[r.assignmentID] : undefined;
            const oldSection = r.oldSectionID ? sectionsMap[r.oldSectionID] : undefined;
            const newSection = r.newSectionID ? sectionsMap[r.newSectionID] : undefined;
            // TODO: mark the request as archived if student is no longer enrolled in the course
            // right now it's just not displayed and the count of requests would be off
            return type === "pending" ? (
              <PendingRequest
                key={`request${r.ID}`}
                archived={isCourseArchived}
                request={r}
                student={student}
                assignment={assignment}
                oldSection={oldSection}
                newSection={newSection}
                handleSwap={handleSwap}
              />
            ) : (
              <PastRequest
                key={`request${r.ID}`}
                archived={isCourseArchived}
                request={r}
                student={student}
                assignment={assignment}
                oldSection={oldSection}
                newSection={newSection}
                handleSwap={handleSwap}
              />
            );
          })}

        {rowsPerPage != -1 && requests.length > rowsPerPage && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
            count={requests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ border: "none", padding: 0 }}
          />
        )}
      </Stack>
    )
  );
};

export default RequestsList;
