import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DefaultDispatchProps, State } from '../store/types'
import { slidesGetOne, slidesResetAnimate } from './types'
import mapDispatchToProps from '../store/mapDispatchToProps'
import parseSlideIndex from '../common/parseSlideIndex'

type StateProps = Readonly<{
  index: number | undefined
  count: number
  animate: boolean
  html: ReadonlyArray<string>
}>

type Props = StateProps & DefaultDispatchProps

function Slide ({ index, count, animate, html, dispatch, push }: Props) {
  const pageHtml = index === undefined ? undefined : html[index]

  useEffect(() => {
    if (count > 0) {
      if (index === undefined) {
        push('/slides/0')
      } else if (!pageHtml) {
        dispatch({ type: slidesGetOne, payload: index })
      }
    }
  }, [index, count, pageHtml])

  useEffect(() => {
    if (animate && pageHtml) {
      setTimeout(() => {
        dispatch({ type: slidesResetAnimate })
      }, 0)
    }
  }, [animate, pageHtml])

  if (index === undefined || !pageHtml) {
    return null
  } else {
    return (
      <div className={`slide ${animate ? 'fade-start' : 'fade-visible'}`}>
        <div className='slide-html' dangerouslySetInnerHTML={{ __html: pageHtml || '' }}/>
      </div>
    )
  }
}

export const mapStateToProps = (state: State): StateProps => {
  const { slides: { list, html, animate } } = state
  return {
    index: parseSlideIndex(state),
    count: list.length,
    animate,
    html
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
