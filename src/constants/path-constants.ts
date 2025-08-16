/** common url  */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SUPABASE_IMAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL;
export const TMDB_BASE_URL = process.env.TMDB_API_URL;
export const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMGE_URL;

//**Home > Today's Pick get api */
export const GET_TODAY_PICK = (contentsType: "movie" | "tv") =>
  `${TMDB_BASE_URL}/trending/${contentsType}/day?language=ko-KR`;
