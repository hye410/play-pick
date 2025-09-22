"use client";
import Button from "@/components/button";
import { Modal } from "@/components/modal";
import { usePreviewHook } from "@/features/detail/hook/use-preview-hook";
import type { FilteredDetailData } from "@/types/contents-types";
import { FaYoutube } from "react-icons/fa";

const PreviewVideoButton = ({ title: contentTitle }: Pick<FilteredDetailData, "title">) => {
  const { handlePrefetch, handlePreviewVideo, modalState, closeModal } = usePreviewHook({ title: contentTitle });
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
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${videoData.videoId}`}
            title={videoData.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal>
      )}
    </>
  );
};

export default PreviewVideoButton;
