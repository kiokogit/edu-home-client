'use client';

import React, { useEffect, useState } from 'react';
import {
    PlayCircle,
    ArrowRight,
    Calendar,
    Star,
    UserCheck,
} from 'lucide-react';
import Link from 'next/link';


export default function StudentDashboardHome_Final() {

    const [loaded, setLoaded] = useState(true);
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
        { id: 't1', name: 'Aisha K.', avatar: 'https://i.pravatar.cc/150?img=47', status: 'available' },
        { id: 't2', name: 'Daniel M.', avatar: 'https://i.pravatar.cc/150?img=12', status: 'fully booked' },
        { id: 't3', name: 'Priya R.', avatar: 'https://i.pravatar.cc/150?img=33', status: 'not available' },
    ];

    const weekData = [20, 35, 45, 30, 10, 5, 50];

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);


    function statusDot(status: string) {
        if (status === 'available') return <span className="inline-block w-2 h-2 rounded-full bg-green-400 ring-1 ring-white" />;
        if (status === 'fully booked') return <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 ring-1 ring-white" />;
        return <span className="inline-block w-2 h-2 rounded-full bg-gray-400 ring-1 ring-white" />;
    }

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
            {/* Learning Path in Progress — Game & Game Development */}
            <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Learning Path in Progress</h2>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Progress saved automatically</div>
                </div>

                <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] space-y-5">
                    {/* Path Overview */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Hero */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-green-50 dark:bg-[#071018] flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1048/1048946.png" alt="Game Dev" className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-md">Game Development Learning Path</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Design & build 2D and 3D games — from mechanics to scripting, AI & publishing.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">5 courses</span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">16+ modules</span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">Certificate</span>
                            </div>
                        </div>
                        <Link href="/student/catalog/game-development" className='text-sm font-medium text-green-600 flex items-center gap-1 cursor-pointer mx-6 hover:underline'>
                            View
                        </Link>

                        {/* Overall Progress */}
                        <div className="min-w-[160px] max-w-[250px] flex flex-col w-full sm:w-auto">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Path completion</div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-green-600 dark:bg-green-400 h-3 rounded-full" style={{ width: '40%' }} />
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">40% complete</div>
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 auto-rows-auto">
                        {[
                            {
                                id: 's1',
                                title: 'Game Design',
                                status: 'completed',
                                modules: [
                                    { id: 'm1', title: 'What is a Game?', done: true },
                                    { id: 'm2', title: 'Game Loops', done: true },
                                    { id: 'm3', title: 'Character vs Player', done: true },
                                ],
                                purchased: true,
                                resources: 4,
                                assignments: 2,
                                projects: 1,
                                sandbox: 1,
                            },
                            {
                                id: 's2',
                                title: '2D Game Engines',
                                status: 'completed',
                                modules: [
                                    { id: 'm1', title: 'Sprites & Assets', done: true },
                                    { id: 'm2', title: 'Scene & World', done: true },
                                ],
                                purchased: true,
                                resources: 4,
                                assignments: 2,
                                projects: 1,
                                sandbox: 1,
                                priceUSD: 10
                            },
                            {
                                id: 's3',
                                title: '3D Basics & Unity',
                                status: 'current',
                                progress: 45,
                                modules: [
                                    { id: 'm1', title: 'Unity Interface', done: true, is_current: false },
                                    { id: 'm2', title: '3D Transformations', done: false, is_current: true },
                                    { id: 'm3', title: 'Prefabs & Scenes', done: false, is_current: false },
                                ],
                                purchased: true,
                                resources: 3,
                                assignments: 8,
                                projects: 1,
                                sandbox: 1,
                            },
                            {
                                id: 's4',
                                title: 'Scripting & Game AI',
                                status: 'upcoming',
                                modules: [
                                    { id: 'm1', title: 'Internal Scripting', done: false },
                                    { id: 'm2', title: 'Command issuance', done: false },
                                    { id: 'm3', title: 'Strange and Design', done: false },
                                    { id: 'm4', title: 'Desiging for life', done: false },
                                ],
                                purchased: false,
                                priceUSD: 10,
                                resources: 4,
                                assignments: 2,
                                projects: 0,
                                sandbox: 1,
                            },
                            {
                                id: 's5',
                                title: 'Publish & Iterate',
                                status: 'upcoming',
                                modules: [
                                    { id: 'm1', title: 'Zbook publishing', done: false },
                                    { id: 'm2', title: 'Strange and Design', done: false },
                                ],
                                purchased: false,
                                priceUSD: 20,
                                resources: 1,
                                assignments: 4,
                                projects: 1,
                                sandbox: 1,
                            }
                        ].map(stage => {


                            return (
                                <div
                                    key={stage.id}
                                    className={`
                                            p-4 rounded-xl border transition shadow-sm flex flex-col justify-between min-h-[280px]
                                            ${stage.status === 'completed'
                                            ? 'bg-white dark:bg-gray-900 border-green-200 dark:border-green-800'
                                            : stage.status === 'current'
                                                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600 animate-[softPulse_3s_ease-in-out_infinite]'
                                                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                        }
                                    `}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3 min-w-0">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                {stage.status === 'completed' && (
                                                    <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">✓</span>
                                                )}

                                                {stage.status === 'current' && (
                                                    <span className="w-5 h-5 rounded-full bg-yellow-500 text-gray-900 text-[10px] flex items-center justify-center animate-[softPulse_1.5s_ease-in-out_infinite]">▶</span>
                                                )}

                                                {stage.status === 'upcoming' && (
                                                    <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 text-[10px] flex items-center justify-center">•</span>
                                                )}

                                                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-snug break-words">
                                                    {stage.title}
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex flex-col items-end gap-2">
                                            {stage.status === 'current' && (
                                                <>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                                                        <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{ width: `${stage.progress}%` }} />
                                                    </div>
                                                    <Link href={`/student/catalog/${'dummy_id'}/learning/${stage.id}`} className="px-3 py-1 rounded-md bg-green-600 text-white text-xs flex items-center gap-1 cursor-pointer">
                                                        Continue <PlayCircle size={14} />
                                                    </Link>
                                                </>
                                            )}

                                            {stage.status === 'upcoming' && !stage.purchased && (
                                                <button className="cursor-pointer px-3 py-1 rounded-md bg-white text-green-600 border border-gray-200 dark:border-gray-700 text-xs">
                                                    Buy Course (KES {stage.priceUSD})
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Modules */}
                                    <div className="mt-3 space-y-2 border-t pt-3 border-gray-200 dark:border-gray-700 flex-1">
                                        {Array.isArray(stage.modules) && stage.modules.map((mod) => (
                                            <div key={mod.id} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    {mod.done ? (
                                                        <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">✓</span>
                                                    ) : mod.is_current ? (
                                                        <span className="w-4 h-4 rounded-full bg-yellow-500 text-gray-900 text-[10px] flex items-center justify-center animate-[softPulse_1.5s_ease-in-out_infinite]">▶</span>
                                                    ) : (
                                                        <span className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                    )}
                                                    <span className="text-gray-700 dark:text-gray-300">{mod.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 border-t pt-3 border-gray-200 dark:border-gray-700">
                                        {[
                                            { label: `${Array.isArray(stage.modules) ? stage.modules.length : stage.modules} modules`, show: true },
                                            { label: `${stage.resources} resources`, show: stage.resources > 0 },
                                            { label: `${stage.projects} project${stage.projects > 1 ? 's' : ''}`, show: stage.projects > 0 },
                                            { label: `${stage.assignments} assignment${stage.assignments > 1 ? 's' : ''}`, show: stage.assignments > 0 },
                                            { label: `${stage.sandbox} sandbox test${stage.sandbox > 1 ? 's' : ''}`, show: stage.sandbox > 0 },
                                        ]
                                            .filter(item => item.show)
                                            .map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={`/dashboard/student/path/${stage.id}/${item.label.split(' ')[1].toLowerCase()}`}
                                                    className={`
                                                        px-2 py-[2px] text-[10px] font-medium rounded-md border cursor-pointer hover:opacity-80 hover:scale-[1.05]
                                                        ${stage.status === 'completed' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700' : ''}
                                                        ${stage.status === 'current' ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600' : ''}
                                                        ${stage.status === 'upcoming' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600' : ''}
                                                    `}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                    </div>
                                </div>

                            );
                        })}
                    </div>

                </div>
            </section>


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
                                    const height = Math.max(6, (val / 60) * 100);
                                    return (
                                        <div key={idx} className="flex flex-col items-center" style={{ width: '36px' }}>
                                            <div className="h-full flex items-end w-full">
                                                <div
                                                    className={`w-full rounded-t-md transition-all duration-900 ease-out dark:bg-green-400 bg-green-600`}
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
                            <Link href={"/student/catalog"} className={`text-sm dark:text-gray-300 text-green-600 font-medium flex items-center justify-between `}>See all <ArrowRight size={14} className='ml-1' /></Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {recommendations.map((r) => (
                                <div key={r.id} className={`shadow-[0_6px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center dark:bg-[#071018] bg-green-50`}>
                                            <Star className={'dark:text-green-300 text-green-600'} />
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
                                    <div className="text-xs text-gray-700 dark:text-gray-100">Scratch Game Logic • 16:00</div>
                                </div>
                                <button className="cursor-pointer px-3 py-1 rounded-md bg-green-600 text-white text-xs">Join</button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-100">Schedule</div>
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
