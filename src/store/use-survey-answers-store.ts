import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SurveyAnswersState = {
  currentQuestionIndex: number;
  answers: { [key: string]: unknown };
};

type SurveyAnswersAction = {
  setCurrentQuestionIndex: (index: number) => void;
  addToAnswers: (key: string, answer: unknown) => void;
  removeFromAnswer: (key: string) => void;
  resetAnswers: () => void;
};

const initialState: SurveyAnswersState = {
  currentQuestionIndex: 0,
  answers: {},
};

export const useSurveyAnswersStore = create<SurveyAnswersState & SurveyAnswersAction>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      addToAnswers: (key, answer) =>
        set((state) => ({
          answers: { ...state.answers, [key]: answer },
        })),
      removeFromAnswer: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.answers;
          return {
            answers: rest,
          };
        }),
      resetAnswers: () => set(() => ({ answers: {}, currentQuestionIndex: 0 })),
    }),
    {
      name: "user-answers",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
