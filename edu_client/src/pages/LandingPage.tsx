import { useState, useEffect } from 'react'
import {
  BookOpen,
  Sparkles,
  Menu,
  Phone,
  Mail,
  ArrowRight,
  Check,
  X,
  Wrench,
  Hammer,
  Scissors,
  Camera,
  Code,
  Bot,
  PenTool,
  Music,
  Gamepad2,
  Mic,
  Palette,
  Cpu,
  Users,
  Trophy,
  Star,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useFusionAuth } from '@fusionauth/react-sdk'

const skillCategories = [
  {
    id: 'tech',
    title: 'Tech & Robotics',
    icon: Bot,
    description: 'Coding, Robotics, AI, and Electronics.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    skills: ['Python Coding', 'Arduino Robotics', 'Web Development', 'Game Design']
  },
  {
    id: 'handiwork',
    title: 'Handiwork & Trade',
    icon: Wrench,
    description: 'Plumbing, Joinery, Electrical, and Carpentry.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    skills: ['Home Plumbing', 'Basic Joinery', 'Electrical Repair', 'Woodworking']
  },
  {
    id: 'arts',
    title: 'Creative Arts',
    icon: Palette,
    description: 'Photography, Drawing, Embroidery, and Design.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    skills: ['Digital Photography', 'Sketching & Drawing', 'Embroidery', 'Fashion Design']
  },
  {
    id: 'life',
    title: 'Life Skills',
    icon: Users,
    description: 'Public Speaking, Chess, Cooking, and First Aid.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    skills: ['Public Speaking', 'Chess Mastery', 'Culinary Basics', 'Financial Literacy']
  }
]

