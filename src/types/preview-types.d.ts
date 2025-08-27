export type YOUTUBE_RESPONSE_TYPE = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: "KR";
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: YOUTUBE_RESULT_TYPE[];
};

export type YOUTUBE_RESULT_TYPE = {
  kind: YOUTUBE_RESPONSE_TYPE["kind"];
  etag: YOUTUBE_RESPONSE_TYPE["etag"];
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
  };
};

export type PREVIEW_VIDEO_TYPE = {
  videoId: YOUTUBE_RESULT_TYPE["id"]["videoId"];
  videoTitle: YOUTUBE_RESULT_TYPE["snippet"]["title"];
};
