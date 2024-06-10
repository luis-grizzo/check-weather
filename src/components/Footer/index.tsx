'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100/60 border-t-1 border-neutral-600/10">
      <p className="container mx-auto px-8 py-6 text-xs text-center">
        Developed by{' '}
        <a
          href="https://luisgrizzo.dev"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-400 transition-colors"
        >
          Luís Grizzo
        </a>
        {', '}
        <a
          href="https://github.com/luis-grizzo/check-weather?tab=MIT-1-ov-file"
          target="_blank"
          className="text-xs text-blue-600 hover:text-blue-400 transition-colors"
          rel="noreferrer"
        >
          MIT License
        </a>
        {', '}
        {currentYear}.
      </p>
    </footer>
  )
}
