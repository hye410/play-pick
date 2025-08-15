const BASE_URL = process.env.TMDB_API_URL;
//**Home > Today's Pick get api */
export const GET_TODAY_PICK = (contentsType: "movie" | "tv") =>
  `${BASE_URL}/trending/${contentsType}/day?language=ko-KR`;
