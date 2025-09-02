export type Question = {
  id: number;
  question: string;
  options: Answer[];
  isMultipleChoices: boolean;
  tmdbKey: string;
};

export type Answer = {
  value: string;
  label: string;
  code?:
    | number
    | string
    | {
        gte: number | string;
        lte: number | string;
      };
};
