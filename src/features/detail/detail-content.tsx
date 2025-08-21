import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import { DetailContentData } from "@/types/contents-type";
import Image from "next/image";

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
      <dt className="hidden">런타임</dt>
      <dd>{content.runtime}</dd>
      <dt className="hidden">첫 방영일 / 개봉일</dt>
      <dd>{content.releaseDate}</dd>
      <dt className="hidden">장르</dt>
      <dd>{content.genres}</dd>
      <dt className="hidden">줄거리</dt>
      <dd>{content.overview}</dd>
      <dt className="hidden">평점</dt>
      <dd>{content.rating}</dd>
    </dl>
  );
};

export default DetailContent;
