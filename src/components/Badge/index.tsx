interface BadgeProps {
  children: React.ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="flex items-center gap-2 px-2 py-1 text-xs bg-neutral-100/60 border-1 border-neutral-600/10 rounded-lg backdrop-blur">
      {children}
    </span>
  )
}
