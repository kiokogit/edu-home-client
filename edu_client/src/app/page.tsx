'use client';
import { useState } from 'react';
import { BookOpen, Video, Calendar, Code, Shield, TrendingUp, Users, Wifi, Globe, MessageSquare, Check, X, Menu, Mail, Phone, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LMSLandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  }

  const features = [
    { icon: Video, title: "One-on-One Sessions", desc: "Personal attention with live video tutoring" },
    { icon: Shield, title: "Secure & Private", desc: "End-to-end encrypted streaming and payments" },
    { icon: Calendar, title: "Smart Scheduling", desc: "Integrated calendar for seamless lesson planning" },
    { icon: Code, title: "Interactive Sandboxes", desc: "Practice coding in real-time environments" },
    { icon: TrendingUp, title: "Progress Tracking", desc: "Monitor growth with detailed analytics" },
    { icon: Wifi, title: "Low Data Optimized", desc: "Works perfectly on slow connections" },
    { icon: Globe, title: "Multiple Curriculums", desc: "CBC, ACE, GCSE, and more available" },
    { icon: MessageSquare, title: "Student Community", desc: "Class walls for collaborative learning" }
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: "Starter",
      price: "$5",
      period: "one-time",
      features: ["1 month access", "All core features", "Community access", "Email support"],
      cta: "Get Started",
      highlight: false
    },
    {
      id: 'monthly',
      name: "Monthly",
      price: "$25",
      period: "per month",
      features: ["Full platform access", "Unlimited sessions", "Priority support", "All curriculums", "Progress reports"],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      id: 'annual',
      name: "Annual",
      price: "$250",
      period: "per year",
      savings: "Save $50",
      features: ["Everything in Monthly", "2 months free", "Premium support", "Early feature access", "Custom schedules"],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      id: 'lifetime',
      name: "Lifetime",
      price: "$1,000",
      period: "one-time",
      features: ["Lifetime access", "All future updates", "VIP support", "Exclusive content", "Custom integrations"],
      cta: "Start Free Trial",
      highlight: false
    }
  ];

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative animate-fadeIn border border-gray-200" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .hover-lift { transition: transform 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); }
        
        /* Dark mode scrollbar */
        @media (prefers-color-scheme: dark) {
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #1f2937;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #4b5563;
            border-radius: 6px;
            border: 3px solid #1f2937;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="text-green-600 dark:text-green-400 mr-2" size={32} />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">MyPath</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">Pricing</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">About</a>
              <button onClick={() => setShowLoginModal(true)} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition">Register</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fadeIn">
              <a href="#features" className="block py-2 text-gray-600 hover:text-green-600">Features</a>
              <a href="#pricing" className="block py-2 text-gray-600 hover:text-green-600">Pricing</a>
              <a href="#about" className="block py-2 text-gray-600 hover:text-green-600">About</a>
              <button onClick={() => setShowLoginModal(true)} className="block w-full text-left py-2 text-gray-600">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="block w-full text-left py-2 text-green-600 font-semibold">Register</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideUp text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Adaptive Education Without Borders
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Professional remote teaching platform designed for Africa and beyond. Learn from home with personalized instruction, even on low-bandwidth connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setShowRegisterModal(true)} className="bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition hover-lift">
                Start Free Trial - No Credit Card
              </button>
              <button onClick={() => setShowContactModal(true)} className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 dark:hover:bg-gray-700 transition hover-lift">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-float">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="Students learning online"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Powerful Features for Remote Learning</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Everything you need to teach and learn effectively, anywhere in the world</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-700/50 transition hover-lift">
                <feature.icon className="text-green-600 dark:text-green-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Your Curriculum, Your Choice</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We support multiple international curricula to meet your educational needs wherever you are
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Curriculum List */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 border border-gray-100 dark:border-gray-700">
              <div className="space-y-4">
                {[
                  { name: "CBC", full: "Competency Based Curriculum", icon: "🇰🇪" },
                  { name: "ACE", full: "Accelerated Christian Education", icon: "📖" },
                  { name: "GCSE", full: "General Certificate of Secondary Education", icon: "🇬🇧" },
                  { name: "Cambridge International", full: "Globally Recognized", icon: "🎓" },
                  { name: "American Curriculum", full: "US Standards", icon: "🇺🇸" },
                  { name: "Custom Homeschool", full: "Personalized Learning", icon: "🏠" }
                ].map((curr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-4 rounded-lg bg-transparent border border-green-100 dark:border-green-800 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="text-3xl mr-4">{curr.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                        <span className="font-bold text-gray-900 dark:text-white">{curr.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{curr.full}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 p-8 rounded-2xl border border-gray-200 text-white">
                <Globe className="mb-4 animate-float" size={56} />
                <h3 className="text-2xl font-bold mb-3">Learn from Anywhere</h3>
                <p className="text-green-50">
                  Optimized for low-bandwidth environments. Quality education reaches the remotest parts of Africa and beyond.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 border border-gray-100 dark:border-gray-700">
                <BookOpen className="text-green-600 dark:text-green-400 mb-4" size={56} />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Flexible Learning Paths</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Switch between curricula seamlessly or combine multiple approaches to create the perfect educational journey.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 border border-gray-100 dark:border-gray-700">
                <Award className="text-green-600 dark:text-green-400 mb-4" size={56} />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Certified Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All our curricula are delivered by qualified educators with proven track records in their respective systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">All plans include a free trial - no credit card required</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`rounded-xl p-6 border border-gray-200 ${plan.highlight
                  ? 'bg-green-600 dark:bg-green-500 text-white shadow-2xl scale-105'
                  : 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                } hover-lift relative`}>
                {plan.savings && (
                  <div className="absolute -top-4 right-4 bg-yellow-400 dark:bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {plan.savings}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight
                      ? 'text-green-100'
                      : 'text-gray-500 dark:text-gray-400'
                    }`}> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <Check className={`mr-2 flex-shrink-0 ${plan.highlight
                          ? 'text-green-200'
                          : 'text-green-600 dark:text-green-400'
                        }`} size={20} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className={`w-full py-3 rounded-lg font-semibold transition ${plan.highlight
                      ? 'bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600'
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Mission Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Championing Education for All</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-200">
            We believe quality education should reach every corner of the world, especially Africa. Our platform is built with professionalism, monitored for safety, and optimized for accessibility.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-white/10 p-6 rounded-lg border border-gray-200 dark:backdrop-blur">
              <Shield className="mx-auto mb-4 text-green-600 dark:text-green-400" size={48} />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Professional & Monitored</h3>
              <p className="text-gray-600 dark:text-gray-200">All sessions are secure, private, and monitored for quality assurance</p>
            </div>
            <div className="bg-white dark:bg-white/10 p-6 rounded-lg border border-gray-200 dark:backdrop-blur">
              <Users className="mx-auto mb-4 text-green-600 dark:text-green-400" size={48} />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Community Learning</h3>
              <p className="text-gray-600 dark:text-gray-200">Student walls enable peer collaboration and knowledge sharing</p>
            </div>
            <div className="bg-white dark:bg-white/10 p-6 rounded-lg border border-gray-200 dark:backdrop-blur">
              <Wifi className="mx-auto mb-4 text-green-600 dark:text-green-400" size={48} />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Low-Data Friendly</h3>
              <p className="text-gray-600 dark:text-gray-200">Engineered to work perfectly on mobile devices with limited connectivity</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-8 text-green-50">Join thousands of students and teachers already using MyPath</p>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition hover-lift border border-gray-200"
          >
            Start Your Free Trial Today
          </button>
          <p className="mt-4 text-green-50">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 dark:text-gray-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="text-green-600 dark:text-green-500 mr-2" size={28} />
                <span className="text-xl font-bold text-white dark:text-gray-200">MyPath</span>
              </div>
              <p className="text-sm">Empowering education across Africa and beyond with professional remote teaching solutions.</p>
            </div>
            <div>
              <h4 className="text-white dark:text-gray-200 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-green-400 dark:hover:text-green-500 transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-green-400 dark:hover:text-green-500 transition">Pricing</a></li>
                <li><a href="#about" className="hover:text-green-400 dark:hover:text-green-500 transition">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white dark:text-gray-200 font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-green-400 dark:text-green-500" />
                  <span className="hover:text-green-400 dark:hover:text-green-500">0703618918</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-green-400 dark:text-green-500" />
                  <button onClick={() => setShowContactModal(true)} className="hover:text-green-400 dark:hover:text-green-500 transition">Contact Form</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-sm">
            <p>&copy; 2024 MyPath. All rights reserved. Built for educators, by educators.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)} title="Login to MyPath">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <button onClick={() => handleLogin()} className="w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition">
            Login
          </button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <button onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }} className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-500">Register</button>
          </p>
        </div>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Create Your Account">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">I am a...</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent">
              <option>Student</option>
              <option>Teacher</option>
              <option>Parent</option>
            </select>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Start Free Trial
          </button>
          <p className="text-xs text-center text-gray-500">No credit card required • Free trial on all plans</p>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal show={showContactModal} onClose={() => setShowContactModal(false)} title="Get in Touch">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="0703618918" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Send Message
          </button>
          <p className="text-sm text-center text-gray-600">Or call us directly at <span className="font-semibold text-green-600">0703618918</span></p>
        </div>
      </Modal>
    </div>
  );
}