import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PendingLikesState = {
  dataToFetch: Array<USER_LIKES_TYPE>;
};

type PendingLikesAction = {
  addToPendingLikes: (id: USER_LIKES_TYPE["id"], type: USER_LIKES_TYPE["type"]) => void;
  removeFromPendingLikes: (id: USER_LIKES_TYPE["id"]) => void;
  resetDataToFetch: () => void;
};
const initialState: PendingLikesState = {
  dataToFetch: [],
};

export const usePendingLikesStore = create<PendingLikesState & PendingLikesAction>()(
  persist(
    (set) => ({
      ...initialState,
      addToPendingLikes: (id, type) => set((state) => ({ dataToFetch: [...state.dataToFetch, { id, type }] })),
      removeFromPendingLikes: (id) =>
        set((state) => ({ dataToFetch: state.dataToFetch.filter((data) => data.id !== id) })),
      resetDataToFetch: () => set(() => ({ dataToFetch: [] })),
    }),
    {
      name: "pending-user-likes",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
