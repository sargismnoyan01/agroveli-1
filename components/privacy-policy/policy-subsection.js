import { PolicyList } from './policy-list'

export function PolicySubsection({ number, title, items }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-foreground sm:text-base">
        {number} {title}
      </h3>
      <PolicyList items={items} />
    </div>
  )
}
