
export function PolicyList({ items }) {
  return (
    <ul className="flex flex-col gap-1 pl-2" role="list">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-2 text-sm text-muted-foreground sm:text-base"
        >
          <span className="mt-[0.45rem] block h-[5px] w-[5px] flex-shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
