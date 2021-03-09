import agent from 'superagent'
import config from './config'

const rawGet = (path: string) => agent.get(`${config.serverUri}/${path}`)

const getJson = async (path: string): Promise<any> => {
  const { body } = await rawGet(path)
  return body
}

const getText = async (path: string): Promise<string> => {
  const { text } = await rawGet(path)
  return text
}

export default {
  getJson,
  getText
}
