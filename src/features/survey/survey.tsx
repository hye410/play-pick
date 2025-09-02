"use client";

import Button from "@/components/Button";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Question } from "@/types/survey-types";
import { useEffect, useMemo } from "react";
import Options from "@/features/survey/options";
import clsx from "clsx";

type SurveyProps = {
  questions: Question[];
};

const APPLY_GRID_BOUNDARY = 12;

const Survey = ({ questions }: SurveyProps) => {
  const { answers, addToAnswers, currentQuestionIndex, setCurrentQuestionIndex } = useSurveyAnswersStore();
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;
  const isLastQuestion = useMemo(() => currentQuestionIndex + 1 >= questions.length, [currentQuestionIndex, questions]);
  const isFirstQuestion = useMemo(() => currentQuestionIndex <= 0, [currentQuestionIndex]);
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === 0 && !answers[questions[0].tmdbKey]) {
      setCurrentQuestionIndex(0);
    }
  }, [questions, currentQuestionIndex, addToAnswers, setCurrentQuestionIndex]);

  const moveToNext = () => {
    if (!isLastQuestion) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const moveToPrev = () => {
    if (!isFirstQuestion) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };
  const getOptionValue = (value: string) => {
    const key = currentQuestion.tmdbKey;
    if (currentQuestion.isMultipleChoices) {
      const accumulatedAnswers: string[] = Array.isArray(answers[key]) ? answers[key] : [];

      let newAnswer;
      if (accumulatedAnswers.includes(value)) {
        newAnswer = accumulatedAnswers.filter((old) => old !== value);
      } else {
        newAnswer = [...accumulatedAnswers, value];
      }
      addToAnswers(key, newAnswer);
    } else {
      addToAnswers(key, value);
    }
  };
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h3 className="mb-6 text-lg font-bold">{currentQuestion.question}</h3>
      <Options
        options={currentOptions}
        handleSelectOption={getOptionValue}
        haveManyOptions={currentOptions.length >= APPLY_GRID_BOUNDARY}
      />
      <div
        className={clsx(
          "mx-auto flex w-[80%] items-center gap-16",
          isLastQuestion && "justify-start",
          isFirstQuestion && "justify-end",
          !isFirstQuestion && !isLastQuestion && "justify-between",
        )}
      >
        {!isFirstQuestion && (
          <div>
            <Button onClick={moveToPrev} color="secondary" size="small">
              이전
            </Button>
          </div>
        )}
        {!isLastQuestion && (
          <div>
            <Button onClick={moveToNext} size="small">
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
