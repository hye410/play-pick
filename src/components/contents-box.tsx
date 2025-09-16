"use client";
import { CombinedData } from "@/types/contents-types";
import "swiper/css";
import "swiper/css/scrollbar";
import { Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Content from "@/components/content";
import { useEffect, useState } from "react";

type ContentsBoxProps = {
  contents: CombinedData[];
};

const InitialContent = ({ contents }: Pick<ContentsBoxProps, "contents">) => {
  return (
    <div className={`flex w-full items-center gap-5 px-2 py-[15px] transition-opacity duration-300`}>
      {contents.slice(0, 4).map((content) => (
        <div key={content.id} className="h-[324px] w-1/4">
          <Content content={content} />
        </div>
      ))}
    </div>
  );
};

const ContentsBox = ({ contents }: ContentsBoxProps) => {
  const [hasSwiper, setHasSwiper] = useState(false);

  useEffect(() => {
    setHasSwiper(true);
  }, [hasSwiper]);

  return (
    <div className="mx-auto w-[80%] rounded-[20px] border border-secondary">
      {!hasSwiper ? (
        <InitialContent contents={contents} />
      ) : (
        <Swiper
          className={`h-80 w-[98%] overflow-hidden transition-opacity duration-300 ${hasSwiper ? "opacity-100" : "opacity-0"}`}
          spaceBetween={20}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Autoplay, Scrollbar]}
          slidesPerView={4}
          autoHeight={true}
        >
          {contents.map((content) => (
            <SwiperSlide key={`swiper_content_${content.id}`} className="pb-1">
              <Content content={content} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ContentsBox;
