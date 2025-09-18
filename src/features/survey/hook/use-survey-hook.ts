"use client";

import { ALERT_TYPE } from "@/constants/alert-constants";
import { RESULT } from "@/constants/path-constants";
import { makeQueryParams } from "@/features/result/util/make-query-params";
import { getQuestionsByKey } from "@/features/survey/api/services";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Answer, Option, Question } from "@/types/survey-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { ERROR } = ALERT_TYPE;

const useSurveyHook = (initialQuestion: Question[]) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestion);
  const [params, setParams] = useState<Answer>({});
  const [userPicks, setUserPicks] = useState<string[]>([]);
  const [direction, setDirection] = useState<-1 | 1>(1);
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

  useEffect(() => {
    const userPick = answers[currentKey];

    if (userPick) {
      if (Array.isArray(userPick)) {
        const targetOption = currentOptions.filter((option) => userPick.includes(option.value));
        const labels = targetOption.map((target) => target.label);
        const codes = targetOption.map((target) => target.code);

        setUserPicks((prev) => {
          const picks = [...prev];
          picks[currentQuestionIndex] = labels.join(" , ");
          return picks;
        });
        setParams((prev) => ({ ...prev, [currentKey]: codes }));
      } else {
        const targetOption = currentOptions.find((option) => option.value === userPick);
        const label = targetOption?.label as string;
        setUserPicks((prev) => {
          const picks = [...prev];
          picks[currentQuestionIndex] = label;
          return picks;
        });
        setParams((prev) => ({ ...prev, [currentKey]: targetOption?.code || targetOption?.value }));
      }
    }
  }, [answers[currentKey], currentOptions, currentQuestionIndex]);

  const moveToResult = () => {
    const urlParams = makeQueryParams(params);
    const userPicksString = userPicks.join(" / ");
    urlParams.append("picks", userPicksString);
    route.replace(`${RESULT}?${urlParams.toString()}`);
  };

  const moveToNext = () => {
    setDirection(1);
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      moveToResult();
    }
  };

  const moveToPrev = () => {
    setDirection(-1);
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
    moveToPrev,
    moveToNext,
    answers,
    direction,
  };
};

export default useSurveyHook;
