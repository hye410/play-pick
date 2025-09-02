"use client";

import Button from "@/components/Button";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Question } from "@/types/survey-types";
import { useEffect } from "react";
import Options from "@/features/survey/options";

type SurveyProps = {
  questions: Question[];
};
const Survey = ({ questions }: SurveyProps) => {
  const { answers, addToAnswers, currentQuestionIndex, setCurrentQuestionIndex } = useSurveyAnswersStore();
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === 0 && !answers[questions[0].tmdbKey]) {
      setCurrentQuestionIndex(0);
    }
  }, [questions, currentQuestionIndex, addToAnswers, setCurrentQuestionIndex]);

  const moveToNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const moveToPrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
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
    <div>
      <h3>{currentQuestion.question}</h3>
      <Options options={currentOptions} handleSelectOption={getOptionValue} />
      <Button onClick={moveToPrev}>이전</Button>
      <Button onClick={moveToNext}>다음</Button>
    </div>
  );
};

export default Survey;
