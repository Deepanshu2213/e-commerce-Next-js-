export default function checkoutLoader() {
  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800 p-6 h-fit sticky top-4 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-32 mb-4"></div>

      <div className="space-y-3 mb-4 pb-4 border-b border-slate-800">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-700 rounded w-20"></div>
          <div className="h-4 bg-slate-700 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-slate-700 rounded w-16"></div>
          <div className="h-4 bg-slate-700 rounded w-16"></div>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <div className="h-6 bg-slate-700 rounded w-16"></div>
        <div className="h-8 bg-slate-700 rounded w-24"></div>
      </div>

      <div className="w-full h-12 bg-slate-700 rounded-lg"></div>
    </div>
  );
}
