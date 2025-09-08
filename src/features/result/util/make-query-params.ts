import type { Answer } from "@/types/survey-types";

export const makeQueryParams = (params: Answer) => {
  const newUrlParams = new URLSearchParams();

  newUrlParams.append("language", "ko-KR");
  newUrlParams.append("sort_by", "popularity.desc");
  newUrlParams.append("include_adult", "false");
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      newUrlParams.append(key, value.join(","));
    } else if (typeof value === "object" && value !== null) {
      for (const [subKey, subValue] of Object.entries(value)) {
        newUrlParams.append(`${key}.${subKey}`, String(subValue));
      }
    } else {
      newUrlParams.append(key, value as string);
    }
  }

  return newUrlParams;
};
