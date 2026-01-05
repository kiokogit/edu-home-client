import { useEffect, useMemo, useState } from "react"
import { ListingCard } from "@/components/Cards"
import { ChevronDown } from "lucide-react"
import { useEventsStore } from "@/stores/postsStore"

type SortOption =
  | "newest"
  | "oldest"
  | "price_low"
  | "price_high"
  | "upvotes"

export default function SouqPage() {

  const { ads, fetchAds } = useEventsStore();

  const [sortBy, setSortBy] = useState<SortOption>("newest")

  useEffect(() => {
    fetchAds();
  }, []);

  const sortedListings = useMemo(() => {
    const data = ads

    switch (sortBy) {
      case "newest":
        return data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )

      case "oldest":
        return data.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        )

      default:
        return data
    }
  }, [sortBy])

  return (
    <div className="min-h-screen my-1 mb-8">
      <div className="max-w-7xl mx-auto py-4 px-2">

        {/* Filter Row */}
        <div className="flex justify-end mb-4 items-center">
            <span className="text-sm text-gray-500 font-semibold mr-2">Filter By: </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="
                appearance-none text-xs px-3 py-2 pr-8 rounded-md border
                bg-white dark:bg-gray-900
                text-gray-700 dark:text-gray-200
                border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-1 focus:ring-gray-400
              "
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="upvotes">Most Upvoted</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
            </select>

            {/* Dropdown Icon */}
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>
        </div>

        {/* Listings */}
        <div className="grid md:grid-cols-2 gap-2">
          {sortedListings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
