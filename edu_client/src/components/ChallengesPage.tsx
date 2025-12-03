import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";

type Difficulty = "Easy" | "Medium" | "Hard";

interface Challenge {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  completed: boolean;
  attempted: boolean;
}

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showTutorPanel, setShowTutorPanel] = useState(false);
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [query2, setQuery2] = useState("");
  const [topicFilter2, setTopicFilter2] = useState("All");
  useHeaderTitle("Coding Challenges");

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Loops Basics",
      difficulty: "Easy",
      tags: ["Python", "Loops"],
      completed: false,
      attempted: true,
    },
    {
      id: 2,
      title: "Conditional Logic Quiz",
      difficulty: "Medium",
      tags: ["JavaScript", "Conditionals"],
      completed: false,
      attempted: false,
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Hard",
      tags: ["Strings", "Sliding Window"],
      completed: true,
      attempted: true,
    },
  ];


  const leaderboard = [
    { name: "Amina", score: 1200 },
    { name: "Brian", score: 1100 },
    { name: "You", score: 950 },
    { name: "Lana", score: 900 },
  ];

  const difficultyBadge = (d: Difficulty) => {
    if (d === "Easy") return "bg-green-100 text-green-700";
    if (d === "Medium") return "bg-amber-100 text-amber-700";
    return "bg-rose-100 text-rose-700";
  };

  const progressText = (c: Challenge) => {
    if (c.completed) return "✅ ";
    if (c.attempted) return "✅";
    return "⌛";
  };

  // filter + search (client-side placeholder)
  const visible = challenges.filter((c) => {
    if (topicFilter !== "All" && !c.tags.includes(topicFilter)) return false;
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const visible2 = challenges.filter((c) => {
    if (topicFilter2 !== "All" && !c.tags.includes(topicFilter2)) return false;
    if (query2 && !c.title.toLowerCase().includes(query2.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header - Moved to Top Nav */}
        {/* <header className="mb-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Coding Challenges</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500 dark:text-slate-400">0/3735 Solved</div>
            <button className="px-2 py-1 rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm shadow hover:shadow-lg transition">
              Code for yourself
            </button>
          </div>
        </header> */}

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Filters (narrow) */}
          <aside className="col-span-12 lg:col-span-2">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm border border-transparent dark:border-slate-800">
                <h3 className="text-sm font-medium mb-2">Your Learning Path</h3>
                <div className="text-xs text-slate-500">Game Development</div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm border border-transparent dark:border-slate-800">
                <h3 className="text-sm font-medium mb-2">Topics</h3>
                <ul className="space-y-2 text-sm">
                  {["All", "Algorithms", "Database", "Python"].map((t) => (
                    <li key={t}>
                      <button
                        onClick={() => setTopicFilter(t)}
                        className={`w-full text-left px-2 py-1 rounded-md text-sm transition ${
                          topicFilter === t
                            ? 'bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm border border-transparent dark:border-slate-800">
                <h3 className="text-sm font-medium mb-2">Sort</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 rounded-md border-transparent bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-100"
                >
                  <option value="recommended">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main: Problem list */}
          <main className="col-span-12 lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow border border-transparent dark:border-slate-800 transition-colors">
              {/* Filter row */}
              <div className="flex justify-between mb-4 gap-4 flex-col">
                <div className="flex w-full justify-between items-center gap-1">
                    <div className="text-sm font-semibold">
                        For You Challenges
                    </div>
                    <div className="flex justify-end items-center gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400">{visible.length} results</div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search problems"
                      className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm w-64 text-slate-700 dark:text-white"
                    />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-3 flex-wrap">
                  {["All", "Algorithms", "Database", "Python"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopicFilter(t)}
                      className={`px-3 py-1 rounded-full text-xs transition ${
                        topicFilter === t
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <div className="col-span-7">Title</div>
                <div className="col-span-2 text-center">Submissions</div>
                <div className="col-span-2 text-center">Difficulty</div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* List rows */}
              <div className="space-y-1">
                {visible.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChallenge(c)}
                    className="grid grid-cols-12 gap-2 items-center p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                  >
                    <div className="col-span-7">
                      <div className="flex flex-col items-left gap-1">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{c.title}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{c.tags.join(', ')}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-sm text-slate-500 dark:text-slate-400">
                      {Math.round(Math.random() * 100) + 20}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${difficultyBadge(c.difficulty)}`}>
                        {c.difficulty}
                      </span>
                    </div>
                    <div className="col-span-1 text-right text-xs text-slate-600 dark:text-slate-400">{progressText(c)}</div>
                  </div>
                ))}
              </div>

              {/* Pagination stub */}
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <div>Showing 1–{visible.length} of 3</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Prev</button>
                  <button className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Next</button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 mt-4 rounded-md shadow border border-transparent dark:border-slate-800 transition-colors">
              {/* Filter row 2*/}
              <div className="flex justify-between mb-4 gap-4 flex-col">
                <div className="flex w-full justify-between items-center gap-1">
                    <div className="text-sm font-semibold">
                        Most Popular
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <div className="text-sm text-slate-500 dark:text-slate-400">{visible2.length} results</div>
                        <input
                          value={query2}
                          onChange={(e) => setQuery2(e.target.value)}
                          placeholder="Search problems"
                          className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm w-64 text-slate-700 dark:text-white"
                        />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-3 flex-wrap">
                  {["All", "Algorithms", "Database", "Python"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopicFilter2(t)}
                      className={`px-3 py-1 rounded-full text-xs transition ${
                        topicFilter2 === t
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <div className="col-span-7">Title</div>
                <div className="col-span-2 text-center">Submissions</div>
                <div className="col-span-2 text-center">Difficulty</div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* List rows */}
              <div className="space-y-1">
                {visible2.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChallenge(c)}
                    className="grid grid-cols-12 gap-2 items-center p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                  >
                    <div className="col-span-7">
                      <div className="flex flex-col items-left gap-1">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{c.title}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{c.tags.join(', ')}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-sm text-slate-500 dark:text-slate-400">
                      {Math.round(Math.random() * 115) + 20}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${difficultyBadge(c.difficulty)}`}>
                        {c.difficulty}
                      </span>
                    </div>
                    <div className="col-span-1 text-right text-xs text-slate-600 dark:text-slate-400">{progressText(c)}</div>
                  </div>
                ))}
              </div>

              {/* Pagination stub */}
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <div>Showing 1–{visible.length} of 3</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Prev</button>
                  <button className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Next</button>
                </div>
              </div>
            </div>
          </main>

          {/* Right: Leaderboard & Calendar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow border border-transparent dark:border-slate-800">
                <h3 className="text-sm font-medium">Leaderboard</h3>
                <div className="mb-3 text-slate-400 dark:text-slate-500 text-xs scale-95">🎉 You are coming up well</div>
                <ol className="space-y-2 text-sm">
                  {leaderboard.map((p, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-between ${
                        i === 2 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </div>
                        <div className="text-xs">{p.name}</div>
                      </div>
                      <div className="font-medium">{p.score}</div>
                    </li>
                  ))}
                </ol>
              </div>

                <StreakCalendar activityDays={[1, 5, 6, 7]} />
            </div>
          </aside>
        </div>

        {/* Selected modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md w-full max-w-3xl shadow-md border border-transparent dark:border-slate-800">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{selectedChallenge.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Tags: {selectedChallenge.tags.join(', ')}</p>

                  <div className="flex gap-3 text-sm">
                    <Link
                      to={`/student/challenges/${selectedChallenge.id}`}
                      className="cursor-pointer px-2 py-1 rounded-md bg-green-600 text-white"
                    >
                      Solve
                    </Link>
                    <button
                      onClick={() => setShowTutorPanel(true)}
                      className="cursor-pointer px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700"
                    >
                      Ask Tutor
                    </button>
                    <button
                      onClick={() => setSelectedChallenge(null)}
                      className="cursor-pointer px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="w-48">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Difficulty</div>
                  <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${difficultyBadge(selectedChallenge.difficulty)}`}>{selectedChallenge.difficulty}</div>

                  <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">Status</div>
                  <div className="mt-2 font-medium text-slate-700 dark:text-slate-200">{progressText(selectedChallenge)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutor panel */}
        {showTutorPanel && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md w-full max-w-md shadow-md border border-transparent dark:border-slate-800">
              <h3 className="text-lg font-semibold mb-2">Ask a Tutor</h3>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Send a question to a tutor — you can attach code or a screenshot later.
              </div>
              <textarea
                className="w-full h-36 p-3 rounded-md border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-white"
                placeholder="Describe what you're stuck on..."
              ></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowTutorPanel(false)}
                  className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type StreakCalendarProps = { activityDays?: number[] };

function StreakCalendar({ activityDays = [] }: StreakCalendarProps) {
  const {
    daysInMonth,
    startOffset,
    today,
  } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const today = now.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Determine offset so Monday = first column
    let weekday = new Date(year, month, 1).getDay(); // 0 = Sunday
    const startOffset = (weekday + 6) % 7; // convert so Monday=0

    return { daysInMonth, startOffset, today };
  }, []);

  const calendarCells = [
    ...Array(startOffset).fill(null),
    ...Array(daysInMonth).fill(0).map((_, i) => i + 1),
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow border border-transparent dark:border-slate-800">
      <h3 className="text-sm font-medium mb-2">Activity Streak</h3>
      <div className="text-xs text-slate-500 dark:text-slate-400">Day {activityDays.length} • Get 21 days this month</div>

      {/* Weekday labels */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-[10px] text-center text-slate-500 dark:text-slate-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {calendarCells.map((day, i) => {
          if (!day) return <div key={i} className="h-6 w-6" />; // empty cell

          const hasActivity = activityDays.includes(day);
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`
                h-6 w-6 flex items-center justify-center rounded relative text-[10px]
                border border-slate-200 dark:border-slate-700
                ${
                  hasActivity
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
                }
                ${isToday ? 'ring-2 ring-green-600 font-semibold' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}


