import { useState, useMemo } from "react";
import { Search, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";

export default function LearningPathsCatalog() {
    const paths = [
    // Tech & Robotics
    {
        id: "robotics-101",
        title: "Robotics & Automation",
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&q=80",
        summary: "Build your first robot. Learn Arduino, sensors, and basic mechanics.",
        category: "Tech & Robotics",
        stagesCount: 5,
        totalModules: 20,
        includesCertificate: true,
        priceKES: 4500,
        isPremiumIncluded: true,
        stages: []
    },
    {
        id: "python-coding",
        title: "Python for Real World",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
        summary: "Automate tasks, analyze data, and build scripts with Python.",
        category: "Tech & Robotics",
        stagesCount: 5,
        totalModules: 15,
        includesCertificate: true,
        priceKES: 3500,
        isPremiumIncluded: true,
        stages: []
    },
    // Handiwork & Trade
    {
        id: "plumbing-basics",
        title: "Home Plumbing Basics",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&q=80",
        summary: "Master the wrench. Fix leaks, install faucets, and understand home water systems.",
        category: "Handiwork & Trade",
        stagesCount: 4,
        totalModules: 12,
        includesCertificate: true,
        priceKES: 3000,
        isPremiumIncluded: false,
        stages: []
    },
    {
        id: "creative-carpentry",
        title: "Creative Carpentry",
        image: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=600&q=80",
        summary: "Woodworking for beginners. Build furniture, birdhouses, and art.",
        category: "Handiwork & Trade",
        stagesCount: 6,
        totalModules: 18,
        includesCertificate: true,
        priceKES: 5000,
        isPremiumIncluded: false,
        stages: []
    },
    // Creative Arts
    {
        id: "photography-mastery",
        title: "Photography Mastery",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
        summary: "Capture the world. Learn composition, lighting, and editing.",
        category: "Creative Arts",
        stagesCount: 5,
        totalModules: 15,
        includesCertificate: true,
        priceKES: 4000,
        isPremiumIncluded: true,
        stages: []
    },
    {
        id: "fashion-design",
        title: "Fashion & Tailoring",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
        summary: "Design and sew your own clothes. From sketching to stitching.",
        category: "Creative Arts",
        stagesCount: 8,
        totalModules: 24,
        includesCertificate: true,
        priceKES: 6000,
        isPremiumIncluded: false,
        stages: []
    },
    // Life Skills
    {
        id: "public-speaking",
        title: "Public Speaking & Confidence",
        image: "https://images.unsplash.com/photo-1475721027767-4d529c14e569?w=600&q=80",
        summary: "Speak with power. Learn to present ideas and lead crowds.",
        category: "Life Skills",
        stagesCount: 3,
        totalModules: 9,
        includesCertificate: true,
        priceKES: 2500,
        isPremiumIncluded: true,
        stages: []
    },
    {
        id: "financial-literacy",
        title: "Financial Literacy for Teens",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
        summary: "Money smarts. Budgeting, saving, and investing basics.",
        category: "Life Skills",
        stagesCount: 4,
        totalModules: 10,
        includesCertificate: true,
        priceKES: 2000,
        isPremiumIncluded: true,
        stages: []
    }
  ];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  useHeaderTitle("Learning Catalogue");

  const categories = ["all", ...new Set(paths.map(p => p.category))];

  const filtered = useMemo(() => {
    return paths.filter(p =>
      (category === "all" || p.category === category) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase()))
    );
  }, [paths, search, category]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 text-gray-900 dark:text-gray-100">
      
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 w-full md:w-96 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search paths..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium border transition
                ${category === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Paths Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div
            key={p.id}
            className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition group"
          >
            {/* Banner Image */}
            <div className="relative h-40 overflow-hidden">
              <img src={p.image || ''} alt={p.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Title on Image */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-semibold text-white drop-shadow">{p.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 min-h-[45px]">{p.summary}</p>

              {/* Compact Badges */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-[2px] rounded-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                  {p.stagesCount} stages
                </span>
                <span className="px-2 py-[2px] rounded-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                  {p.totalModules}+ modules
                </span>
                {p.includesCertificate && (
                  <span className="px-2 py-[2px] rounded-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" /> Certificate
                  </span>
                )}
              </div>

              {/* Price / Premium */}
              <div className="flex items-center justify-between mt-2">
                {p.isPremiumIncluded ? (
                  <span className="text-xs font-medium text-green-600">Included in Premium</span>
                ) : (
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    KES {p.priceKES}
                  </span>
                )}

                <Link to={`/student/catalog/${p.id}`} className="flex items-center gap-1 text-green-600 text-xs font-medium hover:underline">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-16">No paths match your search.</div>
      )}
    </div>
  );
}
