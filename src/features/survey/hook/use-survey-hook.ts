"use client";

import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Option, Question } from "@/types/survey-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuestionsByKey, getSurveyResult } from "@/features/survey/api/services";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { RESULT } from "@/constants/path-constants";

const { ERROR } = ALERT_TYPE;

const useSurveyHook = (initialQuestion: Question[]) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestion);
  const {
    answers,
    resetAnswers,
    setUserPicks,
    addToAnswers,
    removeFromAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useSurveyAnswersStore();
  const currentQuestion = questions[currentQuestionIndex] ?? questions[0];
  const currentOptions = currentQuestion.options;
  const isFirstQuestion = currentQuestionIndex <= 0;
  const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
  const currentKey = currentQuestion.tmdb_key;
  const route = useRouter();

  const getRestOfQuestions = async (preferredType: string) => {
    try {
      const restQuestions = await getQuestionsByKey(preferredType);
      setQuestions([...initialQuestion, ...restQuestions]);
    } catch (error) {
      alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

  useEffect(() => {
    const selectedType = answers["type"] as string;
    getRestOfQuestions(selectedType);
  }, [answers["type"]]);

  useEffect(() => {
    const userPick = answers[currentKey];
    if (userPick) {
      if (Array.isArray(userPick)) {
        const targetOption = currentOptions.filter((option) => userPick.includes(option.value));
        const labels = targetOption.map((target) => target.label);
        setUserPicks(labels, currentQuestionIndex);
      } else {
        const targetOption = currentOptions.find((option) => option.value === userPick);
        const label = targetOption?.label as string;
        setUserPicks(label, currentQuestionIndex);
      }
    }
  }, [answers[currentKey], currentOptions, currentQuestionIndex]);

  const moveToResult = async () => {
    try {
      await getSurveyResult(answers, questions);
      route.replace(RESULT);
      resetAnswers();
      setCurrentQuestionIndex(0);
    } catch (error) {
      alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

  const moveToNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      moveToResult();
    }
  };
  const moveToPrev = () => {
    if (!isFirstQuestion) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const getOptionValue = (value: Option["value"]) => {
    if (currentQuestion.is_multiple_choice) {
      const accumulatedAnswers: string[] = Array.isArray(answers[currentKey]) ? answers[currentKey] : [];
      let newAnswer;
      if (accumulatedAnswers.includes(value)) {
        newAnswer = accumulatedAnswers.filter((old) => old !== value);
      } else {
        newAnswer = [...accumulatedAnswers, value];
      }
      addToAnswers(currentKey, newAnswer);
    } else {
      if (currentKey === "type" && value !== answers["type"]) removeFromAnswer("genres");
      addToAnswers(currentKey, value);
    }
  };

  return {
    currentQuestion,
    currentOptions,
    getOptionValue,
    currentKey,
    isFirstQuestion,
    isLastQuestion,
    moveToPrev,
    moveToNext,
    answers,
  };
};

export default useSurveyHook;
