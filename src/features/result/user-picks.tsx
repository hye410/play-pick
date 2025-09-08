"use client";

import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import { useEffect } from "react";

const UserPicks = () => {
  const { userPicks } = useSurveyAnswersStore();
  const { resetAnswers } = useSurveyAnswersStore();

  useEffect(() => {
    resetAnswers();
  }, []);

  return (
    <span>
      <strong className="font-extrabold">{userPicks.join(" / ")}</strong>
    </span>
  );
};

export default UserPicks;
