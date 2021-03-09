// require() not import
const Geotab = require('@freightscience/geotab')

export type GeotabDevice = Readonly<{
  brand: string
  deviceId: string
  serialNumber: string
  active: boolean
  name: string
}>

export type GeotabClient = Readonly<{
  getDeviceByVIN: (vin: string) => GeotabDevice | undefined
}>

let instance: GeotabClient

export default (): GeotabClient => {
  if (!instance) {
    instance = Geotab({ user: 'alice' })
  }
  return instance
}
