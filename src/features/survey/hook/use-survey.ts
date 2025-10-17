"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { SURVEY_DB } from "@/constants/db-constants";
import { SURVEY_MESSAGE } from "@/constants/message-constants";
import { RESULT } from "@/constants/path-constants";
import { makeQueryParams } from "@/features/result/util/make-query-params";
import { getAdditionalQuestions } from "@/features/survey/api/server-actions";
import { useSurveyStore } from "@/store/use-survey-store";
import type { Option, Question } from "@/types/survey-types";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { ERROR, WARNING } = ALERT_TYPE;
const { OVER_MAXIMUM_SELECTION } = SURVEY_MESSAGE;
const { TMDB_KEY } = SURVEY_DB;
const { genres, type } = TMDB_KEY;

const useSurvey = (initialQuestion: Array<Question>) => {
  const [direction, setDirection] = useState<-1 | 1>(1);
  const prevTypeRef = useRef<string | null>(null);

  const {
    answers,
    labels,
    addToLabels,
    addToAnswers,
    removeFromAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    questions,
    addToQuestions,
    params,
    addToParams,
  } = useSurveyStore();

  if (initialQuestion && questions.length === 0) {
    addToQuestions(initialQuestion);
  }

  const currentQuestion = questions[currentQuestionIndex] ?? initialQuestion[0];
  const currentOptions = currentQuestion.options;
  const isFirstQuestion = currentQuestionIndex <= 0;
  const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
  const currentKey = currentQuestion.tmdb_key;
  const router = useRouter();

  useEffect(() => {
    const currentAnswer = answers[currentKey];
    if (currentAnswer) {
      if (Array.isArray(currentAnswer)) processMultiAnswers(currentAnswer);
      else processSingleAnswer(currentAnswer);
    }
  }, [answers[currentKey], currentOptions, currentQuestionIndex]);

  /**
   * 다중 선택 질문에 대한 응답을 처리하고 화면 표시용 라벨과 API 통신용 파라미터(코드)를 설정하는 함수
   * @param currentAnswer 유저가 선택한 값들
   */
  const processMultiAnswers = (currentAnswer: Array<unknown>) => {
    const targetOption = currentOptions.filter((option) => currentAnswer.includes(option.value));
    if (!targetOption) return;
    const labels = targetOption.map((target) => target.label).join("/");
    const codes = targetOption.map((target) => target.code).join(",");

    addToLabels(currentKey, labels);
    addToParams(currentKey, codes);
  };

  /**
   * 단일 선택 질문에 대한 응답을 처리하고 화면 표시용 라벨과 API 통신용 파라미터(코드)를 설정하는 함수
   * @param currentAnswer 유저가 선택한 값
   */
  const processSingleAnswer = (currentAnswer: unknown) => {
    const targetOption = currentOptions.find((option) => option.value === currentAnswer);

    if (!targetOption) return;
    addToLabels(currentKey, targetOption.label);
    addToParams(currentKey, targetOption.code || targetOption.value);
  };

  /**
   * 유저가 선택한 contents type에 따른 추가 질문을 fetch하는 함수
   * @param selectedType 유저가 선택한 contents type
   */
  const getRestOfQuestions = async (selectedType: "tv" | "movie") => {
    const res = await getAdditionalQuestions(selectedType);
    if (res.success) {
      addToQuestions([...initialQuestion, ...res.questions]);
    } else {
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  /**
   * 화면 표시용 라벨과 API 통신용 파라미터(코드)를 URL 파라미터에 실어 Result 페이지로 이동하는 함수
   */
  const moveToResult = () => {
    const urlParams = makeQueryParams(params);
    const userPickLabels = Object.values(labels).join(" , ");
    urlParams.set("picks", userPickLabels);
    router.replace(`${RESULT}?${urlParams.toString()}`);
  };

  /**
   * 다음 질문으로 이동하는 함수.
   * content Type이 달라질 시, 해당 type에 맞는 추가 질문을 새로 fetch함.
   */

  const moveToNext = () => {
    setDirection(1);
    const currentType = answers[type] as "tv" | "movie";
    const isNotSameWithPrev = currentType !== prevTypeRef.current;
    if (currentType && isNotSameWithPrev) {
      getRestOfQuestions(currentType);
      prevTypeRef.current = currentType;
    }
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      moveToResult();
    }
  };

  /**
   * 이전 질문으로 이동하는 함수
   */
  const moveToPrev = () => {
    setDirection(-1);
    if (!isFirstQuestion) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  /**
   * 유저가 선택한 값을 받아와 다중선택 혹은 단일선택에 따라 그 다음 처리를 요청하는 함수
   * @param value 유저가 선택한 값
   */
  const handleAddAnswers = (value: Option["value"]) => {
    if (currentQuestion.is_multiple_choice) handleMultiAnswers(value);
    else handleSingleAnswer(value);
  };

  /**
   * 다중 선택일 시 선택 가능 개수 초과 검사 및 기존 응답에 새로운 값을 누적 혹은 배제하는 함수
   * @param newAnswer 유저가 선택한 값들
   */
  const handleMultiAnswers = (newAnswer: Option["value"]) => {
    const selectedAnswers: string[] = Array.isArray(answers[currentKey]) ? answers[currentKey] : [];

    if (selectedAnswers.includes(newAnswer)) {
      const newAnswers = selectedAnswers.filter((selectedAnswer) => selectedAnswer !== newAnswer);
      addToAnswers(currentKey, newAnswers);
      return;
    }

    if (selectedAnswers.length >= 3) {
      alert({
        type: WARNING,
        message: OVER_MAXIMUM_SELECTION,
      });
      return;
    }

    const newAnswers = [...selectedAnswers, newAnswer];
    addToAnswers(currentKey, newAnswers);
  };

  /**
   * 단일 선택일 시 기존 응답에 새로운 값을 추가하는 함수
   * @param newAnswer 유저가 선택한 값
   */
  const handleSingleAnswer = (newAnswer: Option["value"]) => {
    const isTypeQuestion = currentKey === type;
    const isTypeChanged = newAnswer !== answers[type];
    if (isTypeQuestion && isTypeChanged) removeFromAnswer(genres);
    addToAnswers(currentKey, newAnswer);
  };

  return {
    currentQuestion,
    currentOptions,
    getOptionValues: handleAddAnswers,
    currentKey,
    isFirstQuestion,
    moveToPrev,
    moveToNext,
    answers,
    direction,
  };
};

export default useSurvey;
