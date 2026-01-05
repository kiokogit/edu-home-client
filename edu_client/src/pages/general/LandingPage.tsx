import { useEffect, useRef, ReactNode } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { 
  ArrowRight, Users, MapPin, Calendar, Newspaper, MessageSquare, ChevronRight, Star, LucideIcon
} from 'lucide-react';
import Footer from '@/components/Footer';
import AuthPage from './Authentication';

interface Community {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const communities: Community[] = [
  {
    id: 'campus',
    title: 'Campus Life',
    description: 'Connect with fellow students, join clubs, and stay updated on campus events.',
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'local',
    title: 'Local Community',
    description: 'Discover local businesses, events, and connect with neighbors.',
    icon: MapPin,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'cultural',
    title: 'Cultural Groups',
    description: 'Celebrate traditions and connect with your cultural community.',
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'professional',
    title: 'Professional Networks',
    description: 'Connect with professionals and explore career opportunities.',
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  }
];

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'Community Events',
    description: 'Stay updated on local happenings and never miss out on what matters.',
    icon: Calendar
  },
  {
    title: 'Local Ads and listings',
    description: 'Access nearest offers, deals, and classifieds from your community.',
    icon: MessageSquare
  },
  {
    title: 'Local Guide',
    description: 'Get a guide through local area.',
    icon: Newspaper
  }
];

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  community: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Alex R.',
    role: 'University Student',
    text: 'Uniquad transformed how I connect with my campus community. The events feed is a game-changer!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    community: 'JKUAT'
  },
  {
    name: 'Maria G.',
    role: 'Small Business Owner',
    text: 'Connecting with local customers has never been easier. Our community is more engaged than ever!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    community: 'Austin Local Business Network'
  },
  {
    name: 'James & Sarah T.',
    role: 'Community Leaders',
    text: 'Managing our community events became so much simpler with Uniquad. The platform brings people together.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100',
    community: 'Maplewood Neighborhood'
  }
];

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], 
        delay: delay * 0.1 
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

