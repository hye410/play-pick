"use client";
import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-type";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

type ContentsBoxProps = {
  contents: CombinedData[];
};

const ContentsBox = ({ contents }: ContentsBoxProps) => {
  return (
    <div className="relative mx-auto w-[80%] rounded-[20px] border border-secondary">
      <Swiper
        className="my-1 w-[98%]"
        spaceBetween={20}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Scrollbar]}
        slidesPerView={4}
        autoHeight={true}
      >
        {contents.map((content) => (
          <SwiperSlide key={`swiper_content_${content.id}`}>
            <section className="h-80 w-full">
              <h4>
                <Link href={`/detail/${content.id}`}>
                  <Image
                    src={`${TMDB_IMAGE_URL}/${content.imgUrl}`}
                    fill
                    alt={content.title}
                    className="rounded-[10px]"
                  />
                </Link>
              </h4>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentsBox;
