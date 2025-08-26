import Star from "@/components/Star";
import { CONTENTS_TYPE } from "@/constants/contents-constants";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import type { FilteredDetailData } from "@/types/contents-types";
import Image from "next/image";
import PreviewVideoButton from "./preview-video-button";

type DetailContentProps = {
  content: FilteredDetailData;
};

const { MOVIE } = CONTENTS_TYPE;
const DetailContent = ({ content }: DetailContentProps) => {
  console.log("content=>", content);
  return (
    <dl className="flex flex-col items-center gap-3 pb-8">
      <dt className="hidden">{content.title} 포스터 이미지</dt>
      <dd className="relative h-[350px] w-[250px]">
        <Image src={`${TMDB_IMAGE_URL}/${content.imgUrl}`} fill alt={content.title} sizes="auto" />
      </dd>
      <div className="flex w-[250px] justify-end gap-3 p-1">
        <dt className="hidden">찜하기</dt>
        <dd>찜</dd>
        <dt className="hidden">공유하기</dt>
        <dd>공유</dd>
      </div>
      <div className="flex items-center">
        <dt className="hidden">제목</dt>
        <dd>{content.title}</dd>
        <dt className="hidden">원제</dt>
        <dd>&nbsp;({content.originalTitle})</dd>
      </div>
      <dt className="hidden">평점</dt>
      <dd>
        <Star rating={content.rating} />
      </dd>
      <dt className="hidden">장르</dt>
      <dd>{content.genres}</dd>
      {content.type === MOVIE && (
        <div className="flex items-center">
          <dt className="font-bold">러닝타임&nbsp;:&nbsp;</dt>
          <dd>{content.runtime}분</dd>
        </div>
      )}
      <div className="flex items-center">
        <dt className="font-bold">{content.type === MOVIE ? "개봉일" : "최근 방영일"}&nbsp;:&nbsp;</dt>
        <dd>{content.type === MOVIE ? content.releaseDate : content.lastAirDate}</dd>
      </div>
      <div>
        <dt className="hidden">예고편 보기</dt>
        <dd>
          <PreviewVideoButton title={content.originalTitle} />
        </dd>
      </div>
      <dt className="hidden">줄거리</dt>
      <dd className="max-w-[70%] text-justify leading-8">{content.overview}</dd>
    </dl>
  );
};

export default DetailContent;
