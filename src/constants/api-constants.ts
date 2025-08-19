const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const API_METHOD = Object.freeze({
  GET: "GET",
  POST: "POST",
} as const);

export const API_HEADER = Object.freeze({
  "Content-Type": "application/json",
} as const);

export const TMDB_API_HEADER = Object.freeze({
  accept: "application/json",
  Authorization: `Bearer ${TMDB_API_KEY}`,
} as const);
