export const SURVEY_DB = Object.freeze({
  TMDB_KEY: {
    genres: "with_genres",
    type: "type",
    runtime: "with_runtime",
    release: "primary_release_date",
  },
} as const);

export const LIKES_DB = Object.freeze({
  likes: "likes",
  contentId: "content_id",
  contentType: "content_type",
  userId: "user_id",
} as const);
