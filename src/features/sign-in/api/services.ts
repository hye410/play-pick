import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { SignIn } from "@/types/form-types";

const { POST } = API_METHOD;
export const postSignIn = async (payload: SignIn) => {
  try {
    const res = await fetch("/api/sign-in", {
      method: POST,
      headers: API_HEADER,
      body: JSON.stringify(payload),
    });
    const { message } = await res.json();
    if (!res.ok) throw new Error(message);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
