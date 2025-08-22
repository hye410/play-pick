import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import { DetailContentData } from "@/types/contents-type";
import Image from "next/image";
import { getRatingStar } from "./utils/get-rating-star";
import Star from "@/components/Star";

type DetailContentProps = {
  content: DetailContentData;
};

const DetailContent = ({ content }: DetailContentProps) => {
  return (
    <dl>
      <dt className="hidden">포스터 이미지</dt>
      <dd>
        <Image src={`${TMDB_IMAGE_URL}/${content.imgUrl}`} width={200} height={300} alt={content.title} />
      </dd>
      <dt className="hidden">제목</dt>
      <dd>{content.title}</dd>
      <dt className="hidden">원제</dt>
      <dd>{content.originalTitle}</dd>
      <dt>평점</dt>
      <dd>
        <Star rating={content.rating} />
      </dd>
      <dt className="hidden">장르</dt>
      <dd>{content.genres}</dd>
      <dt>런타임</dt>
      <dd>{content.runtime}</dd>
      <dt>{content.type === "movie" ? "개봉일" : "첫 방영일"}</dt>
      <dd>{content.releaseDate}</dd>
      <dt className="hidden">줄거리</dt>
      <dd>{content.overview}</dd>
    </dl>
  );
};

export default DetailContent;
