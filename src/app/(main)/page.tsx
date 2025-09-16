import ContentsBox from "@/components/contents-box";
import { getTodayPick } from "@/features/home/api/services";
import SurveyButton from "@/features/home/survey-button";

const Home = async () => {
  const contents = await getTodayPick();

  return (
    <section className="flex h-full flex-col justify-center">
      <div className="mb-16">
        <h3 className="mb-8 text-center text-3xl font-extrabold">Today&apos;s Pick</h3>
        <ContentsBox contents={contents} />
      </div>
      <div className="mx-auto w-1/3">
        <SurveyButton />
      </div>
    </section>
  );
};

export default Home;
