import { useState } from "react";

type YouTubeLiteEmbedProps = {
  videoId: string;
  title: string;
  width?: string;
  height?: string;
};

const YouTubeLiteEmbed = ({ videoId, title }: YouTubeLiteEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <div
        className="relative flex h-[400px] w-full cursor-pointer items-center justify-center bg-black"
        onClick={() => setIsLoaded(true)}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={`${title} 썸네일`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-all hover:bg-opacity-30">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700">
            <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="h-[400px] w-full"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
      tabIndex={0}
      aria-label={`${title} 예고편 동영상`}
    />
  );
};

export default YouTubeLiteEmbed;
