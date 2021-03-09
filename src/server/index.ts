import app from './app'
import process from 'process'
import util from 'util'
import 'prismjs'

const port = 3020

const start = async () => {
  const listen = util.promisify(app.listen).bind(app)

  await listen(port)
  console.log(`running http://localhost:${port}`)
}

start().catch(error => {
  console.error(error)
  process.exit(1)
})
