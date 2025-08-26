"use client";
import Button from "@/components/Button";
import { FilteredDetailData } from "@/types/contents-types";
import { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";
import { modal } from "@/utils/modal";
import { FaYoutube } from "react-icons/fa";
import { getPreviewVideo } from "@/features/detail/api/services";
import { alert } from "@/utils/alert";
import { ALERT_TYPE } from "@/constants/alert-constants";

const { ERROR } = ALERT_TYPE;
const PreviewVideoButton = ({ title: contentTitle }: Pick<FilteredDetailData, "title">) => {
  const handleSearchTheYoutube = async () => {
    try {
      await getPreviewVideo(contentTitle).then((res) => {
        const { videoId, videoTitle } = res;
        openModal({ videoId, videoTitle });
      });
    } catch (error) {
      console.error(error);
      alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

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
