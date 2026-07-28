export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted/80 ${className}`}
      aria-hidden
    />
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen pt-32 pb-10 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between mb-8">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-28 md:h-40 w-full max-w-xl" />
            <Skeleton className="h-28 md:h-40 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-44 rounded-full" />
              <Skeleton className="h-14 w-40 rounded-full" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Skeleton className="h-125 lg:h-160 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorksSkeleton() {
  return (
    <section className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px] space-y-12">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-20 w-80" />
        <div className="grid grid-cols-12 gap-4">
          <Skeleton className="col-span-12 md:col-span-7 h-80 rounded-2xl" />
          <Skeleton className="col-span-12 md:col-span-5 h-80 rounded-2xl" />
          <Skeleton className="col-span-12 md:col-span-5 h-80 rounded-2xl" />
          <Skeleton className="col-span-12 md:col-span-7 h-80 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export function JournalSkeleton({ count = 3 }) {
  return (
    <section className="relative py-32 px-6 md:px-10 bg-secondary/30">
      <div className="mx-auto max-w-[1600px] space-y-12">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-72" />
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-2xl ${
                i === 0
                  ? "col-span-12 md:col-span-8 h-105"
                  : "col-span-12 md:col-span-4 h-80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamSkeleton() {
  return (
    <section className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px] space-y-12">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-20 w-96" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border rounded-2xl overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-background p-8 space-y-6">
              <Skeleton className="h-50 w-40" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSkeleton() {
  return (
    <section className="relative py-32 px-6 md:px-10 bg-secondary/30">
      <div className="mx-auto max-w-[1600px] space-y-12">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-20 w-80" />
        <Skeleton className="h-72 w-full rounded-4xl" />
      </div>
    </section>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 px-6 md:px-10 pt-24 pb-16">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-16 w-80 max-w-full" />
      <Skeleton className="h-6 w-full max-w-xl" />
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-background px-6 md:px-10 py-28">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-full max-w-3xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="space-y-4 max-w-3xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export function ArchiveSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeaderSkeleton />
      <div className="px-6 md:px-10 py-8 border-y border-border">
        <div className="mx-auto max-w-[1600px] flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div className="px-6 md:px-10 py-10 mx-auto max-w-[1600px] space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}

export function AdminTableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="bg-white/5 px-4 py-3">
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="divide-y divide-white/10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-12 w-16" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-8 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RouteFallback() {
  return (
    <div className="min-h-screen bg-background px-6 py-28">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-72 max-w-full" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}
