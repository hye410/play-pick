"use client";

import { TMDB_IMAGE_URL } from "@/constants/path-constants";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type ImageSkeletonProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isFill?: boolean;
  sizes?: string;
};

const Shimmer = () => {
  const shimmerVariants = {
    start: { y: "0%" },
    end: { y: "100%" },
  };
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[10px] bg-zinc-600">
      <motion.div
        variants={shimmerVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 2.5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute h-20 w-full bg-zinc-600 opacity-55 shadow-2xl"
      />
    </div>
  );
};

const ImageSkeleton = ({ src, alt, width, height, isFill = false, sizes }: ImageSkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const defaultVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[10px]">
      <motion.div
        key="shimmer-wrapper"
        className={clsx(
          "absolute inset-0 z-10 h-full transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100",
        )}
      >
        <Shimmer />
      </motion.div>

      <motion.div
        variants={defaultVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src={`${TMDB_IMAGE_URL}/${src}`}
          alt={alt}
          width={width}
          height={height}
          fill={isFill}
          sizes={sizes}
          priority
          className={clsx("rounded-[10px]", { "object-cover": isFill })}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </motion.div>
    </div>
  );
};

export default ImageSkeleton;