const featuredCrafts = [
  { name: 'Plumbing', icon: Wrench, image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800' },
  { name: 'Robotics', icon: Bot, image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tailoring', icon: Scissors, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800' },
  { name: 'Music', icon: Music, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800' },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent',
    text: 'My son learned basic plumbing and fixed our kitchen sink! EduCraft is amazing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    name: 'David K.',
    role: 'Student (14)',
    text: 'I built my first robot and learned Python. The lessons are so fun and practical.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = ({ show, onClose, title, children }: any) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/40 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-white/20 dark:border-white/10 scale-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-500 transition">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const { isLoggedIn, isFetchingUserInfo, startLogin, startRegister } = useFusionAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/student/dashboard')
    }
  }, [isLoggedIn, navigate])

  if (isLoggedIn || isFetchingUserInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white font-sans selection:bg-emerald-500/30">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 dark:bg-slate-950/70 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Hammer size={20} className="fill-white/20" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">EduCraft</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">Skills for Life</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {['About', 'Catalogue', 'Projects', 'Community'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => startLogin('landing-nav')} className="text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400 transition">
                Log in
              </button>
              <button
                onClick={() => startRegister('landing-nav')}
                className="group relative px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen((prev) => !prev)}>
              <Menu />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 p-4 space-y-4 shadow-2xl animate-in slide-in-from-top-5">
            {['About', 'Catalogue', 'Projects', 'Community'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <button onClick={() => startLogin('mobile')} className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-semibold">
                Log in
              </button>
              <button onClick={() => startRegister('mobile')} className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/20">
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-slate-50 to-slate-50 dark:from-emerald-900/20 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-emerald-100 backdrop-blur-sm shadow-sm dark:bg-white/5 dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={14} className="text-emerald-500" />
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">The Future is Handmade</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Master the Skills that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Build the World.</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              From coding to carpentry, robotics to sewing. EduCraft is the premium hub for children and young adults to learn the practical crafts that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <button 
                onClick={() => startRegister('hero')}
                className="h-14 px-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                Start Learning <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white font-semibold hover:border-emerald-400 transition-all duration-300"
              >
                Explore Catalogue
              </button>
            </div>
          </div>

          {/* Hero Visuals */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            {featuredCrafts.map((craft, idx) => (
              <div key={craft.name} className={`group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl ${idx % 2 === 0 ? 'translate-y-8' : ''}`}>
                <img src={craft.image} alt={craft.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3">
                    <craft.icon size={20} />
                  </div>
                  <p className="text-white font-bold text-lg">{craft.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                More than just school. <br />
                <span className="text-emerald-500">Skills for life.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Traditional education is essential, but practical skills build confidence and independence. At EduCraft, we bridge the gap. We provide a safe, engaging platform where kids and teens can master real-world tools, from a soldering iron to a sewing machine.
              </p>
              <div className="space-y-4">
                {[
                  'Expert-led video tutorials for every skill level',
                  'Safe, supervised community learning groups',
                  'Earn badges and certificates for completed projects',
                  'Kits and tools recommendations for home practice'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-[2.5rem] opacity-20 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Kids learning" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                      A+
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Certified Curriculum</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Vetted by industry experts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="catalogue" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Choose Your Craft</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore our diverse range of learning paths. Whether you want to build with your hands or your mind, we have a path for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{cat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {cat.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {cat.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => startRegister(`catalogue-${cat.id}`)}
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-semibold text-sm hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-colors"
                >
                  View Courses
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3">
              {['Chess', 'Piano', 'Hair & Beauty', 'Photography', 'Embroidery', 'Public Speaking'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {tag}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                + 20 more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects & Community */}
      <section id="projects" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Made by EduCrafters</h2>
              <p className="text-slate-400 max-w-xl text-lg">
                See what our students are building, fixing, and creating every day.
              </p>
            </div>
            <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition font-semibold">
              View All Projects
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Automatic Plant Waterer', author: 'Alex (12)', cat: 'Robotics', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600' },
              { title: 'Hand-carved Chess Set', author: 'Maria (15)', cat: 'Woodworking', img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600' },
              { title: 'Portrait Photography', author: 'James (16)', cat: 'Arts', img: 'https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=600' }
            ].map((project) => (
              <div key={project.title} className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-800">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="inline-block px-2 py-1 rounded bg-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                    {project.cat}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-slate-300">by {project.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-16">Community Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-left relative">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 overflow-hidden shadow-lg">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4">
                  <div className="flex gap-1 text-emerald-500 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg italic mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods of Learning */}
      <section id="methods" className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">How You Learn</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We know everyone learns differently. That's why EduCraft offers multiple ways to master your skills, from solo projects to community camps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Hands-on Projects', icon: Hammer, desc: 'Build real things. From birdhouses to basic circuits, learn by doing.' },
              { title: 'Online Lessons', icon: BookOpen, desc: 'High-quality video tutorials you can watch anytime, anywhere.' },
              { title: '1-on-1 Mentorship', icon: Users, desc: 'Get personal guidance from expert craftsmen in your field.' },
              { title: 'Group Meetups', icon: Users, desc: 'Join local clubs to practice skills and make friends.' },
              { title: 'Workshops & Camps', icon: Trophy, desc: 'Intensive weekend bootcamps to level up your skills fast.' },
              { title: 'Fun Events', icon: Gamepad2, desc: 'Competitions, showcases, and fairs to celebrate your work.' },
            ].map((method) => (
              <div key={method.title} className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <method.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{method.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Materials */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <Wrench size={14} className="text-emerald-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">We Equip You</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Real Tools for <br />
                <span className="text-emerald-400">Real Work.</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Don't have a sewing machine? Need a specific wrench set? We've got you covered. EduCraft connects you with the tools you need, custom-delivered to your door or available at local community hubs.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Professional Sewing Machines & Fabrics',
                  'Plumbing Pipe Kits & Wrenches',
                  'Robotics & Arduino Starter Packs',
                  'Woodworking Hand Tools & Safety Gear'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 rounded-full bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition">
                Browse Equipment
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=1000" 
                alt="Workshop Tools" 
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-emerald-50 dark:bg-emerald-950/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8 text-emerald-500 dark:text-emerald-400 opacity-50">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>
          </div>
          <blockquote className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
            "The next billionaires will be plumbers, electricians and such craftsmen, who cannot be replaced by AI."
          </blockquote>
          <cite className="text-lg font-medium text-slate-600 dark:text-slate-400 not-italic">
            — Jensen Huang, CEO of NVIDIA
          </cite>
        </div>
      </section>

      {/* Career Connections */}
      <section className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><Code size={20} /></div>
                  <p className="font-bold text-slate-900 dark:text-white">Coding Internships</p>
                  <p className="text-sm text-slate-500">Remote & Local</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4"><Palette size={20} /></div>
                  <p className="font-bold text-slate-900 dark:text-white">Design Gigs</p>
                  <p className="text-sm text-slate-500">Freelance Projects</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4"><Wrench size={20} /></div>
                  <p className="font-bold text-slate-900 dark:text-white">Apprenticeships</p>
                  <p className="text-sm text-slate-500">Plumbing & Trade</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-4"><Camera size={20} /></div>
                  <p className="font-bold text-slate-900 dark:text-white">Event Photography</p>
                  <p className="text-sm text-slate-500">Weekend Jobs</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Learning for the <br />
                <span className="text-emerald-500">Real World.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We don't just teach you skills; we connect you to the economy. EduCraft partners with local businesses and global tech companies to offer internships, apprenticeships, and paid projects to our top learners.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Build Your Portfolio</p>
                    <p className="text-sm text-slate-500">Every project you complete adds to your verified skill profile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Get Matched</p>
                    <p className="text-sm text-slate-500">Our AI matches you with opportunities that fit your skill level.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Earn & Grow</p>
                    <p className="text-sm text-slate-500">Start earning money and experience while you're still learning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-500 to-cyan-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Start Your Craft Today.</h2>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
            Join thousands of young creators building the future with their own hands.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => startRegister('cta')}
              className="px-10 py-4 rounded-full bg-white text-emerald-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Join EduCraft Free
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 font-bold text-lg transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <Hammer size={24} className="text-emerald-500" />
              <span className="text-2xl font-bold">EduCraft</span>
            </div>
            <p className="max-w-sm mb-8">
              Empowering the next generation with practical skills, creativity, and the confidence to build their own future.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition cursor-pointer"><Mail size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition cursor-pointer"><Phone size={18} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Learn</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-emerald-400 transition">Coding & Tech</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Handiwork</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Arts & Design</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Life Skills</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
              <li><button onClick={() => setShowContactModal(true)} className="hover:text-emerald-400 transition">Contact</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-sm">
          © {new Date().getFullYear()} EduCraft Systems. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)} title="Welcome Back">
        <div className="space-y-4">
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <button onClick={() => startLogin('modal')} className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">Log In</button>
        </div>
      </Modal>

      <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Join EduCraft">
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <button onClick={() => startRegister('modal')} className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">Create Account</button>
        </div>
      </Modal>

      <Modal show={showContactModal} onClose={() => setShowContactModal(false)} title="Get in Touch">
        <div className="space-y-4">
          <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <button className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">Send Message</button>
        </div>
      </Modal>

    </div>
  )
}
