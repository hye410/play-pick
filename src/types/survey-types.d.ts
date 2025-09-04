export type Question = {
  id: number;
  question: string;
  options: Option[];
  is_multiple_choice: boolean;
  tmdb_key: string;
  step: number;
  is_common: boolean;
  separated_key: string | null;
};

export type Option = {
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

export type Answer = {
  [key: string]: string | string[];
};
