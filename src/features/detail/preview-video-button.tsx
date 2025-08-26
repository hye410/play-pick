"use client";
import Button from "@/components/Button";
import { FaYoutube } from "react-icons/fa";
import Swal from "sweetalert2";
import { getPreviewVideo } from "./api/servies";
import { FilteredDetailData } from "@/types/contents-types";
import { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";

const PreviewVideoButton = ({ title: contentTitle }: Pick<FilteredDetailData, "title">) => {
  const handleSearchTheYoutube = async () => {
    try {
      await getPreviewVideo(contentTitle).then((res) => {
        const { videoId, videoTitle } = res;
        openModal({ videoId, videoTitle });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = ({ videoId, videoTitle }: PREVIEW_VIDEO_TYPE) => {
    Swal.fire({
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
      showConfirmButton: false,
      width: "70%",
      heightAuto: true,
    });
  };
  return (
    <Button size="small">
      <span className="flex items-center gap-2" onClick={handleSearchTheYoutube}>
        <FaYoutube aria-label="예고편 보기 버튼" />
        예고편
      </span>
    </Button>
  );
};

export default PreviewVideoButton;
