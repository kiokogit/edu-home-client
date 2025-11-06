"use client";
import { useState, useMemo } from "react";
import { Search, Star, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LearningPathsCatalog() {
    const paths = [
  {
    id: "game-development",
    title: "Game Development Learning Path",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048946.png",
    summary: "Design & build 2D and 3D games — from mechanics to scripting, AI & publishing.",
    category: "Game Development",
    stagesCount: 5,
    totalModules: 16,
    includesCertificate: true,
    priceKES: 3500,
    isPremiumIncluded: false,

    stages: [
      {
        id: "s1",
        title: "Game Design",
        status: "completed",
        purchased: true,
        resources: 4,
        assignments: 2,
        projects: 1,
        sandbox: 1,
        modules: [
          { id: "m1", title: "What is a Game?", done: true },
          { id: "m2", title: "Game Loops", done: true },
          { id: "m3", title: "Character vs Player", done: true }
        ]
      },

      {
        id: "s2",
        title: "2D Game Engines",
        status: "completed",
        purchased: true,
        resources: 4,
        assignments: 2,
        projects: 1,
        sandbox: 1,
        modules: [
          { id: "m1", title: "Sprites & Assets", done: true },
          { id: "m2", title: "Scene & World", done: true }
        ]
      },

      {
        id: "s3",
        title: "3D Basics & Unity",
        status: "current",
        progress: 45,
        purchased: true,
        resources: 3,
        assignments: 8,
        projects: 1,
        sandbox: 1,
        modules: [
          { id: "m1", title: "Unity Interface", done: true },
          { id: "m2", title: "3D Transformations", done: false, is_current: true },
          { id: "m3", title: "Prefabs & Scenes", done: false }
        ]
      },

      {
        id: "s4",
        title: "Scripting & Game AI",
        status: "upcoming",
        purchased: false,
        priceKES: 1500,
        resources: 4,
        assignments: 2,
        projects: 0,
        sandbox: 1,
        modules: [
          { id: "m1", title: "Internal Scripting", done: false },
          { id: "m2", title: "Command Issuance", done: false },
          { id: "m3", title: "Strategy & Design", done: false },
          { id: "m4", title: "Designing For Life", done: false }
        ]
      },

      {
        id: "s5",
        title: "Publish & Iterate",
        status: "upcoming",
        purchased: false,
        priceKES: 2000,
        resources: 1,
        assignments: 4,
        projects: 1,
        sandbox: 1,
        modules: [
          { id: "m1", title: "ZBook Publishing", done: false },
          { id: "m2", title: "Refine & Improve", done: false }
        ]
      }
    ]
  }
];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Browse Learning Paths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choose a structured journey — learn step-by-step with guidance.
        </p>
      </div>

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

                <Link href={`/student/catalog/${p.id}`} className="flex items-center gap-1 text-green-600 text-xs font-medium hover:underline">
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
