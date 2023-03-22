import APIClient from "api/APIClient";
import { Survey } from "model/survey";

async function getSurveyByID(
  courseID: string,
  surveyID: string
): Promise<Survey> {
  return APIClient.get(`/courses/${courseID}/surveys/${surveyID}`);
}

async function createSurvey(courseID: string, name: string, description: string, endTime: string): Promise<string> {
  return APIClient.post(`/courses/${courseID}/surveys`, {
    name, description, endTime
  });
}

async function updateSurvey(courseID: string, surveyID: string, name: string, description: string, endTime: string): Promise<string> {
  return APIClient.patch(`/courses/${courseID}/surveys/${surveyID}`, {
    name, description, endTime
  });
}
async function publishSurvey(
  courseID: string,
  surveyID: string
): Promise<boolean> {
  return APIClient.post(`/courses/${courseID}/surveys/${surveyID}/publish`);
}

async function deleteSurvey(
  courseID: string,
  surveyID: string
): Promise<boolean> {
  return APIClient.delete(`/courses/${courseID}/surveys/${surveyID}`);
}

async function generateResults(
  courseID: string,
  surveyID: string
): Promise<any> {
  return APIClient.post(`/courses/${courseID}/surveys/${surveyID}/results`);
}

async function createSurveyResponse(
  courseID: string,
  surveyID: string,
  times: string[]
): Promise<string> {
  return APIClient.post(`/courses/${courseID}/surveys/${surveyID}/responses`);
}

async function editSurveyResponse(
  courseID: string,
  surveyID: string,
  responseID: string,
  times: string[]
): Promise<boolean> {
  return APIClient.patch(
    `/courses/${courseID}/surveys/${surveyID}/responses/${responseID}`
  );
}

const SurveyAPI = {
  getSurveyByID,
  createSurvey,
  updateSurvey,
  publishSurvey,
  deleteSurvey,
  generateResults,
  createSurveyResponse,
  editSurveyResponse,
};

export default SurveyAPI;