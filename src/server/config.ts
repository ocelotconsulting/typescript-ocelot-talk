export type Config = Readonly<{
  originWhitelist: ReadonlyArray<RegExp>
}>

const config: Config = {
  originWhitelist: [
    /^http:\/\/localhost:\d+$/
  ]
}

export default config
