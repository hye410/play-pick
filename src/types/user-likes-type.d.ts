import { CombinedData } from "@/types/contents-types";

export type USER_LIKES_TYPE = {
  id: CombinedData["id"];
  type: "movie" | "tv";
};

export type USER_LIKES_BY_INFINITE_TYPE = {
  pages: Array<{
    contents: Array<CombinedData>;
    nextPage: undefined | number;
  }>;
  pageParams: Array<number>;
};

export type RemoveContent =
  | {
      id: USER_LIKES_TYPE["id"];
      type: USER_LIKES_TYPE["type"];
      error: boolean;
    }
  | {
      id?: CombinedData["id"];
      type?: CombinedData["type"];
      imgUrl?: CombinedData["imgUrl"];
      title?: CombinedData["title"];
      error: boolean;
    };

export type ParsedData = Array<{ id?: number; type?: "movie" | "tv"; error: boolean; imgUrl?: string; title?: string }>;
