import { Request, Response } from 'express'
import path from 'path'
import { readdir } from 'fs/promises'
import createEndpoint from './createEndpoint'

let slides: ReadonlyArray<string> | undefined = undefined

export const lazyInitSlides = async (): Promise<ReadonlyArray<string>> => {
  if (!slides) {
    const files = await readdir(`${__dirname}/slides`)
    slides = files.filter(_ => path.extname(_) === '.md').sort()
  }
  return slides
}

export default createEndpoint(async (_: Request, res: Response) => {
  res.json(await lazyInitSlides())
})
