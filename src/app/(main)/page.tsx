import ContentsBox from "@/components/contents-box";
import { getTodayPick } from "@/features/home/api/services";
import SurveyButton from "@/features/home/survey-button";

const Home = async () => {
  const contents = await getTodayPick();

  return (
    <section className="h-full max-h-fit">
      <div className="flex h-full flex-col items-center justify-evenly overflow-auto py-6">
        <h3 className="mb-4 text-center text-3xl font-extrabold">Today&apos;s Pick</h3>
        <ContentsBox contents={contents} />
        <SurveyButton />
      </div>
    </section>
  );
};

export default Home;
