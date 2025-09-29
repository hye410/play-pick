import { CombinedData } from "./contents-types";

export type USER_LIKES_TYPE = {
  id: CombinedData["id"];
  type: "movie" | "tv";
};
