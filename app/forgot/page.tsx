import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-slate-100">
      <div className="w-full max-w-md border border-slate-800 rounded-3xl bg-slate-900/80 backdrop-blur shadow-2xl text-slate-100 flex flex-col items-center gap-6 p-6 transition-all duration-300">
        <div className="text-center mt-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Forgot Password
          </h1>
          <p className="text-sm text-slate-300">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <form className="flex flex-col w-[85%] gap-5">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-slate-700 transition-all duration-200 outline-none bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 hover:border-slate-500"
              required
            />
          </div>

          <button
            className="w-full p-3 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 active:scale-[0.98] cursor-pointer font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            type="submit"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-2 text-sm text-slate-300">
          Remember your password?{' '}
          <Link
            href="/"
            className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline transition-colors font-medium"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
