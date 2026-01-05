import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '../../supabase_client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '@/components/logo';
import { loaderStore } from '@/stores/genericStores';

const SIDE_IMAGE = "https://plus.unsplash.com/premium_vector-1749475100852-1a781a57ca31?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function AuthPage() {
  const is_login = useSearchParams()[0].get('mode') !== 'register';
  const [isLogin, setIsLogin] = useState(is_login);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(is_login);
  }, [is_login]);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleAuth = async () => {
    try {
      loaderStore.show("Redirecting to Google...");
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      loaderStore.hide();
    }
  };

  const handleEmailAuth = async () => {
    loaderStore.show("Please wait...");
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        if (password !== confirmPassword) throw new Error('Passwords do not match');
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, avatar_url: '' } }
        }).then(() => {
          navigate('/')
        }).catch((err) => {
          throw err;
        });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      loaderStore.hide();
    }
  };

  const toggleMode = () => {
    navigate(isLogin ? '/auth?mode=register' : '/auth?mode=login');
    setError('');
    setSuccess('');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      {/* LEFT PANEL: Testimonial & Branding */}
      <div 
        className="hidden lg:flex lg:w-[40%] relative bg-cover bg-center p-12 flex-col justify-between overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${SIDE_IMAGE})` }}
      >
        <div className="relative z-10 flex items-center gap-2 text-white font-bold text-2xl">
          <Logo />
          UniQuad
        </div>

        <div className="relative z-10 text-white max-w-sm">
          <h2 className="text-3xl font-semibold leading-tight mb-6">
            “Simply all the connections you need for your life.”
          </h2>
          <div>
            <p className="font-bold text-lg">Vincent Kioko</p>
            <p className="text-white/70 text-sm italic">CEO and Co-Founder.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className='sm:hidden'>
              <Logo scale={2} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {isLogin ? <span>Welcome back to <span className="text-orange-500">UniQuad</span></span> : 'Create your account'}
            </h1>
            <p className="text-slate-500 text-sm">
              {isLogin 
                ? 'Welcome back to Your Community.' 
                : 'Join your valued community today.'}
            </p>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm text-center font-medium">
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-sm flex items-center justify-center gap-2 font-medium">
                <CheckCircle size={16} /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-slate-400 group-focus-within:text-orange-600 transition-colors">Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all placeholder:text-slate-300"
                  placeholder="Alex Jordan"
                />
              </div>
            )}

            <div className="relative group">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-slate-400 group-focus-within:text-orange-600 transition-colors">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all placeholder:text-slate-300"
                placeholder="alex.jordan@gmail.com"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-slate-400 group-focus-within:text-orange-600 transition-colors">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all placeholder:text-slate-300"
                placeholder="••••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative group">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-slate-400 group-focus-within:text-orange-600 transition-colors">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all"
                  placeholder="••••••••••"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex flex-col gap-3 pt-1">
                <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 w-fit">
                  Forgot password?
                </button>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Remember sign in details</span>
                  <button 
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${rememberMe ? 'bg-orange-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${rememberMe ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleEmailAuth}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all mt-4 active:scale-[0.98]"
            >
              {isLogin ? 'Log in' : 'Create account'}
            </button>

            {/* OR Divider */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-semibold tracking-widest">OR</span>
              </div>
            </div>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleAuth}
              className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              </svg>
              {isLogin ? 'Continue with Google' : 'Sign up with Google'}
            </button>
          </div>

          {/* Footer Switcher */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : "Have an account? "}
              <button
                onClick={toggleMode}
                className="text-orange-600 font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}