"use client";
import { KAKAO_APP_KEY } from "@/constants/kakao-constants";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import { FilteredDetailData } from "@/types/contents-types";
import { useEffect } from "react";
import { FiShare } from "react-icons/fi";

type ShareButtonProps = {
  title: FilteredDetailData["title"];
  desc: FilteredDetailData["overview"];
  poster: FilteredDetailData["imgUrl"];
};
const ShareButton = ({ title, desc, poster }: ShareButtonProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  const handleShare = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: desc,
          imageUrl: `${TMDB_IMAGE_URL}/${poster}`,
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        buttons: [
          {
            title: "보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    } else console.error("카카오 SDK가 로드되지 않았습니다.");
  };
  return (
    <button onClick={handleShare}>
      <FiShare aria-label="공유하기 아이콘" />
    </button>
  );
};

export default ShareButton;
