/** common url  */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SUPABASE_IMAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL;
export const TMDB_BASE_URL = process.env.TMDB_API_URL;
export const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMGE_URL;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**page path */
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const MY_PAGE = "/my-page";
export const SURVEY = "/survey";
export const DETAIL = "/detail";
export const RESULT = "/result";
export const FIND_PASSWORD = "/find-password";
export const UPDATE_PASSWORD = "/update-password";

//**Home > Today's Pick get api */
export const GET_TODAY_PICK = (contentsType: "movie" | "tv") =>
  `${TMDB_BASE_URL}/trending/${contentsType}/day?language=ko-KR`;
