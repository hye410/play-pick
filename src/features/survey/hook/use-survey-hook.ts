"use client";

import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Option, Question } from "@/types/survey-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuestionsByKey, getSurveyResult } from "@/features/survey/api/services";
import { ALERT_TYPE } from "@/constants/alert-constants";

const { ERROR } = ALERT_TYPE;

const useSurveyHook = (initialQuestion: Question[]) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestion);
  const { answers, addToAnswers, removeFromAnswer, currentQuestionIndex, setCurrentQuestionIndex } =
    useSurveyAnswersStore();
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

  const moveToResult = async () => {
    try {
      await getSurveyResult(answers, questions);
      route.replace("/result");
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
