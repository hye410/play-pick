import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { SignUp } from "@/types/form-types";
const { POST } = API_METHOD;
type PostSignUp = Pick<SignUp, "email" | "password">;

export const postSignUp = async (payload: PostSignUp): Promise<string> => {
  try {
    const res = await fetch("/api/sign-up", {
      method: POST,
      headers: API_HEADER,
      body: JSON.stringify(payload),
    });
    const { message } = await res.json();
    if (!res.ok) throw new Error(message);
    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
