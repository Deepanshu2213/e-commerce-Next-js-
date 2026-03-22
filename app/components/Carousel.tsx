'use client';
import { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

export const Carousel = () => {
  const [curr, setSelection] = useState<number>(0);
  const [pause, setPaused] = useState<boolean>(false);
  const next = () => {
    setSelection((prev) => {
      if (prev === images.length - 1) return 0;
      return prev + 1;
    });
  };
  const prev = () => {
    setSelection((prev) => {
      if (prev === 0) return images.length - 1;
      return prev - 1;
    });
  };
  const pauseTransition = () => {
    setPaused(true);
  };
  const startTransition = () => {
    setPaused(false);
  };
  const images = [
    'https://picsum.photos/id/1015/600/400',
    'https://picsum.photos/id/1016/600/400',
    'https://picsum.photos/id/1025/600/400',
    'https://picsum.photos/id/1035/600/400',
  ];
  useEffect(() => {
    if (pause) return;
    let timer = setInterval(() => {
      setSelection((prev) => {
        if (prev === images.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [pause]);

  return (
    <div
      className="group relative w-full h-[50vh] overflow-hidden rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-950 border border-slate-800"
      onMouseEnter={pauseTransition}
      onMouseLeave={startTransition}
    >
      {images.map((src, idx) => {
        return (
          <div
            key={src}
            className="absolute top-0 left-0 w-full h-full z-[100]"
            style={{
              transform: `translateX(${(curr - idx) * 100}%)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <img
              src={src}
              alt={`Carousel image ${idx + 1} of ${images.length}`}
              className="w-full h-full object-fit select-none"
            />
            {/* Elegant premium gradient overlay for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );
      })}

      {/* Glassmorphic Left Navigation Control */}
      <button
        type="button"
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-[999] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none"
        onClick={next}
        aria-label="Previous image"
      >
        <GrFormPrevious className="text-2xl md:text-3xl drop-shadow-md" />
      </button>

      {/* Glassmorphic Right Navigation Control */}
      <button
        type="button"
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-[999] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none"
        onClick={prev}
        aria-label="Next image"
      >
        <MdNavigateNext className="text-3xl drop-shadow-md" />
      </button>

      {/* Centered Glassmorphic Indicator Pill */}
      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-[999] px-5 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
        aria-hidden
      >
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${i === curr
              ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]'
              : 'w-2 bg-white/40 hover:bg-white/70 hover:w-4'
              }`}
          />
        ))}
      </div>

      {/* Screen-reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {curr + 1} of {images.length}
      </div>
    </div>
  );
};
