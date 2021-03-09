export const slidesGetList = 'slides/getList'
export const slidesUpdateList = 'slides/updateList'
export const slidesGetOne = 'slides/getOne'
export const slidesUpdateOne = 'slides/updateOne'
export const slidesError = 'slides/error'
export const slidesResetAnimate = 'slides/resetAnimate'

export const slideActionTypes = <const>[
  slidesGetList,
  slidesUpdateList,
  slidesGetOne,
  slidesUpdateOne,
  slidesError,
  slidesResetAnimate
]

export type SlideActionType = typeof slideActionTypes[number]

export type SlidesState = Readonly<{
  list: ReadonlyArray<string>
  html: ReadonlyArray<string>
  animate: boolean
}>
