import { useState } from 'react';
import {
    Users,
    ArrowRight,
    Gift,
    PlusCircle,
    Bot,
    Network,
    CheckCircle,
    Clock,
    Sparkles,
    Hammer,
    Wrench,
    Camera,
    Scissors,
    Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeDashboardContent() {
    const journeys = [
        {
            id: 'plumbing-basics',
            title: 'Home Plumbing Basics',
            summary: 'Master the wrench. Fix leaks, install faucets, and understand home water systems.',
            icon: Wrench,
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&q=80',
            status: 'new',
            progress: 0,
            stages: ['Tools & Safety', 'Pipe Types', 'Fixing Leaks', 'Installations', 'Final Project']
        },
        {
            id: 'robotics-101',
            title: 'Robotics & Automation',
            summary: 'Build your first robot. Learn Arduino, sensors, and basic mechanics.',
            icon: Bot,
            image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&q=80',
            status: 'in-progress',
            progress: 35,
            stages: ['Circuits 101', 'Arduino Basics', 'Sensors & Motors', 'Coding Logic', 'Robot Build']
        },
        {
            id: 'creative-carpentry',
            title: 'Creative Carpentry',
            summary: 'Woodworking for beginners. Build furniture, birdhouses, and art.',
            icon: Hammer,
            image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=600&q=80',
            status: 'new',
            progress: 0,
            stages: ['Wood Types', 'Measuring & Cutting', 'Joinery', 'Finishing', 'Furniture Project']
        },
        {
            id: 'python-coding',
            title: 'Python for Real World',
            summary: 'Automate tasks, analyze data, and build scripts with Python.',
            icon: Code,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
            status: 'completed',
            progress: 100,
            stages: ['Syntax Basics', 'Data Structures', 'File Handling', 'Automation Scripts', 'Final App']
        },
        {
            id: 'photography-mastery',
            title: 'Photography Mastery',
            summary: 'Capture the world. Learn composition, lighting, and editing.',
            icon: Camera,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
            status: 'new',
            progress: 0,
            stages: ['Camera Basics', 'Composition Rules', 'Lighting', 'Photo Editing', 'Portfolio']
        },
        {
            id: 'fashion-design',
            title: 'Fashion & Tailoring',
            summary: 'Design and sew your own clothes. From sketching to stitching.',
            icon: Scissors,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
            status: 'new',
            progress: 0,
            stages: ['Fabric Science', 'Sketching', 'Sewing Machine', 'Pattern Making', 'Garment Construction']
        }
    ];

    const PRICE_PER_COURSE = 10;
    const PRICE_PER_MODULE = 2;
    const PRICE_PER_PATH = 20;
    const SUB_MONTHLY = 25;
    const SUB_ANNUAL = 250;

    const [selectedJourney, setSelectedJourney] = useState(journeys[0]);
    const [paymentChoice, setPaymentChoice] = useState<'course' | 'module' | 'path' | 'subscription' | null>(null);
    const [subscriptionPlan, setSubscriptionPlan] = useState<'monthly' | 'annual' | null>(null);
    const [selfPaced, setSelfPaced] = useState(true);
    const [isMinor, setIsMinor] = useState(false);
    const [guardianContact, setGuardianContact] = useState({ name: '', email: '', phone: '' });
    const [requestSent, setRequestSent] = useState(false);
    const [buyForAnother, setBuyForAnother] = useState({ enabled: false, recipientEmail: '' });

    function priceForSelection() {
        if (paymentChoice === 'course') return PRICE_PER_COURSE;
        if (paymentChoice === 'module') return PRICE_PER_MODULE;
        if (paymentChoice === 'path') return PRICE_PER_PATH;
        if (paymentChoice === 'subscription') return subscriptionPlan === 'monthly' ? SUB_MONTHLY : SUB_ANNUAL;
        return 0;
    }

    function handleSendGuardianRequest() {
        setRequestSent(true);
        setTimeout(() => {
            alert('Payment request sent to guardian — this is a simulated action in the demo.');
        }, 200);
    }

    function handleBuy() {
        if (isMinor && !requestSent) {
            alert('You must send a payment request to your guardian.');
            return;
        }

        const amount = priceForSelection();
        if (amount <= 0) {
            alert('Select what you want to buy first.');
            return;
        }

        if (buyForAnother.enabled && buyForAnother.recipientEmail) {
            alert(`Proceeding to buy for ${buyForAnother.recipientEmail} — Amount: $${amount}`);
        } else {
            alert(`Proceeding to payment — Amount: $${amount}`);
        }
    }

    const getStatusBadge = (status: string, progress: number) => {
        if (status === 'completed') {
            return (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
                    <CheckCircle size={14} />
                    Completed
                </span>
            );
        }
        if (status === 'in-progress') {
            return (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                    <Clock size={14} />
                    {progress}% Complete
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200">
                <Sparkles size={14} />
                New
            </span>
        );
    };

    return (
        <main className="min-h-screen p-2 md:p-4">
            {/* Hero Section */}
            <section className="relative rounded-3xl mb-8 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-slate-900" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                
                <div className="relative flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12">
                    <div className="flex-1 text-white space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <Hammer size={12} /> Student Dashboard
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                                Welcome to EduCraft
                            </h1>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                            Ready to build something real? Pick up a tool, write some code, or design your future. Your craft journey continues here.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-sm font-medium">
                                � Course: ${PRICE_PER_COURSE}
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-sm font-medium">
                                🚀 Full Path: ${PRICE_PER_PATH}
                            </div>
                            <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl text-sm font-medium">
                                ⭐ Premium: ${SUB_MONTHLY}/mo
                            </div>
                        </div>

                        <button className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-105 transition-all">
                            Resume Learning
                        </button>
                    </div>

                    <div className="w-full lg:w-5/12 flex-shrink-0 relative">
                        <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full" />
                        <img
                            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                            alt="Student working"
                            className="relative w-full aspect-video object-cover rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            </section>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Learning Journeys */}
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <div className='w-full'>
                                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex flex-row justify-between">
                                    Choose Your Learning Path <Link to='/student/catalog' className='text-xs md:text-md text-green-600 hover:underline cursor-pointer'>View Full Catalogue</Link>
                                </h2>
                                <p className="text-gray-600 text-sm dark:text-gray-300">
                                    Select from our curated learning journeys. Each path is designed to take you from beginner to expert.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {journeys.slice(0, 6).map((j) => {
                                const Icon = j.icon;
                                const active = selectedJourney.id === j.id;
                                return (
                                    <button
                                        key={j.id}
                                        onClick={() => { setSelectedJourney(j); }}
                                        className={`group relative text-left overflow-hidden rounded-lg transition-all duration-100 ${active
                                                ? 'ring-2 ring-green-500 shadow-2xl scale-[1.02]'
                                                : 'hover:shadow-md hover:scale-[1.01] border border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        {/* Image Background */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={j.image}
                                                alt={j.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                            {/* Icon & Status Badge */}
                                            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                                                    <Icon size={28} className="text-white" />
                                                </div>
                                                {getStatusBadge(j.status, j.progress)}
                                            </div>

                                            {/* Title at bottom */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="font-bold text-xl text-white mb-1 flex items-center gap-2">
                                                    {j.title}
                                                    {active && <CheckCircle size={20} className="text-green-400" />}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 bg-white dark:bg-gray-800">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                {j.summary}
                                            </p>

                                            {/* Progress Bar for in-progress courses */}
                                            {j.status === 'in-progress' && (
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                        <span>Progress</span>
                                                        <span>{j.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-green-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${j.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {j.stages.length} stages • Self-paced
                                                </span>
                                                {active && (
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                        Selected ✓
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>


                {/* Sidebar */}
                <aside className="space-y-6">
                    {/* Learning Mode */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                                <Users className="text-green-600 dark:text-green-400" size={20} />
                            </div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Learning Mode</h4>
                        </div>

                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selfPaced ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                                }`}>
                                <input
                                    type="radio"
                                    checked={selfPaced}
                                    onChange={() => setSelfPaced(true)}
                                    className="w-5 h-5 text-green-600"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">Self-Paced</div>
                                    <div className="text-xs text-gray-500">Learn at your own speed</div>
                                </div>
                            </label>

                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${!selfPaced ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                                }`}>
                                <input
                                    type="radio"
                                    checked={!selfPaced}
                                    onChange={() => setSelfPaced(false)}
                                    className="w-5 h-5 text-green-600"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">With Teacher</div>
                                    <div className="text-xs text-gray-500">Live sessions & mentorship</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h5 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Payment Options</h5>

                        <div className="space-y-3 mb-4">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentChoice === 'path' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                                }`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentChoice === 'path'}
                                    onChange={() => setPaymentChoice('path')}
                                    className="w-5 h-5 text-green-600"
                                />
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 dark:text-white">Full Learning Path</div>
                                    <div className="text-xs text-gray-500">${PRICE_PER_PATH} • Complete journey</div>
                                </div>
                            </label>
                            {paymentChoice === 'path' && (
                                <div className="ml-8 text-sm text-gray-600 dark:text-gray-300">
                                    {selectedJourney.title} - Full Access
                                </div>
                            )}

                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentChoice === 'subscription' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                                }`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentChoice === 'subscription'}
                                    onChange={() => { setPaymentChoice('subscription'); setSubscriptionPlan('monthly'); }}
                                    className="w-5 h-5 text-green-600"
                                />
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 dark:text-white">Platform Subscription</div>
                                    <div className="text-xs text-gray-500">Unlimited access to all paths</div>
                                </div>
                            </label>

                            {paymentChoice === 'subscription' && (
                                <div className="ml-8 flex gap-2">
                                    <button
                                        onClick={() => setSubscriptionPlan('monthly')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${subscriptionPlan === 'monthly'
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        ${SUB_MONTHLY}/mo
                                    </button>
                                    <button
                                        onClick={() => setSubscriptionPlan('annual')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${subscriptionPlan === 'annual'
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        ${SUB_ANNUAL}/yr
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={buyForAnother.enabled}
                                    onChange={(e) => setBuyForAnother({ ...buyForAnother, enabled: e.target.checked })}
                                    className="w-4 h-4 text-green-600 rounded"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Gift to someone else</span>
                            </label>

                            {buyForAnother.enabled && (
                                <input
                                    placeholder="Recipient's email"
                                    value={buyForAnother.recipientEmail}
                                    onChange={(e) => setBuyForAnother({ ...buyForAnother, recipientEmail: e.target.value })}
                                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            )}
                        </div>

                        {/* Guardian Section */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={isMinor}
                                    onChange={() => setIsMinor(!isMinor)}
                                    className="w-4 h-4 text-green-600 rounded"
                                />
                                <span className="text-gray-700 dark:text-gray-300">I'm under 18 (guardian required)</span>
                            </label>

                            {isMinor && (
                                <div className="space-y-2">
                                    <input
                                        placeholder="Guardian name"
                                        value={guardianContact.name}
                                        onChange={(e) => setGuardianContact({ ...guardianContact, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                    />
                                    <input
                                        placeholder="Guardian email"
                                        value={guardianContact.email}
                                        onChange={(e) => setGuardianContact({ ...guardianContact, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                    />
                                    <input
                                        placeholder="Guardian phone"
                                        value={guardianContact.phone}
                                        onChange={(e) => setGuardianContact({ ...guardianContact, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                    />

                                    {requestSent && (
                                        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-400">
                                            ✓ Payment request sent to guardian
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${priceForSelection()}</span>
                            </div>

                            {isMinor ? (
                                <button
                                    onClick={handleSendGuardianRequest}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-600 text-white py-4 rounded-xl font-bold shadow-md hover:shadow-md transition-all hover:scale-[1.02]"
                                >
                                    Send Guardian Request
                                </button>
                            ) : (
                                <button
                                    onClick={handleBuy}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-600 text-white py-4 rounded-xl font-bold shadow-md hover:shadow-md transition-all hover:scale-[1.02]"
                                > Proceed to Payment</button>)}
                        </div>
                    </div>



                    {/* Quick actions */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-3">
                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-500 hover:scale-[1.02]">
                            <div className="flex items-center gap-3"><Gift /><span className="font-medium">Claim Welcome Bonus</span></div>
                            <ArrowRight />
                        </button>

                        <button onClick={() => alert('Redirect to Course Catalog')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-500 hover:scale-[1.02]">
                            <div className="flex items-center gap-3"><PlusCircle /><span className="font-medium">Browse All Courses</span></div>
                            <ArrowRight />
                        </button>
                    </div>
                </aside>
            </div>
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-md mb-8">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Why Choose MyPath?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                    MyPath adapts to where you are. Start at any point and we'll intelligently recommend your next steps.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <Network className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Connected Journeys</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Seamlessly transition between paths as you grow. Your progress travels with you.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <Gift className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Flexible Payments</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Pay per module, course, or path. Subscribe monthly or annually for unlimited access.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <Users className="text-purple-600 dark:text-purple-400" size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Learn Your Way</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Choose self-paced learning or work with an expert teacher for personalized guidance.
                        </p>
                    </div>
                </div>
            </div>


            

            {/* Empty state CTA when nothing booked */}
            <section className="p-8 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">You haven't booked or paid for a course yet</h3>
                        <p className="text-gray-600 dark:text-gray-300">Get started now — pick a path, select a stage and complete your payment. Or grab the platform subscription for unlimited access.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => { setPaymentChoice('subscription'); setSubscriptionPlan('monthly'); }} className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold">Get Unlimited Access (${SUB_MONTHLY}/mo)</button>
                        <button onClick={() => alert('Go to catalog (demo)')} className="border border-gray-200 px-5 py-3 rounded-lg">Browse Courses</button>
                    </div>
                    
                </div>
                {/* Tips / Next Steps */}
            <section className="mt-8 grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">Next Steps</h4>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                        <li>1. Choose a learning journey</li>
                        <li>2. Pick where to start (Stage)</li>
                        <li>3. Decide payment option or send guardian request</li>
                        <li>4. Start learning — projects & portfolio included</li>
                    </ol>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Need help? Contact support at <a className="text-green-600">support@mypath.co.ke</a> or call <span className="font-medium text-green-600">0703618918</span>.</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">Gift & Share</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Buy a course or entire path for a friend or family member. They will receive a redemption link via email.</p>
                </div>
            </section>
            </section>

        </main>
    );
}
