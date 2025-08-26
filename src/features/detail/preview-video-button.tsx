"use client";
import Button from "@/components/Button";
import { FilteredDetailData } from "@/types/contents-types";
import { FaYoutube } from "react-icons/fa";
import { usePreviewHook } from "@/features/detail/hook/use-preview-hook";

const PreviewVideoButton = ({ title: contentTitle }: Pick<FilteredDetailData, "title">) => {
  const { handlePrefetch, handleSearchTheYoutube } = usePreviewHook({ title: contentTitle });

  return (
    <Button size="small" onMouseEnter={handlePrefetch} onClick={handleSearchTheYoutube}>
      <span className="flex items-center justify-center gap-2">
        <FaYoutube aria-label="예고편 보기 버튼" /> 예고편
      </span>
    </Button>
  );
};

export default PreviewVideoButton;
