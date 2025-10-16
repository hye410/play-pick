import Star from "@/components/star";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import LikeButton from "@/features/detail/like-button";
import PreviewVideoButton from "@/features/detail/preview-video-button";
import ShareButton from "@/features/detail/share-button";
import type { FilteredDetailData } from "@/types/contents-types";
import { getPlaceholderDataURL } from "@/utils/get-placeholder-data-url";
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
    <dl className="flex h-full w-full flex-col items-center gap-3 overflow-y-scroll pb-8 scrollbar-hide">
      {/* ----- 포스터 이미지 ----- */}
      <dt className="hidden">{content.title} 포스터 이미지</dt>
      <dd>
        <Image
          src={`${TMDB_IMAGE_URL}/${content.imgUrl}`}
          alt={content.title}
          width={250}
          height={350}
          placeholder="blur"
          blurDataURL={getPlaceholderDataURL()}
          className="rounded-[10px]"
        />
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
        <dd className="text-base font-extrabold md:text-lg">{content.title}</dd>
        <dt className="hidden">원제</dt>
        <dd className="text-sm md:text-base">&nbsp;({content.originalTitle})</dd>
      </div>

      {/* ----- 평점 ----- */}
      <dt className="hidden">평점</dt>
      <dd>{content.rating ? <Star rating={content.rating} /> : "평가 대기 중"}</dd>

      {/* ----- 장르 ----- */}
      <dt className="hidden">장르</dt>
      <dd className="text-sm md:text-base">{content.genres}</dd>

      {/* ----- 러닝타임 (* movie일 때만 노출 )----- */}
      {content.type === MOVIE && (
        <div className="flex items-center">
          <dt className="text-sm font-bold md:text-base">러닝타임&nbsp;:&nbsp;</dt>
          <dd className="text-sm md:text-base">{content.runtime}분</dd>
        </div>
      )}

      {/* ----- 개봉일(movie) or 최근 방영일(tv) ----- */}
      <div className="flex items-center">
        <dt className="text-sm font-bold md:text-base">
          {content.type === MOVIE ? "개봉일" : "최근 방영일"}&nbsp;:&nbsp;
        </dt>
        <dd className="text-sm md:text-base">{content.type === MOVIE ? content.releaseDate : content.lastAirDate}</dd>
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
      <dd className="break-keep text-justify text-sm leading-8 md:max-w-[80%] md:text-base xl:max-w-[70%]">
        {content.overview || (
          <p className="whitespace-nowrap text-center text-sm md:text-base">
            줄거리에 대한 내용이 없습니다.
            <br /> 예고편을 참고해 주세요.
          </p>
        )}
      </dd>
    </dl>
  );
};

export default DetailContent;
