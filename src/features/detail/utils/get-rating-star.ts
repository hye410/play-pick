import { DetailContentData } from "@/types/contents-types";

export const getRatingStar = (rating: DetailContentData["rating"]) => {
  return Math.round(rating) / 2;
};
