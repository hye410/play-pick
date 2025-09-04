"use client";
import Button from "@/components/Button";
import Options from "@/features/survey/options";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Option, Question } from "@/types/survey-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getQuestionsByKey, getSurveyResult } from "./api/services";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { alert } from "@/utils/alert";

type SurveyProps = {
  initialQuestions: Question[];
};

const APPLY_GRID_BOUNDARY = 12;
const { ERROR } = ALERT_TYPE;

const Survey = ({ initialQuestions: initialQuestion }: SurveyProps) => {
  const [questions, setQuestions] = useState(initialQuestion);
  const { answers, addToAnswers, currentQuestionIndex, setCurrentQuestionIndex } = useSurveyAnswersStore();
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;
  const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
  const isFirstQuestion = currentQuestionIndex <= 0;
  const currentKey = currentQuestion.tmdb_key;

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
  console.log("questions=>", questions);
  console.log("answer=>", answers);

  const moveToResult = async () => {
    try {
      await getSurveyResult(answers, questions);
    } catch (error) {
      console.log("error=<>", error);
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
      addToAnswers(currentKey, value);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h3 className="mb-6 text-lg font-bold">{currentQuestion.question}</h3>
      <Options
        options={currentOptions}
        handleSelectOption={getOptionValue}
        haveManyOptions={currentOptions.length >= APPLY_GRID_BOUNDARY}
        currentKey={currentKey}
      />
      <div
        className={clsx(
          "mx-auto flex w-[80%] items-center gap-16",
          isFirstQuestion && "justify-end",
          !isFirstQuestion && "justify-between",
        )}
      >
        {!isFirstQuestion && (
          <div>
            <Button onClick={moveToPrev} color="secondary" size="small">
              이전
            </Button>
          </div>
        )}
        <div>
          <Button onClick={moveToNext} size="small" disabled={!answers[currentKey]}>
            {isLastQuestion ? "결과" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
