function helloWorld (name: string, age: number): string {
  const canVote = age >= 18
  return `${name} is ${age} years old and ${canVote ? 'can' : 'cannot'} vote`
}

// won't compile
// helloWorld("Alice")
// helloWorld("Alice", "33")

let s = 'hello'
// neither one of these compile
// s = null
// s = undefined

type Args = Readonly<{
  orderId: number
  companyId: number
  pickupDate?: Date
}>

const log = ({ orderId, companyId }: Args) => {
  console.log(`order ${orderId} company ${companyId}`)
}

// roughly equivalent
interface Args2 {
  readonly orderId: number
  readonly companyId: number
  readonly pickupDate: Date | undefined
}

type Order = Readonly<{
  orderId: number
  companyId: number
}>

// also equivalent
type Args3 = Order & { readonly pickupDate?: Date }

// types can be composed from classes
type ErrorWithStatusCode = Error & { readonly statusCode: number }

const errorWithStatus = (message: string,
                         statusCode: number): ErrorWithStatusCode => {
  // easiest thing to do here is go into 'dynamic mode'
  let error: any = new Error(message)
  error.statusCode = statusCode
  return error as ErrorWithStatusCode
}

type JobStatus = 'success' | 'failure' | 'aborted'

// @ts-ignore
const status: JobStatus = 'foo' // won't typecheck - not one of the values

// what if we want these values at runtime?
const jobStatusValues: ReadonlyArray<string> = [
  'success',
  'failure',
  'aborted'
]

type JobStatus2 = typeof jobStatusValues[number]

function formatDate (date: Date | number): string {
  if (date instanceof Date) {
    // typechecker knows it's a Date now
    return date.toISOString()
  } else {
    return new Date(date).toISOString()
  }
}

type Order2 = Args3 & { readonly dropoffDate?: Date }

const logOrder2 = (order: Order2) => {
  if (order.pickupDate) {
    // i know that an order with a pickup date has to have a dropoff date
    // so I'll add a type assertion
    console.log(`order was picked up ${formatDate(order.pickupDate)} ` +
      `and dropped off ${formatDate(order.dropoffDate!)}`)
  }
}

// type inference
const order = {
  orderId: 11,
  companyId: 42,
  pickupDate: new Date
}

// equivalent except that pickupDate is required
type Args4 = Readonly<typeof order>
// Readonly<{ companyId: number; orderId: number; pickupDate: Date }>

type Address = Readonly<{
  street: string
  city: string
  stateCode: string
  zipCode: string
}>

type Contacts = Readonly<{
  [name: string]: Address
}>

const contacts: Contacts = {
  Alice: {
    street: '123 Fake Street',
    city: 'Springfield',
    stateCode: 'MO',
    zipCode: '66234'
  }
}

type EventHandler = (event: Event) => void

