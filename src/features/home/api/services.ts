import { BASE_URL } from "@/constants/path-constants";

const A_DAY = 60 * 60 * 24;
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
