"use client";

import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import { useEffect } from "react";

type UserPicksProps = {
  userPicks: string[];
};
const UserPicks = ({ userPicks }: UserPicksProps) => {
  const { resetAnswers } = useSurveyAnswersStore();
  useEffect(() => {
    resetAnswers();
  }, []);

  return (
    <span>
      <strong className="font-extrabold">{userPicks}</strong>
    </span>
  );
};

export default UserPicks;
