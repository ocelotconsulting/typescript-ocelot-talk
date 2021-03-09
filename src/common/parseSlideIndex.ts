import { State } from '../store/types'

const pathRegex = /^\/slides\/(\d+)$/

export default ({ router, slides }: State): number | undefined => {
  const index = Number((pathRegex.exec(router.location.pathname) || [])[1])
  return Number.isInteger(index) && index >= 0 && index < slides.list.length ? index : undefined
}
