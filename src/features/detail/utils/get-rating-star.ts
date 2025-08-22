import { DetailContentData } from "@/types/contents-type";

export const getRatingStar = (rating: DetailContentData["rating"]) => {
  return Math.round(rating) / 2;
};
