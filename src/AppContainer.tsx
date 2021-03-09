import { History } from 'history'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Slide from './slides/Slide'
import { ConnectedRouter } from 'connected-react-router'
import { DefaultDispatchProps, State } from './store/types'
import mapDispatchToProps from './store/mapDispatchToProps'
import { connect } from 'react-redux'
import Header from './header/Header'
import parseSlideIndex from './common/parseSlideIndex'

type StateProps = Readonly<{
  history: History
  index?: number
  slides: ReadonlyArray<string>
}>

type Props = StateProps & DefaultDispatchProps

const getNewSlideIndex = (index: number, key: string): number => {
  console.log(index)
  console.log(key)
  switch (key) {
    case 'ArrowRight':
      return index + 1
    case 'ArrowLeft':
      return index - 1
    default:
      return index
  }
}

function App({ history, index, slides, push }: Props) {
  const maybeNavigate = (event: React.KeyboardEvent) => {
    if (index! >= 0) {
      const newSlideIndex = getNewSlideIndex(index!, event.key)
      if (newSlideIndex !== index && newSlideIndex >= 0 && newSlideIndex < slides.length) {
        push(`/slides/${newSlideIndex}`)
      }
    }
  }

  return (
    <ConnectedRouter history={history}>
      <div className='content' tabIndex={1} onKeyDown={maybeNavigate}>
        <Header/>
        <Switch>
          <Route path='/slides/:index' component={Slide}/>
          <Redirect to='/slides/0'/>
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export const mapStateToProps = (state: State): StateProps => ({
  history: state.history,
  index: parseSlideIndex(state),
  slides: state.slides.list
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
