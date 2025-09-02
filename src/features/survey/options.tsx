"use client";
import type { Answer } from "@/types/survey-types";
import clsx from "clsx";

type OptionsProps = {
  options: Answer[];
  handleSelectOption: (value: Answer["value"]) => void;
  haveManyOptions?: boolean;
};

const Options = ({ options, handleSelectOption, haveManyOptions = false }: OptionsProps) => {
  return (
    <ul className={clsx("mx-auto mb-5 w-[80%] flex-1 text-center", haveManyOptions && "grid w-[50%] grid-cols-3")}>
      {options.map((option) => (
        <li key={`option_${option.value}`}>
          <button
            type="button"
            className={clsx(
              "my-4 whitespace-nowrap rounded-lg border px-4 py-2",
              haveManyOptions && "w-32",
              !haveManyOptions && "w-6",
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
