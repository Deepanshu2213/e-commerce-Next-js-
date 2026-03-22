'use client';
import { useEffect, useState } from 'react';

export const ErrorPopup = ({
  error,
  onClose,
}: {
  error: Record<string, string[] | undefined>;
  onClose?: () => void;
}) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-slate-900/80 backdrop-blur text-slate-100 rounded-lg shadow-xl overflow-hidden border border-red-500/30 border-l-4 border-l-red-500">
        {/* Header with icon */}
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-2 text-red-400">
              Something went wrong
            </h3>
            <div className="space-y-1">
              {Object.entries(error).map(([key, value]) => {
                return value?.map((el, idx) => (
                  <p
                    key={key + idx}
                    className="text-sm text-slate-300 leading-relaxed"
                  >
                    • {key + ' field : ' + el}
                  </p>
                ));
              })}
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors p-1 -m-1"
            aria-label="Close error message"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-red-500"></div>
      </div>
    </div>
  );
};

export const ErrorPopupWrapper = ({
  error,
}: {
  error: Record<string, string[] | undefined>;
}) => {
  debugger;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!error || Object.keys(error).length === 0) return;
    setShowPopup(true);
    let timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="animate-out fade-out slide-out-to-top-2 duration-300"
      style={{
        animation: showPopup ? 'none' : 'fadeOut 0.3s ease-out forwards',
      }}
    >
      {showPopup && <ErrorPopup error={error} onClose={handleClose} />}
    </div>
  );
};
