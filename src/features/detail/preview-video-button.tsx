"use client";
import Button from "@/components/button";
import Modal from "@/components/modal";
import type { FilteredDetailData } from "@/types/contents-types";
import { FaYoutube } from "react-icons/fa";
import YouTubeLiteEmbed from "@/features/detail/youtube-lite-embed";
import usePreview from "@/features/detail/hook/use-preview";

const PreviewVideoButton = ({ title: contentTitle }: Pick<FilteredDetailData, "title">) => {
  const { handlePrefetch, handlePreviewVideo, modalState, closeModal } = usePreview({ title: contentTitle });
  const { isModalOpen, videoData } = modalState;
  return (
    <>
      <Button size="small" onMouseEnter={handlePrefetch} onClick={handlePreviewVideo}>
        <span className="flex items-center justify-center gap-2">
          <FaYoutube aria-label="예고편 보기 버튼" /> 예고편
        </span>
      </Button>
      {isModalOpen && videoData && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <YouTubeLiteEmbed videoId={videoData.videoId} title={videoData.videoTitle} />
        </Modal>
      )}
    </>
  );
};

export default PreviewVideoButton;
