"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useSurvey from "@/features/survey/hook/use-survey";
import type { Question } from "@/types/survey-types";

type MotionButtonsProps = {
  initialQuestions: Array<Question>;
};

const MotionButtons = ({ initialQuestions }: MotionButtonsProps) => {
  const { isFirstQuestion, moveToNext, moveToPrev, answers, currentKey } = useSurvey(initialQuestions);
  return (
    <div
      className={clsx(
        "absolute bottom-5 mx-auto flex w-full items-center gap-16",
        isFirstQuestion && "justify-end",
        !isFirstQuestion && "justify-between",
      )}
    >
      {!isFirstQuestion && (
        <motion.button
          initial={false}
          aria-label="이전"
          onClick={moveToPrev}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="z-50"
        >
          <FaArrowCircleLeft size={40} />
        </motion.button>
      )}
      <motion.button
        initial={false}
        aria-label="다음"
        disabled={!answers[currentKey]}
        className={clsx("z-50", !answers[currentKey] && "cursor-not-allowed")}
        onClick={moveToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={
          answers[currentKey]
            ? { scale: [1, 1.15, 1], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }
            : {}
        }
      >
        <FaArrowCircleRight size={40} />
      </motion.button>
    </div>
  );
};

export default MotionButtons;
