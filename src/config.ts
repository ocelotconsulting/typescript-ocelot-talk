export type Config = Readonly<{
  serverUri: string
}>

const config: Config = {
  serverUri: 'http://localhost:3020'
}

export default config
