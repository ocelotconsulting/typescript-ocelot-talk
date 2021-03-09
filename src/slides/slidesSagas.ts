import { call, put, takeEvery, select } from 'redux-saga/effects'
import api from '../api'
import { slidesError, slidesGetList, slidesGetOne, slidesUpdateList, slidesUpdateOne } from './types'
import { Action, State } from '../store/types'

const putError = (error: Error) => put({ type: slidesError, payload: error })

type Gen = IterableIterator<any>

const selectSlideList = ({ slides }: State): ReadonlyArray<string> => slides.list

export function * getSlideList(): Gen {
  try {
    const slides = yield call(api.getJson, 'slides')
    yield put({ type: slidesUpdateList, payload: slides })
  } catch (error) {
    yield putError(error)
  }
}

export function * getSlide({ payload }: Action): Gen {
  try {
    const index = payload as number
    const slideList = yield select(selectSlideList)
    const html = yield call(api.getText, `slides/${slideList![index]}`)
    yield put({ type: slidesUpdateOne, payload: { index, html } })
  } catch (error) {
    yield putError(error)
  }

}

export function * watchGetSlideList () {
  yield takeEvery(slidesGetList, getSlideList)
}

export function * watchGetSlide() {
  yield takeEvery(slidesGetOne, getSlide)
}

export default () => [
  watchGetSlideList(),
  watchGetSlide()
]
