import { Action, locationChangeAction, unknownAction } from '../store/types'
import { slidesResetAnimate, SlidesState, slidesUpdateList, slidesUpdateOne } from './types'

const initialState: SlidesState = {
  list: [],
  html: [],
  animate: true
}

export const nullAction: Action = { type: unknownAction }

type UpdateOnePayload = Readonly<{
  index: number
  html: string
}>

const updateOne = (state: SlidesState, payload: UpdateOnePayload): SlidesState => {
  const html = [...state.html]
  html[payload.index] = payload.html
  return { ...state, html }
}

export default (state: SlidesState = initialState, action: Action = nullAction): SlidesState => {
  switch (action.type) {
    case slidesUpdateList:
      return {
        ...state,
        list: action.payload
      }
    case slidesUpdateOne:
      return updateOne(state, action.payload)
    case locationChangeAction:
      return {
        ...state,
        animate: true
      }
    case slidesResetAnimate:
      return {
        ...state,
        animate: false
      }
    default:
      return state
  }
}
