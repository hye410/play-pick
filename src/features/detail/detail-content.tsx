import Star from "@/components/Star";
import { CONTENTS_TYPE } from "@/constants/contents-constants";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import type { FilteredDetailData } from "@/types/contents-type";
import Image from "next/image";

type DetailContentProps = {
  content: FilteredDetailData;
};

const { MOVIE } = CONTENTS_TYPE;
const DetailContent = ({ content }: DetailContentProps) => {
  return (
    <dl className="flex flex-col items-center gap-3">
      <dt className="hidden">{content.title} 포스터 이미지</dt>
      <dd>
        <Image src={`${TMDB_IMAGE_URL}/${content.imgUrl}`} width={250} height={350} alt={content.title} />
      </dd>
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
      <dt className="hidden">줄거리</dt>
      <dd className="w-1/2 text-justify">{content.overview}</dd>
    </dl>
  );
};

export default DetailContent;
