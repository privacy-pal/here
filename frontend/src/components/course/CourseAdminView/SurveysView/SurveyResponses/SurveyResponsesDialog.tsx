import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Alert,
    Box,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
    Grid,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { handleBadRequestError } from '@util/errors';
import { exportSurveyResponses, exportSurveyResults, exportSurveyResultsForSections } from '@util/shared/export';
import formatSurveyResponses from '@util/shared/survey';
import SurveyAPI from 'api/surveys/api';
import { Section } from 'model/section';
import { Survey, SurveyResponse } from "model/survey";
import { FC, useMemo, useState } from "react";
import toast from 'react-hot-toast';
import AllocatedSectionsTable from './AllocatedSectionsTable';
import SurveyResponsesBarChart from './SurveyResponsesBarChart';
import SurveyResultsTable from './SurveyResultsTable';
import SurveyResponsesTable from './SurveyResponsesTable';
import { CourseUserData } from 'model/course';

export interface SurveyResponsesDialogProps {
    open: boolean;
    onClose: () => void;
    survey: Survey;
    numStudents: number;
    sectionsMap: Record<string, Section>;
    students: Record<string, CourseUserData>;
}

enum SurveyResponsesView {
    SUMMARY = 0,
    DETAILS = 1
}

const SurveyResponsesDialog: FC<SurveyResponsesDialogProps> = ({ open, onClose, survey, numStudents, sectionsMap, students }) => {
    const [surveyResponsesView, setSurveyResponsesView] = useState<SurveyResponsesView>(SurveyResponsesView.SUMMARY)

    const numResponses = useMemo(() =>
        survey.responses ? Object.keys(survey.responses).length : 0,
        [survey.responses])

    const formattedResponses = useMemo(() =>
        formatSurveyResponses(survey.options, survey.responses),
        [survey.responses, survey.options])

    const hasResults = useMemo(() =>
        survey.results ? Object.keys(survey.results).length > 0 : false,
        [survey.results])

    const handleRunAlgorithm = () => {
        toast.promise(SurveyAPI.generateResults(survey.courseID, survey.ID), {
            loading: "Running algorithm...",
            success: "Algorithm ran!",
            error: (err) => handleBadRequestError(err)
        })
            .catch(() => { })
    }

    const handleApplyResults = () => {
        toast.promise(SurveyAPI.applyResults(survey.courseID, survey.ID), {
            loading: "Assigning students to sections",
            success: "Successfully assigned students to sections!",
            error: (err) => handleBadRequestError(err)
        })
            .then(() => { onClose() })
            .catch(() => { })
    }

    const handleExportResults = () => {
        survey.sectionCapacity ? exportSurveyResultsForSections(survey.results, sectionsMap) : exportSurveyResults(survey.results)
    }

    const handleExportResponses = () => {
        SurveyAPI.getSurveyResponses(survey.courseID, survey.ID)
            .then((res) => {
                const responses = res as SurveyResponse[]
                exportSurveyResponses(responses)
            })
            .catch((err) => toast.error(handleBadRequestError(err)))
    }

    return <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" keepMounted={false}>
        <DialogTitle>{survey.name}</DialogTitle>

        <DialogContent >
            <Grid container>
                <Grid item xs={12} md={9}>
                    <Typography fontSize={17} fontWeight={500}>
                        {survey.description}
                    </Typography>
                    <Typography mb={3}>
                        {numResponses} responses
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} display="flex" alignItems="center" justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                    <Button variant="outlined" startIcon={<DownloadIcon />} disabled={numResponses === 0} onClick={handleExportResponses}>
                        Export Responses
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={surveyResponsesView} onChange={(e, v) => setSurveyResponsesView(v)}>
                    <Tab label="summary" />
                    <Tab label="details" />
                </Tabs>
            </Box>

            {surveyResponsesView === SurveyResponsesView.SUMMARY &&
                <Grid container>
                    <Grid item xs={0} md={2} />
                    <Grid item xs={12} md={8} justifyContent="center" sx={{ minHeight: 240 }} mt={3} mb={5}>
                        <SurveyResponsesBarChart formattedResponses={formattedResponses} numResponses={numResponses} numStudents={numStudents} />
                    </Grid>
                    <Grid item xs={0} md={2} />
                </Grid>
            }

            {surveyResponsesView === SurveyResponsesView.DETAILS &&
                <Grid container>
                    <Grid item xs={0} md={1} />
                    <Grid item xs={12} md={10} justifyContent="center" sx={{ minHeight: 240 }} mt={3} mb={5}>
                        <SurveyResponsesTable formattedResponses={formattedResponses} students={students} />
                    </Grid>
                    <Grid item xs={0} md={1} />
                </Grid>

            }

            <Grid container>
                <Grid item xs={12} md={9}>
                    <Typography fontSize={17} fontWeight={500}>
                        Algorithm Results
                    </Typography>
                    <Typography mb={3}>
                        This will run an algorithm to automatically match students to options based on capacity and student availability.
                        Capacity may be overridden if there is no solution. You will be able to view the results before applying them.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} display="flex" alignItems="center" justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                    <Button variant="outlined" startIcon={<DirectionsRunIcon />} disabled={numResponses === 0} onClick={handleRunAlgorithm}>
                        Run Algorithm
                    </Button>
                </Grid>
            </Grid>

            <Alert severity="info">
                The table only reflects the results when you ran the algorithm.
                We recommend running the algorithm again after the survey closes and the course enrollment list is finalized, in case students changed their responses or dropped the class.
            </Alert>

            <Grid container>
                <Grid item xs={0} md={1.3} />
                <Grid item xs={12} md={9.4} display="flex" justifyContent="center">
                    {hasResults &&
                        (survey.sectionCapacity ?
                            <AllocatedSectionsTable sectionsMap={sectionsMap} sectionCapacity={survey.sectionCapacity} results={survey.results} /> :
                            <SurveyResultsTable options={survey.options} results={survey.results} />
                        )
                    }
                </Grid>
                <Grid item xs={0} md={1.3} />
            </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingTop: 2 }}>
            {hasResults && <Button variant="contained" onClick={handleExportResults}>Export Results</Button>}
            {hasResults && survey?.sectionCapacity && <Button variant="contained" onClick={handleApplyResults}>Apply Results</Button>}
        </DialogActions>
    </Dialog >
};

export default SurveyResponsesDialog;


