import { DETAIL, TMDB_IMAGE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-types";
import Link from "next/link";
import ImageSkeleton from "./image-skeleton";
import Image from "next/image";

type ContentProps = {
  content: CombinedData;
  hasSkeleton?: boolean;
};

const Content = ({ content, hasSkeleton = false }: ContentProps) => {
  return (
    <section className="relative h-80 w-full">
      <h4>
        <Link className="absolute inset-0" href={`${DETAIL}/${content.id}?type=${content.type}`}>
          {hasSkeleton ? (
            <ImageSkeleton src={content.imgUrl} alt={content.title} sizes="25%" isFill={true} />
          ) : (
            <Image
              src={`${TMDB_IMAGE_URL}/${content.imgUrl}`}
              fill
              sizes="25%"
              priority
              alt={content.title}
              className="rounded-[10px]"
            />
          )}
        </Link>
      </h4>
    </section>
  );
};

export default Content;
