"use client";
import type { Answer } from "@/types/survey-types";

type OptionsProps = {
  options: Answer[];
  handleSelectOption: (value: Answer["value"]) => void;
};

const Options = ({ options, handleSelectOption }: OptionsProps) => {
  return (
    <ul>
      {options.map((option) => (
        <li key={`option_${option.value}`}>
          <button type="button" className="my-2 border p-2" onClick={() => handleSelectOption(option.value)}>
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Options;
