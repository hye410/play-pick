"use client";

import { ALERT_TYPE } from "@/constants/alert-constants";
import { SURVEY_MESSAGE } from "@/constants/message-constants";
import { RESULT } from "@/constants/path-constants";
import { makeQueryParams } from "@/features/result/util/make-query-params";
import { getQuestionsByKey } from "@/features/survey/api/services";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Answer, Option, Question } from "@/types/survey-types";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { ERROR, WARNING } = ALERT_TYPE;
const { OVER_MAXIMUM_SELECTION } = SURVEY_MESSAGE;

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
    if (currentQuestion.is_multiple_choice) handleMultiAnswers(value);
    else handleSingleAnswer(value);
  };

  const handleMultiAnswers = (newAnswer: Option["value"]) => {
    const selectedAnswers: string[] = Array.isArray(answers[currentKey]) ? answers[currentKey] : [];

    // 이미 선택한 항목을 해제하는 경우
    if (selectedAnswers.includes(newAnswer)) {
      const newAnswers = selectedAnswers.filter((selectedAnswer) => selectedAnswer !== newAnswer);
      addToAnswers(currentKey, newAnswers);
      return;
    }

    // 새로운 항목을 추가하는 경우 (개수 제한 확인)
    if (selectedAnswers.length >= 3) {
      alert({
        type: WARNING,
        message: OVER_MAXIMUM_SELECTION,
      });
      return;
    }

    // 새로운 항목 추가
    const newAnswers = [...selectedAnswers, newAnswer];
    addToAnswers(currentKey, newAnswers);
  };

  const handleSingleAnswer = (newAnswer: Option["value"]) => {
    if (currentKey === "type" && newAnswer !== answers["type"]) removeFromAnswer("with_genres");
    addToAnswers(currentKey, newAnswer);
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
