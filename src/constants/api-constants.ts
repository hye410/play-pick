import { FilteredDetailData } from "@/types/contents-types";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = process.env.YOUTUBE_SEARCH_URL;

export const API_METHOD = Object.freeze({
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
} as const);

export const API_HEADER = Object.freeze({
  "Content-Type": "application/json",
} as const);

export const TMDB_API_HEADER = Object.freeze({
  accept: "application/json",
  Authorization: `Bearer ${TMDB_API_KEY}`,
} as const);

export const DEFAULT_YOUTUBE_SEARCH_API = (titleToSearch: FilteredDetailData["title"]) =>
  `${YOUTUBE_SEARCH_URL}?part=snippet&maxResults=1&q=${encodeURIComponent(titleToSearch + " 예고편")}&key=${YOUTUBE_API_KEY}`;
