interface ILogError {
  alias: string
  path: string
  error: unknown
}

export function logError({ alias, path, error }: ILogError) {
  console.error(alias, path, error)
}
