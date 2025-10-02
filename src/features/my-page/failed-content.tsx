import { ALERT_TYPE } from "@/constants/alert-constants";
import useLikedSingleContentMutation from "@/features/detail/hook/use-liked-single-content-mutation";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";

type FailedContent = {
  content: USER_LIKES_TYPE;
  userId: User["id"];
};

const { ERROR } = ALERT_TYPE;
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;

const FailedContent = ({ content, userId }: FailedContent) => {
  const { getSingleContent, isError, error } = useLikedSingleContentMutation(userId);
  if (isError) {
    alert({ type: ERROR, message: error?.message || UNKNOWN_ERROR });
  }
  return (
    <div
      key={`error_${content.id}`}
      className="flex h-80 flex-col items-center justify-center rounded border border-error p-4"
    >
      <span>콘텐츠 불러오기 실패</span>
      <button
        className="mt-2 rounded bg-primary px-3 py-1 text-white"
        onClick={() => getSingleContent({ id: content.id, type: content.type })}
      >
        다시 시도
      </button>
    </div>
  );
};

export default FailedContent;
