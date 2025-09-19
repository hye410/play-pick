import { Question } from "@/types/survey-types";
import { USER_LIKES_TYPE } from "./user-likes-type";

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

export type UserLikesState = InitReturnType & {
  userLikes: Array<USER_LIKES_TYPE> | Array;
};
