"use client";

import { useSurveyStore } from "@/store/use-survey-store";
import { useEffect } from "react";

type UserPicksProps = {
  userPicks: string[];
};
const UserPicks = ({ userPicks }: UserPicksProps) => {
  const { resetAnswers, resetCurrentQuestionIndex, resetQuestions } = useSurveyStore();
  useEffect(() => {
    resetAnswers();
    resetCurrentQuestionIndex();
    resetQuestions();
  }, []);

  return (
    <span>
      <strong className="font-extrabold">{userPicks}</strong>
    </span>
  );
};

export default UserPicks;
