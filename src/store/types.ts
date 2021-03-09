import { History } from 'history'
import { Action as ReduxAction, Dispatch } from 'redux'
import { SlidesState } from '../slides/types'
import { SlideActionType } from '../slides/types'
import { RouterState } from 'connected-react-router'

export const unknownAction = 'unknown'

export const locationChangeAction = '@@router/LOCATION_CHANGE'

export type ActionType = SlideActionType | typeof unknownAction | typeof locationChangeAction

export type State = Readonly<{
  slides: SlidesState
  router: RouterState
  history: History
}>

export type Action = ReduxAction<ActionType> & Readonly<{
  payload?: any
}>

export type DefaultDispatchProps = Readonly<{
  dispatch: Dispatch<Action>
  push: (path: string) => void
}>
