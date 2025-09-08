"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPreviewVideo } from "@/features/detail/api/services";
import { A_DAY } from "@/constants/fetch-time-constants";
import { modal } from "@/utils/modal";
import type { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { useCallback } from "react";
import { FilteredDetailData } from "@/types/contents-types";
const { PREVIEW } = QUERY_KEYS;

const { ERROR } = ALERT_TYPE;
export const usePreviewHook = ({ title }: Pick<FilteredDetailData, "title">) => {
  const queryClient = useQueryClient();
  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: [PREVIEW, title],
      queryFn: () => getPreviewVideo(title),
    });
  };

  const { data } = useQuery({
    queryKey: [PREVIEW, title],
    queryFn: () => getPreviewVideo(title),
    staleTime: A_DAY,
    enabled: false,
  });

  const handleSearchTheYoutube = useCallback(() => {
    if (data) openModal({ videoId: data.videoId, videoTitle: data.videoTitle });
    else {
      queryClient
        .fetchQuery({
          queryKey: [PREVIEW, title],
          queryFn: () => getPreviewVideo(title),
        })
        .then((data) => openModal(data))
        .catch((error) => {
          console.error(error);
          alert({
            type: ERROR,
            message: error as string,
          });
        });
    }
  }, [data, queryClient, title]);

  const openModal = ({ videoId, videoTitle }: PREVIEW_VIDEO_TYPE) => {
    modal({
      html: `
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/${videoId}"
                title="${videoTitle}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            `,
    });
  };
  return {
    handlePrefetch,
    handleSearchTheYoutube,
  };
};
