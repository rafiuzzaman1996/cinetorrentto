import Categories from "@/components/website/CategorySections/Categories";
import FeaturedContent from "@/components/website/FeaturedContent";

export default function Home() {
  return (
    <>
      <FeaturedContent />
      <div className="flex">
        <div className="w-full xl:w-11/12">
          <Categories />
        </div>
        <div className="hidden bg-gray-500 xl:block xl:w-1/12">Ad</div>
      </div>
    </>
  );
}
