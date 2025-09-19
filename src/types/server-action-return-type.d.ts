import { Question } from "@/types/survey-types";

export type InitReturnType = {
  success: boolean;
  message: string | null;
};

export type SignInFormState = InitReturnType & {
  userId: string | null;
};

export type SurveyState = InitReturnType & {
  questions: Array<Question> | Array;
};
