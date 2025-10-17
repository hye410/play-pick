"use client";

import { useSurveyStore } from "@/store/use-survey-store";
import { useEffect } from "react";

type UserPicksProps = {
  userPicks: string[];
};
const UserPicks = ({ userPicks }: UserPicksProps) => {
  const { resetAnswers, resetCurrentQuestionIndex, resetQuestions, resetLabels, resetTmdbApiParams } = useSurveyStore();

  useEffect(() => {
    resetAnswers();
    resetCurrentQuestionIndex();
    resetQuestions();
    return () => {
      resetLabels();
      resetTmdbApiParams();
    };
  }, []);

  return (
    userPicks && (
      <span>
        &#91;&nbsp;<strong className="font-extrabold">{userPicks}</strong>&nbsp;&#93;
      </span>
    )
  );
};

export default UserPicks;
