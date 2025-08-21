import { BASE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-type";

export const getDetailContent = async (contentId: string, type: Pick<CombinedData, "type">) => {
  try {
    const res = await fetch(`${BASE_URL}/api/detail-content/${contentId}?type=${type}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.data;
  } catch (error) {
    throw error;
  }
};
