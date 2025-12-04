

import { useState } from 'react'
import {
  Menu,
  Hammer,
  LogOut,
  User,
  LayoutDashboard,
  Settings
} from 'lucide-react'
import { useFusionAuth } from '@fusionauth/react-sdk'
import { useNavigate, Link } from 'react-router-dom'
import { useUserInfo } from '@/hooks/useUserInfo'

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { startLogin, startRegister, isLoggedIn, startLogout } = useFusionAuth()
    const navigate = useNavigate();
    const { user } = useUserInfo();

    const displayName = user?.fullName || 'Student';
    const userAvatar = user?.avatar;
    
  return (
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 dark:bg-slate-950/70 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
                navigate('/')
                setMobileMenuOpen(false)
            }}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Hammer size={20} className="fill-white/20" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">EduCraft</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">Skills for Life</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {!isLoggedIn && ['About', 'Catalog', 'Projects', 'Community'].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Auth / User Profile */}
            <div className="hidden md:flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        
                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors">
                            <LayoutDashboard size={16} className="text-slate-600 dark:text-slate-300" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dashboard</span>
                        </Link>
                        <Link to="/settings" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors">
                            <Settings size={16} className="text-slate-600 dark:text-slate-300" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Settings</span>
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors">
                            <User size={16} className="text-slate-600 dark:text-slate-300" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Profile</span>
                        </Link>
                        
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-white/10">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-emerald-500/20">
                                {userAvatar ? (
                                    <img src={userAvatar} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => startLogout()}
                                className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                                title="Log Out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen((prev) => !prev)}>
              <Menu />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 p-4 space-y-4 shadow-2xl animate-in slide-in-from-top-5">
            {!isLoggedIn &&['About', 'Catalogue', 'Projects', 'Community'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                {isLoggedIn ? (
                    <>
                        <div className="flex items-center gap-3 px-4 py-2">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
                                {userAvatar ? (
                                    <img src={userAvatar} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User size={20} className="m-auto mt-2 text-slate-400" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{displayName}</p>
                                <p className="text-xs text-slate-500">Learner</p>
                            </div>
                        </div>
                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            <LayoutDashboard size={18} />Dashboard
                        </Link>
                        <Link to="/settings" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            <Settings size={18} />Settings
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            <User size={18} />Profile
                        </Link>
                        <button 
                            onClick={() => startLogout()} 
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 font-medium transition-colors"
                        >
                            <LogOut size={18} /> Log Out
                        </button>
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => startLogin('mobile')} className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-semibold">
                            Log in
                        </button>
                        <button onClick={() => startRegister('mobile')} className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/20">
                            Sign up
                        </button>
                    </div>
                )}
            </div>
          </div>
        )}
      </nav>
    
  )
}

export default Navbar


