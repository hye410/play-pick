import { DETAIL, TMDB_IMAGE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
            className="rounded-[10px]"
          />
        </Link>
      </h4>
    </section>
  );
};

export default Content;
