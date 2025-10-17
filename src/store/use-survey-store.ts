import type { Answer, Question, Option } from "@/types/survey-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SurveyState = {
  currentQuestionIndex: number;
  answers: Answer;
  questions: Array<Question>;
  labels: Record<string, Option["label"]>;
  tmdbApiParams: Record<string, Option["code"] | Option["value"]>;
};

type SurveyAction = {
  setCurrentQuestionIndex: (index: number) => void;
  resetCurrentQuestionIndex: () => void;
  addToAnswers: (key: string, answer: unknown) => void;
  removeFromAnswer: (key: string) => void;
  resetAnswers: () => void;
  addToQuestions: (questions: Array<Question>) => void;
  resetQuestions: () => void;
  addToLabels: (key: string, label: Option["label"]) => void;
  resetLabels: () => void;
  addToTmdbApiParams: (key: string, value: Option["code"] | Option["value"]) => void;
  resetTmdbApiParams: () => void;
};

const initialState: SurveyState = {
  currentQuestionIndex: 0,
  answers: {},
  questions: [],
  labels: {},
  tmdbApiParams: {},
};

export const useSurveyStore = create<SurveyState & SurveyAction>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      resetCurrentQuestionIndex: () => set({ currentQuestionIndex: 0 }),
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
      addToQuestions: (questions) => set(() => ({ questions: questions })),
      resetQuestions: () => set(() => ({ questions: [] })),
      addToLabels: (key, label) => set((state) => ({ labels: { ...state.labels, [key]: label } })),
      resetLabels: () => set(() => ({ labels: {} })),
      addToTmdbApiParams: (key, value) => set((state) => ({ tmdbApiParams: { ...state.tmdbApiParams, [key]: value } })),
      resetTmdbApiParams: () => set(() => ({ tmdbApiParams: {} })),
    }),
    {
      name: "user-answers",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
