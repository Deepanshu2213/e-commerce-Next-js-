'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { ErrorPopupWrapper } from './errorPopup';
import { GetErrorElements } from '../utility/responseUtils';

interface LoginSignUpProps {
  type: 'login' | 'signup';
  url?: string;
  action: (
    prevState: any,
    formData: FormData,
  ) => Promise<{
    errors: Record<string, string[] | undefined>;
  }>;
}
export const LoginSignUp = ({ type, action, url }: LoginSignUpProps) => {
  const [state, dispatch, loading] = useActionState(action, { errors: {} });
  const { errors } = state;
  const getButtonSubmitText = () => {
    if (loading) return 'Processing...';
    else if (type === 'login') return 'Login';
    else return 'Sign Up';
  };
  return (
    <div className="relative flex items-center justify-center min-h-[100dvh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-slate-100 overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none select-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none select-none"></div>

      <div className="relative z-10 w-full max-w-md border border-slate-700/50 rounded-3xl bg-slate-900/60 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)] text-slate-100 flex flex-col items-center gap-6 p-8 transition-all duration-500 animate-[fadeInUp_0.6s_ease-out]">
        <div className="text-center mt-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-clip-text text-transparent mb-3 tracking-tight">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-slate-400 font-medium tracking-wide">
            {type === 'login' ? 'Please enter your details to login' : 'Sign up to get started'}
          </p>
        </div>
        <a href={url || '/login'} className='w-full justify-items-center'>
          <button
            type="button"
            className="w-full max-w-[85%] p-3 border border-slate-700/60 rounded-xl text-slate-100 bg-slate-800/50 hover:bg-slate-700/60 hover:border-slate-500/80 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98] transition-all duration-300 font-semibold flex items-center justify-center gap-3 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:scale-110 duration-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </a>

        <div className="flex items-center w-full max-w-[85%]">
          <div className="flex-1 border-b border-slate-700/60"></div>
          <p className="mx-4 text-xs tracking-wider text-slate-500 uppercase font-semibold">
            Or continue with email
          </p>
          <div className="flex-1 border-b border-slate-700/60"></div>
        </div>

        <form className="flex flex-col w-full max-w-[85%] gap-5" action={dispatch}>
          {type === 'signup' && (
            <div className="w-full group">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-slate-900/80 hover:border-slate-500/80 shadow-sm"
                required
              />
            </div>
          )}
          {type === 'signup' && (
            <div className="w-full group">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-slate-900/80 hover:border-slate-500/80 shadow-sm"
                required
              />
            </div>
          )}

          <div className="w-full group">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-slate-900/80 hover:border-slate-500/80 shadow-sm"
              required
            />
            {GetErrorElements('email', errors)}
          </div>

          <div className="w-full group">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-slate-700/60 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-slate-900/80 hover:border-slate-500/80 shadow-sm"
              required
            />
            {GetErrorElements('password', errors)}
          </div>

          <div className="w-full flex justify-between items-center my-1">
            <label className="flex items-center gap-2 cursor-pointer group/cb">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer w-4 h-4 appearance-none border border-slate-600 rounded bg-slate-900/50 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-1 focus:ring-offset-slate-900 cursor-pointer transition-all duration-200"
                  name="remember"
                  value={1}
                />
                <svg className="absolute w-3 h-3 text-white left-[2px] top-[2px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover/cb:text-white transition-colors">
                Remember me
              </span>
            </label>
            <Link
              className="text-sm text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline transition-all duration-200 font-semibold"
              href={type != 'signup' ? '/forgot' : '/'}
            >
              {type != 'signup' ? 'Forgot password?' : 'Login'}
            </Link>
          </div>

          <button
            className="w-full mt-2 p-3.5 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-[0.98] cursor-pointer font-bold text-base transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {getButtonSubmitText()}
          </button>
        </form>

        {type !== 'signup' && (
          <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline transition-all duration-200 font-bold ml-1"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
      {Object.keys(errors).length > 0 && <ErrorPopupWrapper error={errors} />}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
};
