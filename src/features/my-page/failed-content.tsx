import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import useLikedContentMutation from "@/features/detail/hook/use-liked-content-mutation";
import { ALERT_TYPE } from "@/constants/alert-constants";

type FailedContent = {
  content: USER_LIKES_TYPE;
  userId: User["id"];
};

const { ERROR } = ALERT_TYPE;

const FailedContent = ({ content, userId }: FailedContent) => {
  const {
    getLikedContentMutate,
    isError: isGetLikedContentError,
    error: getLikedContentError,
  } = useLikedContentMutation(userId);
  if (isGetLikedContentError) {
    alert({ type: ERROR, message: getLikedContentError?.message as string });
  }
  return (
    <div
      key={`error_${content.id}`}
      className="flex h-80 flex-col items-center justify-center rounded border border-error p-4"
    >
      <span>콘텐츠 불러오기 실패</span>
      <button
        className="mt-2 rounded bg-primary px-3 py-1 text-white"
        onClick={() => getLikedContentMutate({ id: content.id, type: content.type })}
      >
        다시 시도
      </button>
    </div>
  );
};

export default FailedContent;
