import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import errorMiddleware from './errorMiddleware'
import config from './config'
import getSlides from './getSlides'
import getSingleSlide from './getSingleSlide'

const app = express()

app.use(cors({ origin: [...config.originWhitelist] }))

app.get('/slides/:name', getSingleSlide)
app.get('/slides', getSlides)
app.use(express.static(`${__dirname}/public`))
app.use(errorMiddleware)

// send 404s as json, not html
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Cannot ${req.method.toUpperCase()} ${req.path}`
  })
})

export default app
