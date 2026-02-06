import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {/* Image */}
      <Skeleton className="h-40 w-full" />

      <div className="p-3 space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-3/4 mb-4" />

        {/* Price */}
        <Skeleton className="h-4 w-1/3 mb-4" />

        {/* Meta */}
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}
