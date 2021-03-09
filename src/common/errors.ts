export type ErrorWithStatus = Error & Readonly<{ statusCode: number }>

export const error = (message: string, statusCode: number): ErrorWithStatus => {
  const error = new Error(message) as any
  error.statusCode = statusCode
  return error
}

export const notFoundError = (message: string): ErrorWithStatus => error(message, 404)
