'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { MdLocalMall } from 'react-icons/md';
import { logout } from '../actions/logins.action';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Add Product', href: '/add-product' },
    // { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${true
      ? 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/40 shadow-2xl shadow-black/50 py-1'
      : 'bg-slate-950/20 border-b border-transparent py-2'
      }`}>
      {/* Top Gradient Accent Line (subtle) */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 transition-opacity duration-500 ${true ? 'opacity-40' : 'opacity-100'}`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-3 text-3xl font-black tracking-tight"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-shadow duration-300">
                <MdLocalMall className="text-white text-2xl" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm group-hover:text-white transition-colors">
                Shop<span className="text-indigo-400 font-medium">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-slate-300 font-medium text-sm rounded-full hover:text-white transition-colors duration-300 group overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover Pill Background */}
                <div className="absolute inset-0 bg-slate-800/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full"></div>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            {/* <button
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-indigo-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group"
              aria-label="Search"
              type="button"
            >
              <FaSearch className="text-lg group-hover:scale-110 transition-transform" />
            </button> */}

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-indigo-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="text-lg group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full border-2 border-slate-950 shadow-md transform group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Icon */}
            <Link
              href="/account"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-indigo-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group"
              aria-label="User account"
            >
              <FaUserCircle className="text-xl group-hover:scale-110 transition-transform" />
            </Link>

            {/* Logout Icon Desktop */}
            <form action={logout}>
              <button
                type="submit"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all duration-300 group"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-xl group-hover:scale-110 transition-transform" />
              </button>
            </form>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 border border-slate-700/50"
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? (
                <FaTimes className="text-xl animate-in spin-in-90 duration-300" />
              ) : (
                <FaBars className="text-xl animate-in spin-in-[-90deg] duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-800/80">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl font-medium text-sm transition-all duration-200 flex items-center border border-transparent hover:border-slate-700/50 hover:pl-6"
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 mt-4 px-2">
              <Link
                href="/account"
                className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors text-sm border border-slate-700/50"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle className="text-lg" /> Profile
              </Link>
              <form action={logout} className="contents">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-xl font-medium transition-colors text-sm border border-rose-500/20 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignOutAlt className="text-lg" /> Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
