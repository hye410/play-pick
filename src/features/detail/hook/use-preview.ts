"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getPreviewVideo } from "@/features/detail/api/server-actions";
import type { FilteredDetailData } from "@/types/contents-types";
import type { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";
import { alert } from "@/utils/alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
const { PREVIEW } = QUERY_KEYS;

const { ERROR } = ALERT_TYPE;
const usePreview = ({ title }: Pick<FilteredDetailData, "title">) => {
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    videoData: null as PREVIEW_VIDEO_TYPE | null,
  });

  const getPreviewVideoData = async () => {
    const res = await getPreviewVideo(title);
    if (res.success && res.data) return res.data;
    else throw new Error(res.message as string);
  };

  const { data: youtubeData } = useQuery({
    queryKey: [PREVIEW, title],
    queryFn: getPreviewVideoData,
    staleTime: A_DAY,
    enabled: false,
  });

  const handlePrefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: [PREVIEW, title],
      queryFn: getPreviewVideoData,
    });
  }, [queryClient, title]);

  const closeModal = useCallback(() => {
    setModalState({
      isModalOpen: false,
      videoData: null,
    });
  }, []);

  const handlePreviewVideo = useCallback(async () => {
    if (youtubeData) {
      setModalState({ isModalOpen: true, videoData: youtubeData });
    } else {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: [PREVIEW, title],
          queryFn: getPreviewVideoData,
        });
        setModalState({ isModalOpen: true, videoData: data });
      } catch (error) {
        alert({
          type: ERROR,
          message: (error as Error).message,
        });
      }
    }
  }, [queryClient, title, youtubeData]);

  return {
    handlePrefetch,
    handlePreviewVideo,
    modalState,
    closeModal,
  };
};
export default usePreview;
