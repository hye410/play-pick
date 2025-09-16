import { DETAIL, TMDB_IMAGE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-types";
import { getPlaceholderDataURL } from "@/utils/get-placeholder-data-url";
import Image from "next/image";
import Link from "next/link";

type ContentProps = {
  content: CombinedData;
};

const Content = ({ content }: ContentProps) => {
  return (
    <section className="relative h-80 w-full">
      <h4>
        <Link className="absolute inset-0" href={`${DETAIL}/${content.id}?type=${content.type}`}>
          <Image
            src={`${TMDB_IMAGE_URL}/${content.imgUrl}`}
            fill
            sizes="25%"
            alt={content.title}
            placeholder="blur"
            blurDataURL={getPlaceholderDataURL()}
            className="rounded-[10px]"
          />
        </Link>
      </h4>
    </section>
  );
};

export default Content;
