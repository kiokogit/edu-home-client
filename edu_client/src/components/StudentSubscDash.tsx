
import { useEffect, useState } from 'react';
import {
    PlayCircle,
    ArrowRight,
    Calendar,
    Star,
    UserCheck,
    Clock,
    TrendingUp,
    Award,
    Zap,
    BookOpen
} from 'lucide-react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { Link } from 'react-router-dom';


export default function StudentDashboardHome_Final() {

    const [loaded, setLoaded] = useState(false);
    const [isTutorPaced, setIsTutorPaced] = useState(true);
    const [isMinor] = useState(false);
    const [guardian] = useState({ name: 'Jane Doe', email: 'guardian@example.com' });
    const { user } = useUserInfo();

    // Simulated data
    const upcomingClasses = [
        { id: 'u1', title: 'Scratch Game Logic — Live', date: 'Today', time: '16:00', instructor: 'Aisha K.', type: 'live' },
        { id: 'u2', title: 'HTML Review — Practice Lab', date: 'Tomorrow', time: '10:00', instructor: 'Daniel M.', type: 'lab' },
        { id: 'u3', title: 'Intro to Python — Q&A', date: 'Fri', time: '14:00', instructor: 'Priya R.', type: 'qa' },
    ];

    const upcomingAssessments = [
        { id: 'a1', course: 'Basic Coding', type: 'Quiz', due: 'In 2 days', urgent: true },
        { id: 'a2', course: 'Web Foundations', type: 'Project', due: 'Next Mon', urgent: false },
    ];

    const recommendations = [
        { id: 'r1', title: 'CSS & Responsive Design', desc: 'Create layouts that adapt to any screen.', path: 'Web Dev Path', hours: '6h', icon: '🎨' },
        { id: 'r2', title: '2D Game Design Essentials', desc: 'Build your first playable 2D game.', path: 'Game Dev Path', hours: '5h', icon: '🎮' },
        { id: 'r3', title: 'Data & ML Foundations', desc: 'Intro to data wrangling and models.', path: 'AI Path', hours: '7h', icon: '🤖' },
    ];

    const topTeachers = [
        { id: 't1', name: 'Aisha K.', avatar: 'https://i.pravatar.cc/150?img=47', status: 'available', role: 'Senior Dev' },
        { id: 't2', name: 'Daniel M.', avatar: 'https://i.pravatar.cc/150?img=12', status: 'fully booked', role: 'Full Stack' },
        { id: 't3', name: 'Priya R.', avatar: 'https://i.pravatar.cc/150?img=33', status: 'not available', role: 'Data Scientist' },
    ];

    const weekData = [20, 35, 45, 30, 10, 5, 50];

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);


    function statusDot(status: string) {
        if (status === 'available') return <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-gray-800" />;
        if (status === 'fully booked') return <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-gray-800" />;
        return <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-800" />;
    }

    return (
        <div className={`min-h-screen text-slate-800 dark:text-slate-100 transition-colors font-sans`}>
            
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Welcome back,{' '}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            {user.first_name || user.fullName}
                        </span>{' '}
                        👋
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        You're on a 7-day streak! Keep it up.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                    <button 
                        onClick={() => setIsTutorPaced(true)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isTutorPaced ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                        Tutor-Paced
                    </button>
                    <button 
                        onClick={() => setIsTutorPaced(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isTutorPaced ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                        Self-Paced
                    </button>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Column (Main) */}
                <div className="xl:col-span-8 space-y-8">

                    {/* Hero: Active Learning Path */}
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

                        <div className="relative p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1048/1048946.png" alt="Game Dev" className="w-10 h-10 drop-shadow-md" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">Current Path</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Game Development</h2>
                                        <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                                            Master 2D & 3D game mechanics, physics, and AI. Build your portfolio with real-world projects.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end gap-2 min-w-[140px]">
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-emerald-400">40%</span>
                                        <span className="text-slate-400 text-sm ml-1">Complete</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[40%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    </div>
                                    <Link to="/student/catalog/game-development" className="text-xs text-emerald-300 hover:text-emerald-200 font-medium flex items-center gap-1 mt-1 transition-colors">
                                        View Path Details <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>

                            {/* Stages Scroll/Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Current Stage Card */}
                                <div className="group relative bg-white/5 backdrop-blur-md border border-emerald-500/30 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                                    <div className="absolute -top-1 -right-1">
                                        <span className="relative flex h-3 w-3">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <Zap size={16} />
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">In Progress</span>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">3D Basics & Unity</h3>
                                    <p className="text-xs text-slate-400 mb-3">Module 2: 3D Transformations</p>
                                    <div className="w-full bg-slate-700/50 h-1.5 rounded-full mb-3">
                                        <div className="h-full bg-emerald-500 rounded-full w-[45%]"></div>
                                    </div>
                                    <button className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2">
                                        Continue Learning <PlayCircle size={14} />
                                    </button>
                                </div>

                                {/* Completed Stage */}
                                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 opacity-75 hover:opacity-100 transition-opacity">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400">
                                            <Award size={16} />
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Completed</span>
                                    </div>
                                    <h3 className="font-semibold text-slate-300 mb-1">2D Game Engines</h3>
                                    <p className="text-xs text-slate-500 mb-3">Score: 92%</p>
                                    <button className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition-colors">
                                        Review
                                    </button>
                                </div>

                                {/* Upcoming Stage */}
                                <div className="bg-slate-800/30 border border-white/5 rounded-xl p-4 border-dashed">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-500">
                                            <BookOpen size={16} />
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Up Next</span>
                                    </div>
                                    <h3 className="font-semibold text-slate-400 mb-1">Scripting & Game AI</h3>
                                    <p className="text-xs text-slate-600 mb-3">Locked</p>
                                    <button className="w-full py-2 rounded-lg border border-slate-700 text-slate-500 text-xs font-semibold hover:text-slate-300 hover:border-slate-600 transition-colors">
                                        View Syllabus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats & Activity Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Time Spent Chart */}
                        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <Clock size={18} className="text-emerald-500" />
                                        Study Activity
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">Total 3.2 hours this week</p>
                                </div>
                                <select className="text-xs bg-slate-50 dark:bg-slate-700 border-none rounded-md px-2 py-1 text-slate-600 dark:text-slate-300 outline-none cursor-pointer">
                                    <option>This Week</option>
                                    <option>Last Week</option>
                                </select>
                            </div>

                            <div className="flex items-end justify-between gap-2 h-40 px-2">
                                {weekData.map((val, idx) => {
                                    const height = Math.max(10, (val / 60) * 100);
                                    const isToday = idx === 6; // Mock today
                                    return (
                                        <div key={idx} className="flex flex-col items-center flex-1 group">
                                            <div className="relative w-full flex items-end justify-center h-full">
                                                {/* Tooltip */}
                                                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded mb-1 pointer-events-none whitespace-nowrap z-10">
                                                    {val} mins
                                                </div>
                                                <div
                                                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-1000 ease-out ${isToday ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-100 dark:bg-slate-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'}`}
                                                    style={{ height: `${loaded ? height : 5}%`, transitionDelay: `${idx * 50}ms` }}
                                                />
                                            </div>
                                            <span className={`text-[10px] mt-3 font-medium ${isToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Stats / Insights */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-amber-500" />
                                    Insights
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Streak</div>
                                        <div className="text-xl font-bold text-slate-800 dark:text-white">7 Days 🔥</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Weekly Goal</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">85%</span>
                                            <span className="text-xs text-slate-400">4h / 5h</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-600 h-1.5 rounded-full mt-2">
                                            <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                View Full Report
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Schedule */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Classes */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 dark:text-white">Upcoming Classes</h3>
                                <Link to="/calendar" className="text-xs text-emerald-600 font-medium hover:underline">View Calendar</Link>
                            </div>
                            <div className="space-y-3">
                                {upcomingClasses.map((c) => (
                                    <div key={c.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                                                c.type === 'live' ? 'bg-red-100 text-red-500 dark:bg-red-900/20' : 
                                                c.type === 'lab' ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/20' : 
                                                'bg-purple-100 text-purple-500 dark:bg-purple-900/20'
                                            }`}>
                                                {c.type === 'live' ? '📹' : c.type === 'lab' ? '💻' : '💬'}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{c.title}</div>
                                                <div className="text-xs text-slate-500">{c.date} • {c.time}</div>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium transition-all shadow-sm transform scale-95 group-hover:scale-100">
                                            Join
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Assessments */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 dark:text-white">Assessments</h3>
                                <span className="text-xs text-slate-400">2 Pending</span>
                            </div>
                            <div className="space-y-3">
                                {upcomingAssessments.map((a) => (
                                    <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-10 rounded-full bg-amber-400"></div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{a.course}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <span className={`font-medium ${a.urgent ? 'text-red-500' : 'text-slate-500'}`}>{a.due}</span>
                                                    <span>•</span>
                                                    <span>{a.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-1">
                                            Details
                                        </button>
                                    </div>
                                ))}
                                <button className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    + View All Assessments
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Recommended for You</h3>
                            <Link to="/student/catalog" className="text-sm text-emerald-600 font-medium hover:underline flex items-center gap-1">
                                Browse Catalog <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {recommendations.map((r) => (
                                <div key={r.id} className="group bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl mb-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                                        {r.icon}
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{r.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{r.desc}</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-400 font-medium">{r.hours}</span>
                                        <span className="text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Sidebar */}
                <aside className="xl:col-span-4 space-y-6">
                    {/* Quick Actions / Live */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Live Now</h3>
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Live Class</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Scratch Game Logic</h4>
                            <p className="text-xs text-slate-500 mb-3">Started 15 mins ago • 24 students</p>
                            <button className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors">
                                Join Session
                            </button>
                        </div>
                        
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">My Schedule</span>
                                <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Catalog</span>
                                <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Top Tutors Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-slate-800 dark:text-white">Top Tutors</h3>
                            <button className="text-xs text-slate-500 hover:text-slate-700">View All</button>
                        </div>
                        <div className="space-y-4">
                            {topTeachers.map((t) => (
                                <div key={t.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600" />
                                            <div className="absolute -bottom-0.5 -right-0.5">
                                                {statusDot(t.status)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.name}</div>
                                            <div className="text-xs text-slate-500">{t.role}</div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        Book
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/20 p-6 border border-amber-200/50 dark:border-amber-700/30">
                        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/40 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 mb-3">
                                <Star fill="currentColor" size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Upgrade to Premium</h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                                Get unlimited access to all courses, certificates, and 1-on-1 mentorship.
                            </p>
                            <button className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                Unlock Everything
                            </button>
                        </div>
                    </div>

                    

                    {/* Guardian Info (Conditional) */}
                    {isMinor && (
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                    <UserCheck size={16} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guardian Linked</div>
                                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{guardian.name}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button className="flex-1 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors">
                                    Message
                                </button>
                                <button className="flex-1 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors">
                                    Settings
                                </button>
                            </div>
                        </div>
                    )}

                </aside>
            </div>

            {/* Mobile Bottom Nav (Hidden on Desktop) */}
            <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-2 flex justify-around items-center z-50">
                <button className="p-2 flex flex-col items-center gap-1 text-emerald-600">
                    <div className="w-1 h-1 rounded-full bg-emerald-600 mb-0.5"></div>
                    <span className="text-[10px] font-bold">Home</span>
                </button>
                <button className="p-2 flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-600 transition-colors">
                    <Calendar size={20} />
                    <span className="text-[10px] font-medium">Classes</span>
                </button>
                <button className="p-2 flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-600 transition-colors">
                    <BookOpen size={20} />
                    <span className="text-[10px] font-medium">Courses</span>
                </button>
                <button className="p-2 flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-600 transition-colors">
                    <UserCheck size={20} />
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </nav>

        </div>
    );
}
