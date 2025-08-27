import type { FilteredDetailData } from "@/types/contents-types";

export const getRatingStar = (rating: FilteredDetailData["rating"]) => {
  return Math.round(rating) / 2;
};
