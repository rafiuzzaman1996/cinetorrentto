import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return <>
    {/* loading spinner */}
    <div className="w-full px-4 md:px-8 my-4">
      <Skeleton className="w-full h-48 md:h-64 lg:h-80 rounded-lg" />
    </div>
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-4">
          {/* <Skeleton className="w-1/3 h-6 rounded-md mx-4" /> */}
          <div className="flex flex-wrap gap-4 px-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="w-50 h-90 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
}