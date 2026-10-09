export function PackageCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex h-full animate-pulse flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white">
      <div className="aspect-[4/3] bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-stone-200" />
        <div className="h-5 w-4/5 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-100" />
        <div className="h-4 w-2/3 rounded bg-stone-100" />
        <div className="h-6 w-1/3 rounded bg-stone-200 pt-4" />
      </div>
    </div>
  );
}
