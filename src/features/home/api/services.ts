const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getTodayPick = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/today-pick`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    console.log("!!,", data);
    return data;
  } catch (error) {
    console.error(error);
    // throw error;
  }
};
