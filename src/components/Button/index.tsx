export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center justify-center py-3 px-4 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-lg hover:bg-neutral-200/60 transition-colors"
    >
      {children}
    </button>
  )
}
