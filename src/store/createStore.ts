import { applyMiddleware, combineReducers, createStore, Middleware, Store } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import rootSaga from './rootSaga'
import createMiddleware from './createMiddleware'
import slidesReducer from '../slides/slidesReducer'
import { Action, State } from './types'

export default (history: History): Store<State, Action> => {
  const middleware = createMiddleware(history)
  const middlewareArray = Object.values(middleware) as Middleware[]
  const rootReducer = combineReducers({
    slides: slidesReducer,
    router: connectRouter(history),
    history: (() => history)
  })
  const store = createStore(rootReducer, applyMiddleware(...middlewareArray))
  middleware.saga.run(rootSaga)
  return store as any as Store<State, Action>
}
