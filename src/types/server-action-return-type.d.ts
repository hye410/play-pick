import type { Question } from "@/types/survey-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { CombinedData } from "@/types/contents-types";

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

export type LikedContentState = InitReturnType & {
  content: CombinedData | Array;
};

export type LikedContentsState = InitReturnType & {
  contents: Array<CombinedData> | Array;
};

export type ResultState = InitReturnType & {
  recommends: Array<CombinedData> | Array;
};
