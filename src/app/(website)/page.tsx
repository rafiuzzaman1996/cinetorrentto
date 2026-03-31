import HomeAds from "@/components/website/Ad/HomeAd";
import Categories from "@/components/website/CategorySection/Categories";
import FeaturedContent from "@/components/website/FeaturedSection/FeaturedContent";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <FeaturedContent />
      <div className="flex">
        <div className="w-full xl:w-16/18">
          <Categories />
        </div>
        <div className="hidden xl:block xl:w-2/18 px-1">
          <HomeAds />
        </div>
      </div>
    </>
  );
}
