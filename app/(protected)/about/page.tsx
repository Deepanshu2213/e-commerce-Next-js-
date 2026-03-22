'use client';

import { useActionState } from 'react';
import { sendContactEmail } from '../../actions/contact.action';
import { GetErrorElements } from '../../utility/responseUtils';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiUser,
  FiMessageSquare,
  FiSend,
} from 'react-icons/fi';

const CONTACT_LINKS = [
  {
    icon: <FiMail className="w-6 h-6" />,
    label: 'Email',
    value: 'deepanshuhead200@gmail.com',
    href: 'mailto:deepanshuhead200@gmail.com',
    color: 'from-rose-500 to-pink-600',
    ring: 'hover:ring-rose-500/40',
  },
  {
    icon: <FiGithub className="w-6 h-6" />,
    label: 'GitHub',
    value: 'Deepanshu2213',
    href: 'https://github.com/Deepanshu2213',
    color: 'from-slate-500 to-slate-700',
    ring: 'hover:ring-slate-400/40',
  },
  {
    icon: <FiLinkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    value: 'Deepanshu Saxena',
    href: 'https://www.linkedin.com/in/deepanshu-saxena-2929921a3/',
    color: 'from-blue-500 to-blue-700',
    ring: 'hover:ring-blue-500/40',
  },
];

export default function AboutPage() {
  const [state, dispatch, loading] = useActionState(sendContactEmail, { errors: {} });
  const { errors } = state as { errors: Record<string, string[] | undefined>; success?: boolean };

  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* ── Hero ── */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-2xl shadow-indigo-500/30 mb-2 text-4xl font-extrabold text-white select-none">
            D
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Deepashu
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Full-stack developer passionate about building clean, user-friendly web experiences.
            Always open to new opportunities and collaborations.
          </p>
        </section>

        {/* ── Contact Cards ── */}
        <section>
          <h2 className="text-xl font-bold text-slate-300 mb-6 text-center tracking-wide uppercase text-sm">
            Find me on
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-5 bg-slate-900/80 border border-slate-700/50 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ring-2 ring-transparent ${link.ring}`}
              >
                <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${link.color} text-white shadow-lg`}>
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-slate-200 font-medium text-sm truncate group-hover:text-white transition-colors">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Contact Form ── */}
        <section>
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                Send a Message
              </h2>
              <p className="text-slate-400 text-sm">
                Fill in the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Global success / error banner */}
            {(state as any).success && (
              <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-emerald-400 text-sm">
                <FiSend className="flex-shrink-0 w-4 h-4" />
                Message sent successfully! I'll reply to your email soon.
              </div>
            )}
            {errors._form && (
              <div className="mb-6 px-4 py-3 bg-red-900/40 border border-red-700/50 rounded-xl">
                {GetErrorElements('_form', errors)}
              </div>
            )}

            <form action={dispatch} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FiUser className="text-indigo-400" /> Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
                {GetErrorElements('name', errors)}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FiMail className="text-cyan-400" /> Your Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. jane@example.com"
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-600"
                />
                {GetErrorElements('email', errors)}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FiMessageSquare className="text-pink-400" /> Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-slate-600 resize-none"
                />
                {GetErrorElements('message', errors)}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-indigo-500/20 disabled:shadow-none border border-transparent disabled:border-slate-700"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
