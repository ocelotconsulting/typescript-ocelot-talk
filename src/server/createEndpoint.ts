import { NextFunction, Request, Response } from 'express'

export default (fn: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res)
    } catch (error) {
      next(error)
    }
  }
