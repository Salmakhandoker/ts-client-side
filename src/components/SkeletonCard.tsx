export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
      {/* Image container skeleton */}
      <div className="relative h-56 w-full bg-slate-200 shrink-0"></div>

      {/* Content skeleton */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Location skeleton */}
        <div className="h-3 w-1/4 bg-slate-200 rounded"></div>

        {/* Title skeleton */}
        <div className="h-5 w-3/4 bg-slate-200 rounded"></div>

        {/* Description lines */}
        <div className="space-y-2 flex-1">
          <div className="h-3.5 w-full bg-slate-200 rounded"></div>
          <div className="h-3.5 w-5/6 bg-slate-200 rounded"></div>
        </div>

        {/* Specs bar skeleton */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50 shrink-0">
          <div className="h-3 bg-slate-200 rounded col-span-1"></div>
          <div className="h-3 bg-slate-200 rounded col-span-1"></div>
          <div className="h-3 bg-slate-200 rounded col-span-1"></div>
        </div>

        {/* Footer info & CTA skeleton */}
        <div className="flex items-center justify-between pt-1 shrink-0">
          <div className="space-y-1">
            <div className="h-2.5 w-8 bg-slate-200 rounded"></div>
            <div className="h-5 w-20 bg-slate-200 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
