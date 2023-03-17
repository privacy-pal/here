import { Box, Paper, Typography } from "@mui/material";
import { Course } from "model/course";

export interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader(props: CourseHeaderProps) {
  return (
    <Box width="100%" position="relative">
      <Typography variant="h5" fontWeight={600}>
        {props.course.code}: {props.course.title}
      </Typography>
    </Box>
  );
}
