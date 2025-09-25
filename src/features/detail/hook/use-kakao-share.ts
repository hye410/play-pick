"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { KAKAO_APP_KEY } from "@/constants/kakao-constants";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import { useEffect } from "react";

type UseKakaoShareHookProps = {
  title: FilteredDetailData["title"];
  desc: FilteredDetailData["overview"];
  posterUrl: FilteredDetailData["imgUrl"];
};

const { ERROR } = ALERT_TYPE;
const useKakaoShare = ({ title, desc, posterUrl }: UseKakaoShareHookProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  const handleShareByKakao = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: desc,
          imageUrl: `${TMDB_IMAGE_URL}/${posterUrl}`,
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    } else {
      console.error("카카오 SDK가 로드되지 않았습니다.");
      alert({ type: ERROR, message: "카카오 SDK가 로드되지 않았습니다. 잠시후 다시 시도해 주세요." });
    }
  };

  return {
    handleShareByKakao,
  };
};

export default useKakaoShare;
