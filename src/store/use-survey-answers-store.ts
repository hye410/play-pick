import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SurveyAnswersState = {
  answers: { [key: string]: unknown };
  currentQuestionIndex: number;
};

type SurveyAnswersAction = {
  setCurrentQuestionIndex: (index: number) => void;
  addToAnswers: (key: string, answer: unknown) => void;
  removeAllAnswers: () => void;
};

const initialState: SurveyAnswersState = {
  answers: {},
  currentQuestionIndex: 0,
};

export const useSurveyAnswersStore = create<SurveyAnswersState & SurveyAnswersAction>()(
  persist(
    (set) => ({
      ...initialState,
      addToAnswers: (key, answer) =>
        set((state) => ({
          answers: { ...state.answers, [key]: answer },
        })),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      removeAllAnswers: () => set(() => ({ ...initialState })),
    }),
    {
      name: "user-answers",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
