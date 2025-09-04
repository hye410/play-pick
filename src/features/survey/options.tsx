"use client";
import { useSurveyAnswersStore } from "@/store/use-survey-answers-store";
import type { Option, Question } from "@/types/survey-types";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

type OptionsProps = {
  options: Option[];
  handleSelectOption: (value: Option["value"]) => void;
  haveManyOptions?: boolean;
  currentKey: Question["tmdbKey"];
};

const Options = ({ options, handleSelectOption, haveManyOptions = false, currentKey }: OptionsProps) => {
  const { answers } = useSurveyAnswersStore();
  const currentAnswer = useMemo(() => answers[currentKey], [answers, currentKey]);

  const isSelected = useCallback(
    (selectedAnswer: Option["value"]) => {
      if (Array.isArray(currentAnswer)) {
        return currentAnswer.includes(selectedAnswer);
      } else return currentAnswer === selectedAnswer;
    },
    [currentAnswer],
  );

  return (
    <ul className={clsx("mx-auto mb-5 w-[80%] flex-1 text-center", haveManyOptions && "grid w-[50%] grid-cols-3")}>
      {options.map((option) => (
        <li key={`option_${option.label}`}>
          <button
            type="button"
            className={clsx(
              "my-4 rounded-lg border px-4 py-2",
              haveManyOptions && "w-32",
              !haveManyOptions && "w-64",
              isSelected(option.value) && "border-none bg-primary",
            )}
            onClick={() => handleSelectOption(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Options;
