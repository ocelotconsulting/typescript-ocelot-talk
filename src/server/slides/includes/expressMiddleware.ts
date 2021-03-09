// these are just types - they will be erased by the compiler
// compiler did find any type definition files in the express
// package so it looked in @types/express
import { Request, Response, NextFunction } from 'express'
// this both a type and a runtime
import express from 'express'

const app = express()

const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    console.log(id)
    res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

app.get('/', middleware)
