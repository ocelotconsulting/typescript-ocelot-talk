import { all } from 'redux-saga/effects'
import slidesSagas from '../slides/slidesSagas'

export default function * rootSaga () {
  yield all([
    ...slidesSagas()
  ])
}
