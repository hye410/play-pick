import { BASE_URL } from "@/constants/path-constants";

export const getSignOut = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/sign-out`);

    if (!res.ok) {
      const result = await res.json();
      throw result.message;
    }
  } catch (error) {
    throw error;
  }
};
