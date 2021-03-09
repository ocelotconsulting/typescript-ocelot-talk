import fetch from 'node-fetch'

type Result = Readonly<{
  orderId: number
  companyId: number
  pickupDate: Date
}>

const url = 'http://localhost:1234/orders'

const getOrders = async (): Promise<ReadonlyArray<Result>> => {
  const request = await fetch(url)
  if (request.status === 200) {
    // noinspection UnnecessaryLocalVariableJS
    const jsonObject: any = await request.json()
    // can't typecheck json at compile time so we're basically JS now
    return jsonObject
  } else {
    throw new Error(`GET ${url} responded with status ${request.status} ${request.statusText}`)
  }
}
