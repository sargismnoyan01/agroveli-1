
export function PolicySection({ number, title, children }) {
  return (
    <section className="rounded-xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.12)] ">
      <div className="p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-foreground sm:text-base">
          {number}. {title}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {children}
        </div>
      </div>
    </section>
  )
}
