"use client";
import { FilteredDetailData } from "@/types/contents-types";
import { FiShare } from "react-icons/fi";
import { UseKakaoShareHook } from "./hook/use-kakao-share-hook";

type ShareButtonProps = {
  title: FilteredDetailData["title"];
  desc: FilteredDetailData["overview"];
  posterUrl: FilteredDetailData["imgUrl"];
};
const ShareButton = ({ title, desc, posterUrl }: ShareButtonProps) => {
  const { handleShareByKakao } = UseKakaoShareHook({ title, desc, posterUrl });
  return (
    <button onClick={handleShareByKakao}>
      <FiShare aria-label="공유하기 아이콘" />
    </button>
  );
};

export default ShareButton;
