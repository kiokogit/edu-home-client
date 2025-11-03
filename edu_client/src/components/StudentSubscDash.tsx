'use client';

import React, { useEffect, useState } from 'react';
import {
    PlayCircle,
    ArrowRight,
    Calendar,
    Clock,
    Star,
    Award,
    Sparkles,
    SunMoon,
    UserCheck,
} from 'lucide-react';


export default function StudentDashboardHome_Final() {
    // Demo / simulated state
    const [dark, setDark] = useState(false);
    const [loaded, setLoaded] = useState(false); // for chart animation
    const [isTutorPaced, setIsTutorPaced] = useState(true);
    const [isMinor, setIsMinor] = useState(false);
    const [guardian, setGuardian] = useState({ name: 'Jane Doe', email: 'guardian@example.com' });

    // Simulated data
    const upcomingClasses = [
        { id: 'u1', title: 'Scratch Game Logic — Live', date: 'Today', time: '16:00', instructor: 'Aisha K.' },
        { id: 'u2', title: 'HTML Review — Practice Lab', date: 'Tomorrow', time: '10:00', instructor: 'Daniel M.' },
        { id: 'u3', title: 'Intro to Python — Q&A', date: 'Fri', time: '14:00', instructor: 'Priya R.' },
    ];

    const upcomingAssessments = [
        { id: 'a1', course: 'Basic Coding', type: 'Quiz', due: 'In 2 days' },
        { id: 'a2', course: 'Web Foundations', type: 'Project', due: 'Next Mon' },
    ];

    const recommendations = [
        { id: 'r1', title: 'CSS & Responsive Design', desc: 'Create layouts that adapt to any screen — practical projects included.', path: 'Web Dev Path', hours: '6h' },
        { id: 'r2', title: '2D Game Design Essentials', desc: 'Build your first playable 2D game with simple physics and sprites.', path: 'Game Dev Path', hours: '5h' },
        { id: 'r3', title: 'Data & ML Foundations', desc: 'Intro to data wrangling and model thinking for beginners.', path: 'AI Path', hours: '7h' },
    ];

    const topTeachers = [
        { id: 't1', name: 'Aisha K.', avatar: 'https://i.pravatar.cc/150?img=47', status: 'online' },
        { id: 't2', name: 'Daniel M.', avatar: 'https://i.pravatar.cc/150?img=12', status: 'busy' },
        { id: 't3', name: 'Priya R.', avatar: 'https://i.pravatar.cc/150?img=33', status: 'idle' },
    ];

    // Chart data: time spent in minutes per day (Mon..Sun)
    const weekData = [20, 35, 45, 30, 10, 5, 50];

    useEffect(() => {
        // trigger chart animation after mount
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);


    function statusDot(status: string) {
        if (status === 'online') return <span className="inline-block w-2 h-2 rounded-full bg-green-400 ring-1 ring-white" />;
        if (status === 'busy') return <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 ring-1 ring-white" />;
        return <span className="inline-block w-2 h-2 rounded-full bg-gray-400 ring-1 ring-white" />;
    }

    const coursesInProgress = [
        { id: 'c1', title: 'Learn Basics of Coding (Kids Age 8-12)', track: 'Basic Coding', progress: 45, hours: '1.8h / 4h', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' }, 
        { id: 'c2', title: 'Web Development Foundations', track: 'Web Development', progress: 30, hours: '2.1h / 6h', icon: 'https://cdn-icons-png.flaticon.com/512/919/919826.png' }, 
        { id: 'c3', title: 'Beginner AI & Machine Learning Concepts', track: 'AI & Machine Learning', progress: 12, hours: '0.5h / 4h', icon: 'https://cdn-icons-png.flaticon.com/512/1048/1048946.png' }];

    return (
        <div className={`min-h-screen text-gray-900 dark:text-gray-100 transition-colors`}>
            {/* Header with dark mode toggle */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back 👋</h1>
                    <p className="text-sm text-gray-400">Here's what's next on your MyPath journey.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 hidden sm:block">Study Mode</div>
                    <button onClick={() => setIsTutorPaced(!isTutorPaced)} className={`px-3 py-1 rounded-md text-sm ${isTutorPaced ? 'bg-green-600 text-white' : 'dark:bg-gray-800 text-gray-200 bg-gray-100 text-gray-800'}`}>
                        {isTutorPaced ? 'Tutor-Paced' : 'Self-Paced'}
                    </button>
                </div>
            </div>

            {/* Main layout */}
            {/* Courses In Progress */}
            <section className='mb-6'>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Courses in Progress</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {coursesInProgress.map((course) => (
                        <div key={course.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.1)] space-y-3">
                            <div className="flex items-center gap-3">
                                <img src={course.icon} alt="icon" className="w-8 h-8" />
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{course.track}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">{course.title}</h3>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{course.hours}</span>
                                <button className="cursor-pointer flex items-center gap-1 text-green-600 text-xs font-medium">
                                    Continue <PlayCircle size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Main Column */}

                <div className="flex-1 space-y-6">

                    {/* Upcoming classes & assessments - two column on lg */}
                    <div className={`grid gap-6 lg:grid-cols-2`}>
                        <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-5 divide-gray-700 divide-y`}>
                            <div className="pb-3">
                                <h2 className="text-lg font-semibold">Upcoming Classes</h2>
                                <p className="text-xs text-gray-400">Join live lessons or request a private session</p>
                            </div>

                            <div className="pt-3 space-y-3">
                                {upcomingClasses.map((c) => (
                                    <div key={c.id} className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="text-sm font-medium">{c.title}</div>
                                            <div className="text-xs text-gray-400">{c.date} • {c.time} • {c.instructor}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isTutorPaced && (
                                                <button className="cursor-pointer px-3 py-1 rounded-md text-xs font-medium bg-green-600 text-white shadow dark:rgba(16,185,129,0.12)">
                                                    Request Class
                                                </button>
                                            )}
                                            <button className={`px-3 py-1 rounded-md text-xs dark:bg-gray-800 text-gray-200 bg-white text-green-600 border dark:border-gray-700 border-gray-200`}>Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-5 divide-gray-700 divide-y`}>
                            <div className="pb-3">
                                <h2 className="text-lg font-semibold">Upcoming Assessments</h2>
                                <p className="text-xs text-gray-400">Keep track of submissions and quizzes</p>
                            </div>

                            <div className="pt-3 space-y-3">
                                {upcomingAssessments.map((a) => (
                                    <div key={a.id} className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="text-sm font-medium">{a.course}</div>
                                            <div className="text-xs text-gray-400">{a.type} • Due {a.due}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">View</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Time Spent Chart + Habit Insights */}
                    <div className={`grid gap-6 lg:grid-cols-3`}>
                        {/* Chart */}
                        <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-5 col-span-2`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-md font-semibold">Time Spent This Week</h3>
                                    <p className="text-xs text-gray-400">Daily minutes on platform</p>
                                </div>
                                <div className="text-xs text-gray-400">Total: <strong>{weekData.reduce((s, v) => s + v, 0)}</strong> mins</div>
                            </div>

                            {/* Animated bar chart (simple SVG-less implementation using divs) */}
                            <div className="flex items-end gap-3 h-40">
                                {weekData.map((val, idx) => {
                                    const height = Math.max(6, (val / 60) * 100); // normalize for display
                                    return (
                                        <div key={idx} className="flex flex-col items-center" style={{ width: '36px' }}>
                                            <div className="h-full flex items-end w-full">
                                                <div
                                                    className={`w-full rounded-t-md transition-all duration-900 ease-out dark:bg-emerald-400 bg-green-600`}
                                                    style={{ height: `${loaded ? height : 4}%`, transitionDelay: `${idx * 60}ms` }}
                                                />
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-gray-400 mt-3">Tip: Try 20-minute focused sessions to build momentum.</p>
                        </div>

                        {/* Habit Insights */}
                        <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-5`}>
                            <h3 className="text-md font-semibold mb-2">Learning Insights</h3>
                            <div className="text-sm text-gray-300 space-y-3">
                                <div>
                                    <div className="text-xs text-gray-400">Current Streak</div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-100">7 days 🔥</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Best Study Day</div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-100">Sunday — highest engagement</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Weekly Average</div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-100">{Math.round(weekData.reduce((s, v) => s + v, 0) / 7)} mins / day</div>
                                </div>
                                <div>
                                    <button className="cursor-pointer mt-2 w-full px-3 py-2 rounded-md bg-green-600 text-white">Improve My Habit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold">✨ These May Be Perfect For You</h2>
                            <button className={`text-sm dark:text-gray-300 text-green-600 font-medium flex items-center justify-between `}>See all <ArrowRight size={14} className='ml-1' /></button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {recommendations.map((r) => (
                                <div key={r.id} className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center dark:bg-[#071018] bg-green-50`}>
                                            <Star className={'dark:text-emerald-300 text-green-600'} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-green-600 font-medium">{r.path}</p>
                                            <h3 className="font-semibold text-sm mt-1">{r.title}</h3>
                                            <p className="text-xs text-gray-400 mt-1">{r.desc}</p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="text-xs text-gray-400">⏱ {r.hours}</div>
                                                <button className="cursor-pointer px-3 py-1 rounded-md bg-green-600 text-white text-xs">Explore</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Sidebar (desktop) */}
                <aside className="block w-full lg:w-80 space-y-6">
                    {/* Top Teachers */}
                    <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 divide-gray-700 divide-y rounded-xl p-4`}>
                        <div className="pb-3">
                                <h2 className="text-sm font-semibold">Top Tutors</h2>
                                <p className="text-xs text-gray-400">Book Top Tutors for your lessons</p>
                            </div>
                        <div className="space-y-3 pt-3">
                            {topTeachers.map((t) => (
                                <div key={t.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <div className="text-sm font-medium">{t.name}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2">{statusDot(t.status)}<span className="text-xs text-gray-400 capitalize">{t.status}</span></div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className={`px-3 py-1 rounded-md text-xs dark:bg-gray-800 text-gray-200 bg-white text-green-600 border dark:border-gray-700 border-gray-200`}>Book</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Courses */}
                    <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 divide-gray-700 divide-y  rounded-xl p-4`}>
                        <div className="pb-3">
                                <h2 className="text-sm font-semibold">Top Courses</h2>
                                <p className="text-xs text-gray-400">Visit most popular courses</p>
                            </div>
                        <div className="space-y-3 pt-3">
                            <div className="text-sm font-medium flex items-center justify-between gap-3">HTML & CSS Essentials <button className="cursor-pointer ml-2 text-xs text-green-600">View</button></div>
                            <div className="text-sm font-medium flex items-center justify-between gap-3">Scratch for Young Coders <button className="cursor-pointer ml-2 text-xs text-green-600">View</button></div>
                            <div className="text-sm font-medium flex items-center justify-between gap-3">Intro to Machine Learning <button className="cursor-pointer ml-2 text-xs text-green-600">View</button></div>
                        </div>
                    </div>

                    {/* Live & Scheduled / Quick Actions */}
                    <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 divide-gray-700 divide-y rounded-xl p-4`}>
                        <div className="pb-3">
                                <h2 className="text-sm font-semibold">Live & Scheduled</h2>
                                <p className="text-xs text-gray-400">Visit most popular courses</p>
                            </div>
                        <div className="space-y-3 pt-3 text-sm text-gray-400">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Next Live Class</div>
                                    <div className="text-xs">Scratch Game Logic • 16:00</div>
                                </div>
                                <button className="cursor-pointer px-3 py-1 rounded-md bg-green-600 text-white text-xs">Join</button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Schedule</div>
                                    <div className="text-xs">View all lessons</div>
                                </div>
                                <button className={`px-3 py-1 rounded-md text-xs dark:bg-gray-800 text-gray-200 bg-white text-green-600 border dark:border-gray-700 border-gray-200`}>View</button>
                            </div>
                        </div>
                    </div>

                    {/* Premium */}
                    <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-4`}>
                        <h4 className="text-sm font-semibold mb-2">Premium</h4>
                        <p className="text-xs text-gray-400 mb-3">Unlock unlimited access to all paths and certificates.</p>
                        <div className="flex gap-2">
                            <button className="cursor-pointer flex-1 px-3 py-2 rounded-md bg-green-600 text-white">Go Premium</button>
                            <button className={`px-3 py-2 rounded-md dark:bg-gray-800 text-gray-200 bg-white text-green-600 border dark:border-gray-700 border-gray-200`}>Learn More</button>
                        </div>
                    </div>

                    {/* Parent / Guardian (if minor) */}
                    {isMinor && (
                        <div className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-4`}>
                            <h4 className="text-sm font-semibold mb-2">Guardian Linked</h4>
                            <p className="text-xs text-gray-400">{guardian.name} — {guardian.email}</p>
                            <div className="mt-3 flex gap-2">
                                <button className="cursor-pointer flex-1 px-3 py-2 rounded-md bg-green-600 text-white">Send Request</button>
                                <button className={`px-3 py-2 rounded-md dark:bg-gray-800 text-gray-200 bg-white text-green-600 border dark:border-gray-700 border-gray-200`}>Manage</button>
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {/* Mobile bottom dock */}
            <nav className={`lg:hidden fixed bottom-3 left-3 right-3 dark:bg-[#0f1724] bg-white rounded-full shadow-md p-2 flex justify-around items-center`}>
                <button className="cursor-pointer flex flex-col items-center text-xs text-gray-500">
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" /></svg>
                    Home
                </button>
                <button className="cursor-pointer flex flex-col items-center text-xs text-gray-500">
                    <Calendar size={18} />
                    Classes
                </button>
                <button className="cursor-pointer flex flex-col items-center text-xs text-gray-500">
                    <Star size={18} />
                    Teachers
                </button>
                <button className="cursor-pointer flex flex-col items-center text-xs text-gray-500">
                    <UserCheck size={18} />
                    Profile
                </button>
            </nav>

        </div >
    );
}