function LandingPage() {
  const navigate = useNavigate();

  const isLoggedIn = false; // --- IGNORE ---
  const startLogin = (source: string) => {
    navigate('/auth?mode=' + 'login' + '&source=' + source);
  };

  const startRegister = (source: string) => {
    navigate('/auth?mode=register&source=' + source);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-40">
        {/* Animated Background */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent" />
          
          {/* Animated dots */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-orange-500/30 dark:bg-orange-400/20"
                style={{
                  width: Math.random() * 8 + 4 + 'px',
                  height: Math.random() * 8 + 4 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `pulse ${Math.random() * 4 + 3}s infinite`,
                  animationDelay: Math.random() * 5 + 's'
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <FadeInOnScroll>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm"
              >
                <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Join the Movement
                </span>
              </motion.div>
            </FadeInOnScroll>
            
            <FadeInOnScroll>
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="block">Bridging Communities,</span>
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  One Connection at a Time
                </span>
              </motion.h1>
            </FadeInOnScroll>
            
            <FadeInOnScroll>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Uniquad is the premium platform that brings communities together - from campus life to local neighborhoods, 
                creating meaningful connections and shared experiences.
              </motion.p>
            </FadeInOnScroll>
            
            <FadeInOnScroll>
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {isLoggedIn ? (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="group relative px-8 py-4 text-white rounded-full bg-gradient-to-r from-orange-600 to-orange-500 font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 flex items-center gap-2"
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => startRegister('hero')}
                      className="group relative px-8 py-4 text-white rounded-full bg-gradient-to-r from-orange-600 to-orange-500 font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 flex items-center gap-2"
                    >
                      <span className="relative z-10">Join Now - It's Free</span>
                      <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button 
                      onClick={() => startLogin('hero')}
                      className="px-6 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-medium hover:border-orange-400 dark:hover:border-orange-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span>Sign In</span>
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-medium hover:border-orange-400 dark:hover:border-orange-400 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Learn More</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </FadeInOnScroll>
          </div>

          {/* Hero Visual - Community Showcase */}
          <FadeInOnScroll>
            <motion.div 
              className="mt-24 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-500/20 rounded-3xl blur-2xl -z-10" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Campus Community</h3>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800"
                          >
                            {i}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs font-medium border-2 border-white dark:border-gray-800">
                          +12
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-300">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Campus Cleanup Day</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Join us this Saturday at 9 AM to help clean up the campus!</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-full">#volunteer</span>
                              <span className="text-xs text-gray-400">12 going</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-300">
                            <Newspaper size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">New Study Spaces Available</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Check out the newly renovated library study pods on the 3rd floor.</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 rounded-full">#announcement</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Post to community..." 
                          className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 border border-gray-200 dark:border-gray-600"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating community cards */}
              <div className="hidden md:block absolute -left-20 top-1/4 -rotate-6">
                <motion.div 
                  className="w-48 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50"
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Local Artisans</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">124 members</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">Join our community of local artists and crafters sharing their work and collaborating on projects.</p>
                </motion.div>
              </div>
              
              <div className="hidden md:block absolute -right-20 bottom-1/4 rotate-6">
                <motion.div 
                  className="w-48 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50"
                  initial={{ y: 0 }}
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Green Campus</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">89 members</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">Dedicated to making our campus more sustainable and eco-friendly. Join us for our next cleanup!</p>
                </motion.div>
              </div>
            </motion.div>
          </FadeInOnScroll>
          
        </div>
        
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center items-center flex-1 md:flex">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInOnScroll>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Built for <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">you</span>
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll delay={1}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                Less noise. More signal. Every part of Uniquad is designed to help people meet, plan, and stay connected.
              </p>
            </FadeInOnScroll>
          </div>
          <div className="relative">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/students-talking-to-each-other-illustration-svg-png-download-5979483.png"
                alt="Community connection"
                className="w-full h-auto drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-pulse">
                <p className="text-sm text-gray-600 dark:text-gray-300">🎉 New event in your area!</p>
              </div>
            </div>
        </div>
      </section>

      {features.map((feature, index) => {
        const isReversed = index % 2 === 1;
        const FeatureIcon = feature.icon;
        const sectionId = `feature-${index + 1}`;

        return (
          <section
            key={feature.title}
            id={sectionId}
            className="py-20 md:py-36 bg-white dark:bg-gray-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                  <FadeInOnScroll>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20">
                      <span className="text-xs font-bold tracking-widest uppercase">Feature</span>
                      <span className="text-xs font-bold tracking-widest uppercase">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={1}>
                    <h3 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={2}>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={3}>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-200">Fast</span>
                      <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-200">Focused</span>
                      <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-200">Local-first</span>
                    </div>
                  </FadeInOnScroll>
                </div>

                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                  <FadeInOnScroll>
                    <div className="relative">
                      <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-transparent rounded-[2.5rem] blur-2xl" />
                      <div className="relative rounded-[2rem] border border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="p-8 md:p-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                <FeatureIcon size={22} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Uniquad</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Live preview</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500" />
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Online</span>
                            </div>
                          </div>

                          <div className="mt-8 space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Today</p>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">A clean feed of what matters, not what shouts.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">This week</p>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Events, updates, and conversations — in one place.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Always</p>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Designed for real people in real communities.</p>
                            </div>
                          </div>

                          <div className="mt-8 flex items-center justify-between">
                            <button
                              onClick={() => document.getElementById('communities')?.scrollIntoView({ behavior: 'smooth' })}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-200 transition"
                            >
                              See communities
                              <ChevronRight size={16} />
                            </button>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Scroll-driven story</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section id="communities" className="py-24 bg-gray-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInOnScroll>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Communities that feel <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">alive</span>
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll delay={1}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                From campus to neighborhood to professional circles — Uniquad adapts to how your people gather.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {communities.map((community, index) => {
        const isReversed = index % 2 === 1;
        const CommunityIcon = community.icon;

        return (
          <section
            key={community.id}
            id={`community-${community.id}`}
            className="py-20 md:py-36 bg-white dark:bg-gray-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <FadeInOnScroll>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20">
                      <CommunityIcon size={14} />
                      <span className="text-xs font-bold tracking-widest uppercase">{community.title}</span>
                    </div>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={1}>
                    <h3 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {community.description}
                    </h3>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={2}>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                      Create events, keep discussions organized, and make it easy for people to show up — online and offline.
                    </p>
                  </FadeInOnScroll>

                  <FadeInOnScroll delay={3}>
                    <div className="mt-10 grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Members</p>
                        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">1.2k</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Events / week</p>
                        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">6</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Response</p>
                        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Instant</p>
                      </div>
                    </div>
                  </FadeInOnScroll>
                </div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <FadeInOnScroll>
                    <div className="relative">
                      <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/25 via-orange-400/10 to-transparent rounded-[2.5rem] blur-2xl" />
                      <div className="relative rounded-[2rem] border border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="p-8 md:p-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-2xl ${community.bg} ${community.color} flex items-center justify-center`}>
                                <CommunityIcon size={22} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{community.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Highlights</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">Featured</span>
                          </div>

                          <div className="mt-8 space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-300 flex items-center justify-center">
                                  <Calendar size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Community meetup</p>
                                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">One tap RSVP. One place for updates.</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-300 flex items-center justify-center">
                                  <MessageSquare size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Organized conversation</p>
                                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">A feed for news. Threads for chat.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button
                              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-lg shadow-orange-500/20"
                            >
                              Hear from members
                              <ArrowRight size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section id="testimonials" className="py-24 bg-gray-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInOnScroll>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Real people. Real <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">connection</span>.
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll delay={1}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                What happens when communities finally have a place that respects attention.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {testimonials.map((t, index) => (
        <section key={t.name} className="py-16 md:py-28 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInOnScroll>
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-transparent rounded-[2.5rem] blur-2xl" />
                <div className="relative rounded-[2rem] border border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden p-10 md:p-14">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 dark:text-white">{t.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-orange-500">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={`${t.name}-star-${i}`} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-10 text-2xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-white">
                    “{t.text}”
                  </blockquote>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">{t.community}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Story {String(index + 1).padStart(2, '0')} of {String(testimonials.length).padStart(2, '0')}</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      ))}

        <section className="py-24 md:py-32 bg-gradient-to-br from-orange-900 to-orange-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Join Uniquad today.</h2>
            </FadeInOnScroll>
            <FadeInOnScroll delay={1}>
              <p className="mt-6 text-lg md:text-xl text-orange-50 max-w-3xl mx-auto">
                Create your profile, join communities, and start showing up — online and offline.
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll delay={2}>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => startRegister('cta')}
                  className="px-10 py-4 rounded-full bg-white text-orange-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  Create free account
                </button>
                <button
                  onClick={() => console.log('Contact us clicked')}
                  className="px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 font-bold text-lg transition-all"
                >
                  Contact us
                </button>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
        <Footer />

    </div>
  )
}

export default function NoAuthRouting(){

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )

}
