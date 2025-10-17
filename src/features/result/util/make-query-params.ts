import type { Answer } from "@/types/survey-types";

export const makeQueryParams = (params: Answer) => {
  const newUrlParams = new URLSearchParams();
  newUrlParams.set("language", "ko-KR");
  newUrlParams.set("sort_by", "popularity.desc");
  newUrlParams.set("include_adult", "false");

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      newUrlParams.set(key, value.join(","));
    } else if (typeof value === "object" && value !== null) {
      for (const [subKey, subValue] of Object.entries(value)) {
        newUrlParams.set(`${key}.${subKey}`, String(subValue));
      }
    } else {
      newUrlParams.set(key, String(value));
    }
  }

  return newUrlParams;
};
