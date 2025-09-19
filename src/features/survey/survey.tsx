"use client";
import { AnimatedComponent } from "@/components/animated-component";
import useSurveyHook from "@/features/survey/hook/use-survey-hook";
import Options from "@/features/survey/options";
import type { Question } from "@/types/survey-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type SurveyProps = {
  initialQuestions: Question[];
};

const APPLY_GRID_BOUNDARY = 12;

const Survey = ({ initialQuestions: initialQuestion }: SurveyProps) => {
  const {
    currentQuestion,
    currentOptions,
    getOptionValues,
    currentKey,
    isFirstQuestion,
    moveToNext,
    moveToPrev,
    answers,
    direction,
  } = useSurveyHook(initialQuestion);

  return (
    <div className="relative mx-auto flex h-full w-[80%] flex-col items-center justify-center">
      <AnimatedComponent direction={direction} animatedKey={currentKey}>
        <h3 className="mb-6 text-center text-lg font-bold">{currentQuestion.question}</h3>
        <Options
          options={currentOptions}
          handleSelectOptions={getOptionValues}
          haveManyOptions={currentOptions.length >= APPLY_GRID_BOUNDARY}
          currentKey={currentKey}
        />
      </AnimatedComponent>
      <div
        className={clsx(
          "absolute bottom-5 mx-auto flex w-full items-center gap-16",
          isFirstQuestion && "justify-end",
          !isFirstQuestion && "justify-between",
        )}
      >
        {!isFirstQuestion && (
          <motion.button initial={false} aria-label="이전" onClick={moveToPrev} whileTap={{ scale: 0.9 }}>
            <FaArrowCircleLeft size={40} />
          </motion.button>
        )}
        <motion.button
          initial={false}
          aria-label="다음"
          disabled={!answers[currentKey]}
          className={clsx(!answers[currentKey] && "cursor-not-allowed")}
          onClick={moveToNext}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowCircleRight size={40} />
        </motion.button>
      </div>
    </div>
  );
};

export default Survey;
