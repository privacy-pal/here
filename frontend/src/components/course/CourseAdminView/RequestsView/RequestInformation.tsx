import { Table, TableBody, TableCell, TableRow, styled, useTheme } from "@mui/material";
import formatSectionInfo, { formatSectionCapacity } from "@util/shared/formatSectionInfo";
import { formatRequestTime } from "@util/shared/requestTime";
import { Assignment } from "model/assignment";
import { CourseUserData } from "model/course";
import { Section } from "model/section";
import { Swap } from "model/swap";
import { FC } from "react";


export interface RequestInformationProps {
    request: Swap;
    student: CourseUserData;
    oldSection: Section;
    newSection: Section;
    assignment?: Assignment;
}


const RequestInformation: FC<RequestInformationProps> = ({ request, oldSection, newSection, assignment }) => {

    const theme = useTheme();

    const StyledTableCell = styled(TableCell)({
        borderBottom: 'none',
        color: theme.palette.secondary.main,
        padding: '3px 0 3px 0'
    });

    const information = {
        "Old Section": formatSectionInfo(oldSection, true),
        "New Section": formatSectionInfo(newSection, true),
        "Type": assignment ? `One Time - ${assignment.name}` : "Permanent",
        "Time": formatRequestTime(request, true),
        "Reason": request.reason,
    }

    return <Table>
        <colgroup>
            <col width="15%" />
            <col width="85%" />
        </colgroup>
        <TableBody>
            {Object.keys(information).map((key) => {
                return <TableRow key={key}>
                    <StyledTableCell component="th" scope="row">
                        {key}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {information[key]}
                    </StyledTableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}

export default RequestInformation