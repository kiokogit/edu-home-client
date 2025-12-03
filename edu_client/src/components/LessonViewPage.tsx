
import { useState, useEffect } from "react";
import { PlayCircle, Video, FileText, BookOpen, Layout, X, Menu, CheckCircle, Lock, Download, MessageSquare, Users, Maximize2, ChevronRight, Award, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProctorInstructions from "./AssessmentProctoring";
import DocumentViewer from "./PDFViewer";


export default function StageLessonPage() {
    const stage = {
        id: "s3",
        title: "JavaScript & The DOM",
        modules: [
            { 
                id: "m1", 
                title: "JS Basics Recap", 
                completed: true, 
                contents: [
                    { id: "m1-c1", title: "Introduction Video", type: "video", duration: "8:30", completed: true },
                    { id: "m1-c2", title: "Variables & Data Types", type: "video", duration: "12:30", completed: true },
                    { id: "m1-c3", title: "Practice Quiz", type: "quiz", duration: "10:00", completed: true }
                ],
                resources: [
                    { id: "m1-r1", title: "JS Basics Cheat Sheet", type: "pdf" }
                ],
                progress: 100
            },
            { 
                id: "m2", 
                title: "DOM Manipulation", 
                is_current: true, 
                completed: false, 
                contents: [
                    { id: "m2-c1", title: "What is the DOM?", type: "video", duration: "6:15", completed: true },
                    { id: "m2-c2", title: "Selecting Elements", type: "video", duration: "12:30", is_current: true, completed: false, progress: 45 },
                    { id: "m2-c3", title: "Modifying Elements", type: "video", duration: "15:20", completed: false },
                    { id: "m2-c4", title: "DOM Reading Material", type: "pdf", duration: "15:00", completed: false },
                    { id: "m2-c5", title: "DOM Quiz", type: "quiz", duration: "15:00", completed: false }
                ],
                resources: [
                    { id: "m2-r1", title: "DOM Methods Reference", type: "pdf" },
                    { id: "m2-r2", title: "Code Examples (ZIP)", type: "file" }
                ], 
                progress: 30
            },
            { 
                id: "m3", 
                title: "Events & UI Logic", 
                completed: false,
                contents: [
                    { id: "m3-c1", title: "Event Listeners", type: "video", duration: "18:45", completed: false },
                    { id: "m3-c2", title: "Event Bubbling", type: "video", duration: "10:30", completed: false },
                    { id: "m3-c3", title: "Events Study Guide", type: "pdf", duration: "15:00", completed: false }
                ],
                resources: [
                    { id: "m3-r1", title: "Event Types Chart", type: "pdf" }
                ],
                progress: 0
            },
            { 
                id: "m4", 
                title: "Mini Project Setup", 
                completed: false,
                contents: [
                    { id: "m4-c1", title: "Project Overview", type: "video", duration: "12:10", completed: false },
                    { id: "m4-c2", title: "Building the UI", type: "video", duration: "25:10", completed: false },
                    { id: "m4-c3", title: "Project Instructions", type: "text", duration: "10:00", completed: false },
                    { id: "m4-c4", title: "Submit Project", type: "quiz", duration: "5:00", completed: false }
                ],
                resources: [
                    { id: "m4-r1", title: "Starter Template", type: "file" },
                    { id: "m4-r2", title: "Design Mockups", type: "pdf" }
                ],
                progress: 0
            },
            { 
                id: "m5", 
                title: "Submission + Reflection", 
                completed: false,
                contents: [
                    { id: "m5-c1", title: "Reflection Guidelines", type: "text", duration: "5:00", completed: false },
                    { id: "m5-c2", title: "Final Assessment", type: "quiz", duration: "20:00", completed: false }
                ],
                resources: [],
                progress: 0
            }
        ],
        liveClass: {
            title: "Live Class — DOM Interactive Workshop",
            link: "#",
            isLive: true,
            viewers: 24
        },
        resources: [
            { id: "r1", label: "Cheat Sheet PDF", type: "pdf", icon: FileText },
            { id: "r2", label: "Starter Code (ZIP)", type: "file", icon: Download },
            { id: "r3", label: "Reference Slides", type: "pdf", icon: BookOpen },
        ],
        progress: 40,
        completedModules: 1,
        totalModules: 5
    };

    const [selectedModule, setSelectedModule] = useState(stage.modules.find(m => m.is_current) || stage.modules[0]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [liveMode, setLiveMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expandedModules, setExpandedModules] = useState(new Set([stage.modules.find(m => m.is_current)?.id || stage.modules[0].id]));
    const [videoProgress, setVideoProgress] = useState(selectedModule.progress || 0);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);


    // Simulate video progress
    useEffect(() => {
        if (!liveMode && selectedContent && selectedContent.type === "video" && !selectedModule.completed) {
            const interval = setInterval(() => {
                setVideoProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [selectedModule, liveMode]);

    const handleModuleSelect = (mod) => {
        setSelectedModule(mod);
        setLiveMode(false);
        setDrawerOpen(false);
        setVideoProgress(mod.progress || 0);
    };

    const handleContentSelect = (mod, content) => {
        setSelectedModule(mod);
        setSelectedContent(content);
        setLiveMode(false);
        setDrawerOpen(false);
        setVideoProgress(content.progress || 0);
    };

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    const router = useNavigate();

    const ModuleIcon = ({ type }) => {
        switch(type) {
            case "video": return <Video size={14} />;
            case "pdf": return <FileText size={14} />;
            case "text": return <BookOpen size={14} />;
            case "quiz": return <Layout size={14} />;
            default: return <PlayCircle size={14} />;
        }
    };

    // Get current content to display
    const currentContent = selectedContent || (selectedModule?.contents?.[0]);
    const displayTitle = currentContent?.title || selectedModule?.title;

    const ModuleList = () => (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold mb-1">{stage.title}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <Award size={14} />
                        <span>{stage.completedModules}/{stage.totalModules} Complete</span>
                    </div>
                    <span>•</span>
                    <span>{stage.progress}% Progress</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-300" style={{width: `${stage.progress}%`}}></div>
                </div>
            </div>

            {/* Live Class Banner */}
            {stage.liveClass.isLive && (
                <button
                    onClick={() => { setLiveMode(true); setDrawerOpen(false); }}
                    className="mx-4 mt-4 flex items-center gap-3 p-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all animate-pulse"
                >
                    <div className="relative">
                        <Video size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
                    </div>
                    <div className="flex-1 text-left">
                        <div className="font-semibold text-sm">Live Class Now</div>
                        <div className="text-xs opacity-90 flex items-center gap-1">
                            <Users size={12} /> {stage.liveClass.viewers} attending
                        </div>
                    </div>
                    <ChevronRight size={18} />
                </button>
            )}

            <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <Layout size={14} /> Course Content
                </h3>
                <div className="space-y-1">
                    {stage.modules.map((mod, index) => {
                        const isLocked = index > 0 && !stage.modules[index - 1].completed;
                        const isExpanded = expandedModules.has(mod.id);
                        const moduleProgress = mod.contents ? 
                            Math.round((mod.contents.filter(c => c.completed).length / mod.contents.length) * 100) : 0;

                        return (
                            <div key={mod.id} className="mb-2">
                                {/* Module Header */}
                                <button
                                    disabled={isLocked}
                                    onClick={() => toggleModule(mod.id)}
                                    className={`
                                        w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all
                                        ${isLocked ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-800' :
                                        mod.completed ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                                        : mod.is_current ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}
                                    `}
                                >
                                    {/* Expand/Collapse Icon */}
                                    <ChevronRight 
                                        size={16} 
                                        className={`transition-transform ${isExpanded ? 'rotate-90' : ''} text-gray-500 dark:text-gray-400`}
                                    />
                                    
                                    {/* Status Icon */}
                                    <div className="flex-shrink-0">
                                        {isLocked ? (
                                            <Lock size={16} className="text-gray-400" />
                                        ) : mod.completed ? (
                                            <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                                        )}
                                    </div>
                                    
                                    {/* Module Title */}
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {mod.title}
                                        </div>
                                        {!mod.completed && moduleProgress > 0 && (
                                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                {moduleProgress}% complete
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Module Badge */}
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {mod.contents?.length || 0} items
                                    </span>
                                </button>

                                {/* Module Contents (Expanded) */}
                                {isExpanded && !isLocked && (
                                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                                        {/* Content Items */}
                                        {mod.contents?.map((content) => {
                                            const isContentSelected = selectedContent?.id === content.id;
                                            const isContentCurrent = content.is_current && !content.completed;
                                            
                                            return (
                                                <button
                                                    key={content.id}
                                                    onClick={() => handleContentSelect(mod, content)}
                                                    className={`
                                                        w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all
                                                        ${isContentSelected ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100' :
                                                        isContentCurrent ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100' :
                                                        content.completed ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800' :
                                                        'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
                                                    `}
                                                >
                                                    {/* Content Type Icon */}
                                                    <div className="flex-shrink-0">
                                                        {content.completed ? (
                                                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                                                        ) : isContentCurrent ? (
                                                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center">
                                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                            </div>
                                                        ) : (
                                                            <ModuleIcon type={content.type} />
                                                        )}
                                                    </div>
                                                    
                                                    {/* Content Title */}
                                                    <span className="flex-1 text-left truncate">
                                                        {content.title}
                                                    </span>
                                                    
                                                    {/* Duration or Quiz Badge */}
                                                    {content.type === 'quiz' ? (
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                                                            Quiz
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 text-[10px]">
                                                            {content.duration}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                        
                                        {/* Resources Section */}
                                        {mod.resources && mod.resources.length > 0 && (
                                            <>
                                                <div className="pt-2 pb-1">
                                                    <div className="text-[10px] font-semibold uppercase text-gray-400 dark:text-gray-500 px-3">
                                                        Resources
                                                    </div>
                                                </div>
                                                {mod.resources.map((resource) => (
                                                    <button
                                                        key={resource.id}
                                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        <Download size={12} className="flex-shrink-0" />
                                                        <span className="flex-1 text-left truncate">
                                                            {resource.title}
                                                        </span>
                                                        <FileText size={12} className="text-gray-400" />
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Global Resources Section */}
                <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 mt-6 flex items-center gap-2">
                    <Download size={14} /> Course Resources
                </h3>
                <div className="space-y-2">
                    {stage.resources.map(r => {
                        const Icon = r.icon;
                        return (
                            <button key={r.id} className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-left flex items-center gap-2 transition-colors">
                                <Icon size={16} className="text-gray-500 dark:text-gray-400" />
                                <span className="flex-1">{r.label}</span>
                                <Download size={14} className="text-gray-400" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <ModuleList />
            </aside>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)}></div>
                <div className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
                    >
                        <X size={20} />
                    </button>
                    <ModuleList />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex-1">
                        <h1 className="font-semibold text-sm">{displayTitle}</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stage.title}</p>
                    </div>
                </header>

                {liveMode ? (
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                        {/* Live Video Section */}
                        <div className="flex-1 flex flex-col bg-black">
                            <div className={`relative ${isFullscreen ? 'h-screen' : 'h-64 sm:h-80 lg:h-full'}`}>
                                <iframe
                                    src="https://www.youtube.com/embed/2Ji-clqUYnA"
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                LIVE
                                            </span>
                                            <span className="text-white text-sm flex items-center gap-1">
                                                <Users size={14} /> {stage.liveClass.viewers}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsFullscreen(!isFullscreen)}
                                                className="p-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-lg"
                                            >
                                                <Maximize2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => setLiveMode(false)}
                                                className="p-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-lg"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Chat */}
                            <div className="lg:hidden flex flex-col h-64 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <MessageSquare size={16} /> Live Chat
                                    </h3>
                                    <span className="text-xs text-gray-500">{stage.liveClass.viewers} online</span>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-3">
                                    <div className="flex gap-2">
                                        <span className="font-medium text-blue-600 dark:text-blue-400">Aisha:</span>
                                        <span className="text-gray-700 dark:text-gray-300">Can you explain event bubbling again?</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-medium text-green-600 dark:text-green-400">You:</span>
                                        <span className="text-gray-700 dark:text-gray-300">Sure, events flow from target → parent</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-medium text-purple-600 dark:text-purple-400">John:</span>
                                        <span className="text-gray-700 dark:text-gray-300">Thanks for the demo! 🙌</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type message..."
                                    />
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Chat Sidebar */}
                        <div className="hidden lg:flex flex-col w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <MessageSquare size={16} /> Live Chat
                                </h3>
                                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                                    {stage.liveClass.viewers} online
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto space-y-3 text-sm mb-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">Aisha</span>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                        Can you explain event bubbling again?
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className="font-medium text-green-600 dark:text-green-400">You</span>
                                    <div className="bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                                        Sure, events flow from target → parent
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-purple-600 dark:text-purple-400">John</span>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                        Thanks for the demo! 🙌
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type message..."
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {/* Content Viewer */}
                        <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
                            {currentContent?.type === "video" && (
                                <iframe
                                    src="https://www.youtube.com/embed/W6NZfCO5SIk"
                                    className="w-full aspect-video lg:h-[500px]"
                                    allowFullScreen
                                />
                            )}
                            {currentContent?.type === "pdf" && (
                                <div className="w-full aspect-video lg:h-[500px] bg-white dark:bg-gray-800 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <DocumentViewer />
                                    </div>
                                </div>
                            )}
                            {currentContent?.type === "text" && (
                                <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 text-sm lg:text-base leading-relaxed">
                                    <h2 className="text-2xl font-bold mb-4">{currentContent.title}</h2>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        This lesson covers the fundamental concepts you'll need to master. Take your time to review the material and complete the reflection assignment.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h3 className="font-semibold mb-2">Key Takeaway</h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">Understanding these principles will help you build more interactive and dynamic web applications.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentContent?.type === "quiz" && (<ProctorInstructions />)}


                        </div>
                        {/* Mark as Complete Button */}
                        {/* {currentContent && !currentContent.completed && (
                            <button
                                onClick={markAsComplete}
                                className="w-full lg:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                            >
                                Mark as Complete
                            </button>
                        )} */}

                        {/* Next Module Preview */}
                        {!currentContent?.completed && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <div className="flex items-start gap-3">
                                    <Zap size={20} className="text-purple-600 dark:text-purple-400 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Keep Going!</h3>
                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                            Complete this content to progress through the module and unlock new lessons.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Completion Modal */}
            {showCompletionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center animate-bounce">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Module Complete! 🎉</h3>
                        <p className="text-gray-600 dark:text-gray-400">Great job! Moving to the next module...</p>
                    </div>
                </div>
            )}
        </div>
    );
}