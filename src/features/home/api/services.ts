import { A_DAY } from "@/constants/fetch-time-constants";
import { BASE_URL } from "@/constants/path-constants";

export const getTodayPick = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/today-pick`, {
      next: {
        revalidate: A_DAY,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
