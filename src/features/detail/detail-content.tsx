import Star from "@/components/star";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import PreviewVideoButton from "@/features/detail/preview-video-button";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import ShareButton from "@/features/detail/share-button";
import LikeButton from "@/features/detail/like-button";

type DetailContentProps = {
  content: FilteredDetailData;
  user: User | null;
};

const MOVIE = "movie";

const DetailContent = ({ content, user }: DetailContentProps) => {
  return (
    <dl className="flex flex-col items-center gap-3 pb-8">
      {/* ----- 포스터 이미지 ----- */}
      <dt className="hidden">{content.title} 포스터 이미지</dt>
      <dd className="relative h-[350px] w-[250px]">
        <Image src={`${TMDB_IMAGE_URL}/${content.imgUrl}`} alt={content.title} fill sizes="auto" priority />
      </dd>

      {/* ----- 찜 / 공유 필드 ----- */}
      <div className="flex w-[250px] justify-end gap-3 p-1">
        <dt className="hidden">찜하기</dt>
        <dd>
          <LikeButton contentId={content.id} contentType={content.type} user={user} />
        </dd>
        <dt className="hidden">공유하기</dt>
        <dd>
          <ShareButton
            title={`${content.title}(${content.originalTitle})`}
            desc={content.overview}
            posterUrl={content.imgUrl}
          />
        </dd>
      </div>

      {/* ---- 제목 / 원제 ---- */}
      <div className="flex items-center">
        <dt className="hidden">제목</dt>
        <dd>{content.title}</dd>
        <dt className="hidden">원제</dt>
        <dd>&nbsp;({content.originalTitle})</dd>
      </div>

      {/* ----- 평점 ----- */}
      <dt className="hidden">평점</dt>
      <dd>
        <Star rating={content.rating} />
      </dd>

      {/* ----- 장르 ----- */}
      <dt className="hidden">장르</dt>
      <dd>{content.genres}</dd>

      {/* ----- 러닝타임 (* movie일 때만 노출 )----- */}
      {content.type === MOVIE && (
        <div className="flex items-center">
          <dt className="font-bold">러닝타임&nbsp;:&nbsp;</dt>
          <dd>{content.runtime}분</dd>
        </div>
      )}

      {/* ----- 개봉일(movie) or 최근 방영일(tv) ----- */}
      <div className="flex items-center">
        <dt className="font-bold">{content.type === MOVIE ? "개봉일" : "최근 방영일"}&nbsp;:&nbsp;</dt>
        <dd>{content.type === MOVIE ? content.releaseDate : content.lastAirDate}</dd>
      </div>

      {/* ----- 예고편 보기 ----- */}
      <div>
        <dt className="hidden">예고편 보기</dt>
        <dd>
          <PreviewVideoButton title={content.originalTitle} />
        </dd>
      </div>

      {/* ----- 줄거리 -----  */}
      <dt className="hidden">줄거리</dt>
      <dd className="max-w-[70%] text-justify leading-8">{content.overview}</dd>
    </dl>
  );
};

export default DetailContent;
