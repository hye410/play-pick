"use server";
import { FilteredDetailData } from "@/types/contents-types";
import { revalidatePath } from "next/cache";

export const serverToggleLike = async (contentId: FilteredDetailData["id"]) => {
  revalidatePath(`/detail/${contentId}`);
  return { success: true };
};
