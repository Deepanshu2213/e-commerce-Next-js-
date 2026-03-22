export default function cartLoader() {
  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800 space-y-4 p-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="flex gap-4">
            <div className="h-24 w-24 bg-slate-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
