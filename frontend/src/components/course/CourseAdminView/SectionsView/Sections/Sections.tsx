import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useSections } from "@util/section/hooks";
import { Course } from "model/general";
import HTASectionCard from "./HTASectionCard";

export interface SectionsProps {
  course: Course;
}

export default function Sections(props: SectionsProps) {
  const [sections, res] = useSections();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" fontWeight={600}>
          Sections
        </Typography>
        <Button>+ New</Button>
      </Stack>
      <Box height={300}>
        <HTASectionCard section={sections![0]} />
      </Box>
    </>
  );
}
