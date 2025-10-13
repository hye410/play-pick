import Star from "@/components/star";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import LikeButton from "@/features/detail/like-button";
import PreviewVideoButton from "@/features/detail/preview-video-button";
import ShareButton from "@/features/detail/share-button";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

type DetailContentProps = {
  content: FilteredDetailData;
  userId: User["id"] | null;
  isInitLiked: boolean;
};

const MOVIE = "movie";

const DetailContent = ({ content, userId, isInitLiked }: DetailContentProps) => {
  return (
    <dl className="flex flex-col items-center gap-3 pb-8">
      {/* ----- 포스터 이미지 ----- */}
      <dt className="hidden">{content.title} 포스터 이미지</dt>
      <dd className="relative h-[350px] w-[250px]">
        <Image src={`${TMDB_IMAGE_URL}/${content.imgUrl}`} alt={content.title} fill sizes="250px" />
      </dd>

      {/* ----- 찜 / 공유 필드 ----- */}
      <div className="flex w-[250px] justify-end gap-3 p-1">
        <dt className="hidden">찜하기</dt>
        <dd>
          <LikeButton contentId={content.id} contentType={content.type} userId={userId} isInitLiked={isInitLiked} />
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
      <div className="flex flex-col items-center">
        <dt className="hidden">제목</dt>
        <dd className="text-lg font-extrabold">{content.title}</dd>
        <dt className="hidden">원제</dt>
        <dd>&nbsp;({content.originalTitle})</dd>
      </div>

      {/* ----- 평점 ----- */}
      <dt className="hidden">평점</dt>
      <dd>{content.rating ? <Star rating={content.rating} /> : "평가 대기 중"}</dd>

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
      <dd className="max-w-[70%] break-keep text-justify leading-8">
        {content.overview || (
          <p className="whitespace-nowrap text-center">
            줄거리에 대한 내용이 없습니다.
            <br /> 예고편을 참고해 주세요.
          </p>
        )}
      </dd>
    </dl>
  );
};

export default DetailContent;
