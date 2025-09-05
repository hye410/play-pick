import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// **
// answers : 사용자가 선택한 값을 key-value로 담음
// userPicks : 사용자가 선택한 값의 라벨(한글)을 담음 => 결과 페이지(/result)에서 사용
//*//

type SurveyAnswersState = {
  currentQuestionIndex: number;
  answers: { [key: string]: unknown };
  userPicks: string[] | string[][];
};

type SurveyAnswersAction = {
  setCurrentQuestionIndex: (index: number) => void;
  addToAnswers: (key: string, answer: unknown) => void;
  removeFromAnswer: (key: string) => void;
  resetAnswers: () => void;
  setUserPicks: (userPick: string | string[], index: number) => void;
  resetUserPicks: () => void;
};

const initialState: SurveyAnswersState = {
  currentQuestionIndex: 0,
  answers: {},
  userPicks: [],
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
      resetAnswers: () => set(() => ({ answers: {} })),
      setUserPicks: (newPick, index) =>
        set((state) => {
          state.userPicks[index] = newPick;
          return { userPicks: state.userPicks };
        }),
      resetUserPicks: () => set(() => ({ userPicks: [] })),
    }),
    {
      name: "user-answers",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
