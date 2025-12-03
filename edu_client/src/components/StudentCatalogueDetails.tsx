import { useState } from 'react';
import { 
  PlayCircle, 
  Star, 
  Check, 
  Clock, 
  Users, 
  Award, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Lock,
  Globe,
  AlertCircle,
  Monitor,
  FileText,
  Download,
  Infinity as InfinityIcon,
  Smartphone,
  Trophy,
  Map,
  ArrowRight,
  Layout,
  Code,
  Server,
  Database
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useHeaderTitle } from '@/contexts/HeaderTitleContext';

export default function CatalogPathDetails() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  useHeaderTitle("Learning Path Details");

  // Mock Data - Path Structure
  const path = {
    id: 'web-dev-path',
    title: 'Full Stack Web Development Path',
    subtitle: 'A complete career roadmap. Master frontend, backend, and deployment through 3 comprehensive courses.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80',
    category: 'Web Development',
    level: 'Beginner to Pro',
    totalDuration: '65.5 hours',
    totalCourses: 3,
    totalModules: 30,
    updatedDate: '11/2025',
    language: 'English',
    enrolled: 12543,
    rating: 4.9,
    reviewsCount: 3420,
    bundlePriceKES: 12000,
    totalIndividualPriceKES: 18000,
    discount: '33% off',
    includesCertificate: true,
    isPremiumIncluded: true,
    promotedBy: ['Google', 'Microsoft', 'Meta'],
    whatYouWillLearn: [
      'Build 16 web development projects for your portfolio.',
      'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
      'Deploy fully-fledged web apps to the cloud.',
      'Understand professional developer workflows and tools.'
    ],
    courses: [
      {
        id: 'c1',
        title: 'Web Development I: The Fundamentals',
        subtitle: 'HTML5, CSS3, and Responsive Design',
        desc: 'Start your journey by mastering the building blocks of the web. Build beautiful, responsive static websites.',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
        icon: <Layout className="text-blue-500" />,
        priceKES: 5000,
        duration: '15h 30m',
        modulesCount: 8,
        status: 'completed',
        modules: [
          { id: 'm1', title: 'Intro to HTML', duration: '15:00', type: 'video', done: true },
          { id: 'm2', title: 'Text & Structure', duration: '25:00', type: 'video', done: true },
          { id: 'm3', title: 'CSS Basics', duration: '30:00', type: 'video', done: true },
          { id: 'm4', title: 'Flexbox & Grid', duration: '45:00', type: 'video', done: true },
        ]
      },
      {
        id: 'c2',
        title: 'Web Development II: Interactive Frontend',
        subtitle: 'JavaScript ES6+, DOM, and Bootstrap',
        desc: 'Bring your sites to life with JavaScript. Learn logic, DOM manipulation, and modern styling frameworks.',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        icon: <Code className="text-yellow-500" />,
        priceKES: 6000,
        duration: '25h 00m',
        modulesCount: 12,
        status: 'current',
        progress: 45,
        modules: [
          { id: 'm1', title: 'JS Syntax & Types', duration: '35:00', type: 'video', done: true },
          { id: 'm2', title: 'DOM Manipulation', duration: '50:00', type: 'video', done: false, is_current: true },
          { id: 'm3', title: 'Async JS & APIs', duration: '45:00', type: 'video', done: false },
          { id: 'm4', title: 'Bootstrap 5', duration: '40:00', type: 'video', done: false },
        ]
      },
      {
        id: 'c3',
        title: 'Web Development III: Full Stack Mastery',
        subtitle: 'React, Node.js, MongoDB, and Deployment',
        desc: 'Become a full stack engineer. Build complex applications with the MERN stack and deploy them to the world.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        icon: <Server className="text-green-500" />,
        priceKES: 7000,
        duration: '25h 00m',
        modulesCount: 10,
        status: 'locked',
        modules: [
          { id: 'm1', title: 'React Basics', duration: '1:00:00', type: 'video', done: false },
          { id: 'm2', title: 'Hooks & State', duration: '1:15:00', type: 'video', done: false },
          { id: 'm3', title: 'Node.js & Express', duration: '55:00', type: 'video', done: false },
          { id: 'm4', title: 'MongoDB & Mongoose', duration: '50:00', type: 'video', done: false },
        ]
      }
    ],
    teachers: [
      {
        id: 't1',
        name: 'Aisha K.',
        role: 'Senior Frontend Engineer',
        photo: 'https://i.pravatar.cc/150?img=47',
        bio: 'Ex-startup frontend lead, loves React and teaching students build portfolio projects.',
      },
      {
        id: 't2',
        name: 'Daniel M.',
        role: 'Full-Stack Developer',
        photo: 'https://i.pravatar.cc/150?img=12',
        bio: 'Experienced with deployment pipelines and web performance.',
      },
    ],
    reviews: [
      { id: 'r1', student: 'Lina N.', rating: 5, date: '2 weeks ago', text: 'Taking the full path was the best decision. The courses flow perfectly into each other.' },
      { id: 'r2', student: 'James O.', rating: 4.5, date: '1 month ago', text: 'Web II is challenging but worth it. The instructors explain concepts very clearly.' },
    ],
  };

  const [expandedCourse, setExpandedCourse] = useState<string | null>('c2');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-20">
      
      {/* HERO SECTION */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={path.image} alt="Background" className="w-full h-full object-cover opacity-10 blur-sm" />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Map size={14} /> Career Path
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {path.title}
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                {path.subtitle}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-300 border-t border-slate-800 pt-6 mt-2">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-yellow-400" />
                  <span><strong className="text-white">{path.totalCourses}</strong> Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-400" />
                  <span><strong className="text-white">{path.totalDuration}</strong> Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-emerald-400" />
                  <span><strong className="text-white">{path.enrolled.toLocaleString()}</strong> Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400" />
                  <span><strong className="text-white">{path.rating}</strong> Rating</span>
                </div>
              </div>
            </div>

            {/* Bundle Card (Desktop) */}
            <div className="hidden lg:block w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-1">Total Value: <span className="line-through">KES {path.totalIndividualPriceKES.toLocaleString()}</span></p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-white">KES {path.bundlePriceKES.toLocaleString()}</span>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">{path.discount}</span>
                </div>
                <p className="text-emerald-400 text-sm font-medium mt-2">Save KES {(path.totalIndividualPriceKES - path.bundlePriceKES).toLocaleString()} with the bundle</p>
              </div>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5 mb-3">
                Enroll in Path
              </button>
              <p className="text-xs text-center text-slate-400">30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN - Path Content */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* WHAT YOU WILL LEARN */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="text-amber-500" /> Path Outcomes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {path.whatYouWillLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* VISUAL PATH JOURNEY */}
          <section className="relative">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Map className="text-blue-500" /> Your Learning Journey
            </h2>
            
            <div className="relative pl-8 md:pl-12">
              {/* Vertical Connecting Line */}
              <div className="absolute left-8 md:left-12 top-4 bottom-12 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-gray-300 dark:to-slate-700 -ml-12 z-0"></div>

              <div className="space-y-12">
                {path.courses.map((course, index) => {
                  const isExpanded = expandedCourse === course.id;
                  
                  let statusColor = 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-slate-800 dark:border-slate-700';
                  let icon = <Lock size={20} />;
                  let ringColor = 'ring-gray-200 dark:ring-slate-700';
                  
                  if (course.status === 'completed') {
                    statusColor = 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800';
                    icon = <Check size={20} strokeWidth={3} />;
                    ringColor = 'ring-emerald-500';
                  } else if (course.status === 'current') {
                    statusColor = 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
                    icon = <PlayCircle size={20} fill="currentColor" className="text-amber-600 dark:text-amber-500" />;
                    ringColor = 'ring-amber-500';
                  }

                  return (
                    <div key={course.id} className="relative z-10">
                      {/* Node Marker */}
                      <div className={`absolute -left-8 md:-left-12 top-6 w-10 h-10 -ml-5 rounded-full border-4 bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm z-20 ${ringColor} ${course.status === 'completed' ? 'border-emerald-500' : course.status === 'current' ? 'border-amber-500' : 'border-gray-300 dark:border-slate-600'}`}>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{index + 1}</span>
                      </div>

                      {/* Course Card */}
                      <div className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-500 shadow-lg ring-1 ring-blue-500/20' : 'border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'}`}>
                        
                        {/* Card Header */}
                        <div 
                          className="p-6 cursor-pointer"
                          onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Course Image/Icon */}
                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 relative flex-shrink-0">
                               <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                               {course.status === 'completed' && (
                                 <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                   <Check size={12} /> Done
                                 </div>
                               )}
                               {course.status === 'current' && (
                                 <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                   <PlayCircle size={12} /> In Progress
                                 </div>
                               )}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {course.title}
                                  </h3>
                                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">{course.subtitle}</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{course.desc}</p>
                                </div>
                                <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                              </div>

                              <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-4 mt-2">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1"><Layout size={14} /> {course.modulesCount} Modules</span>
                                  <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                </div>
                                
                                {course.status === 'locked' ? (
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold text-slate-900 dark:text-white">KES {course.priceKES.toLocaleString()}</span>
                                    <button className="px-4 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                      Buy Course
                                    </button>
                                  </div>
                                ) : (
                                  <button className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors shadow-sm shadow-emerald-500/20">
                                    {course.status === 'current' ? 'Resume Course' : 'Review Course'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Modules */}
                        {isExpanded && (
                          <div className="border-t border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Course Syllabus</h4>
                            <div className="space-y-3">
                              {course.modules.map((m) => (
                                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-sm transition-shadow">
                                  <div className="flex items-center gap-3">
                                    {m.done ? (
                                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <Check size={14} />
                                      </div>
                                    ) : (m as any).is_current ? (
                                      <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center animate-pulse flex-shrink-0">
                                        <PlayCircle size={14} />
                                      </div>
                                    ) : (
                                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-400 flex items-center justify-center flex-shrink-0">
                                        <Lock size={14} />
                                      </div>
                                    )}
                                    <div>
                                      <div className={`text-sm font-medium ${m.done ? 'text-slate-500' : 'text-slate-900 dark:text-slate-200'}`}>
                                        {m.title}
                                      </div>
                                      <div className="text-xs text-slate-400">{m.duration} • {m.type}</div>
                                    </div>
                                  </div>
                                  
                                  {(m as any).is_current ? (
                                    <button className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-500">
                                      Resume
                                    </button>
                                  ) : !m.done && course.status !== 'locked' ? (
                                    <button className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-md hover:bg-emerald-100">
                                      Start
                                    </button>
                                  ) : null}
                                </div>
                              ))}
                              <div className="text-center pt-2">
                                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                  View all {course.modulesCount} modules
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Finish Line */}
                <div className="relative z-10 flex items-center gap-4 pt-4">
                   <div className="absolute -left-8 md:-left-12 top-1/2 -mt-4 w-10 h-10 -ml-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 z-20">
                      <Trophy size={20} />
                   </div>
                   <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg w-full">
                      <h3 className="font-bold text-lg mb-1">Path Completion</h3>
                      <p className="text-emerald-50 text-sm">Earn your Professional Certificate and unlock career services.</p>
                   </div>
                </div>

              </div>
            </div>
          </section>

          {/* INSTRUCTORS */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Mentors for this Path</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {path.teachers.map(t => (
                <div key={t.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex gap-4">
                  <img src={t.photo} alt={t.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 dark:ring-slate-800" />
                  <div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">{t.role}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN - Sticky Sidebar (Desktop) / Bottom Sheet (Mobile) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-6">
            
            {/* Mobile/Tablet Bundle Card (Visible only if not in Hero) */}
            <div className="lg:hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
               {/* Same content as desktop bundle card */}
               <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-1">Total Value: <span className="line-through">KES {path.totalIndividualPriceKES.toLocaleString()}</span></p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">KES {path.bundlePriceKES.toLocaleString()}</span>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">{path.discount}</span>
                </div>
              </div>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 mb-3">
                Enroll in Path
              </button>
            </div>

            {/* Path Includes */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-lg mb-4">This Path Includes</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                   <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500"><InfinityIcon size={18} /></div>
                   <span>Lifetime access to all 3 courses</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                   <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500"><Trophy size={18} /></div>
                   <span>Professional Certificate</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                   <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500"><Download size={18} /></div>
                   <span>Downloadable resources</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                   <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-500"><Smartphone size={18} /></div>
                   <span>Access on mobile and TV</span>
                </li>
              </ul>
            </div>

            {/* Share / Gift */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm text-center">
               <p className="font-bold text-slate-900 dark:text-white mb-2">Share this path</p>
               <div className="flex justify-center gap-4">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                     <Globe size={20} className="text-slate-600 dark:text-slate-400" />
                  </button>
                  {/* Add more social icons */}
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
