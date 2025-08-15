import { getTodayPick } from "@/features/home/api/services";
import SurveyButton from "@/features/home/survey-button";

const Home = async () => {
  await getTodayPick();

  return (
    <section className="flex h-full flex-col justify-around bg-red-300">
      <h3 className="text-center text-3xl font-bold">Today's Pick</h3>
      <div className="flex w-full">
        <div className="mx-10 h-80 w-36 rounded-[40px] border bg-pink-200" />
        <div className="mx-10 h-80 w-36 rounded-[40px] border bg-pink-200" />
        <div className="mx-10 h-80 w-36 rounded-[40px] border bg-pink-200" />
        <div className="mx-10 h-80 w-36 rounded-[40px] border bg-pink-200" />
      </div>

      <SurveyButton />
    </section>
  );
};

export default Home;
