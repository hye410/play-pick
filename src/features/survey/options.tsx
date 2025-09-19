"use client";
import { useSurveyStore } from "@/store/use-survey-store";
import type { Option, Question } from "@/types/survey-types";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

type OptionsProps = {
  options: Option[];
  handleSelectOptions: (value: Option["value"]) => void;
  haveManyOptions?: boolean;
  currentKey: Question["tmdb_key"];
};

const Options = ({ options, handleSelectOptions, haveManyOptions = false, currentKey }: OptionsProps) => {
  const { answers } = useSurveyStore();
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
    <ul className={clsx("mb-5 w-full text-center", haveManyOptions && "grid w-[50%] grid-cols-4 gap-4")}>
      {options.map((option) => (
        <li key={`option_${option.label}`}>
          <button
            type="button"
            className={clsx(
              "my-4 rounded-lg border px-4 py-2",
              haveManyOptions && "w-36",
              !haveManyOptions && "w-64",
              isSelected(option.value) && "border-none bg-primary",
            )}
            onClick={() => handleSelectOptions(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Options;
