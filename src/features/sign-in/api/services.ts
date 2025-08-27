import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { SignIn } from "@/types/form-types";

const { POST } = API_METHOD;

export const postSignIn = async (payload: SignIn): Promise<string | void> => {
  try {
    const res = await fetch("/api/sign-in", {
      method: POST,
      headers: API_HEADER,
      body: JSON.stringify(payload),
    });
    const { message } = await res.json();
    if (!res.ok) throw new Error(message);
  } catch (error) {
    throw error;
  }
};

export const postFindPassword = async (payload: Pick<SignIn, "email">): Promise<string> => {
  try {
    const res = await fetch("/api/find-password", {
      method: POST,
      headers: API_HEADER,
      body: JSON.stringify(payload),
    });
    const { message } = await res.json();
    if (!res.ok) throw new Error(message);
    return message;
  } catch (error) {
    throw error;
  }
};
