import React from 'react'
import { DefaultDispatchProps, State } from '../store/types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import mapDispatchToProps from '../store/mapDispatchToProps'
import parseSlideIndex from '../common/parseSlideIndex'
import NavButton from './NavButton'

type StateProps = Readonly<{
  index: number | undefined
  count: number
}>

type Props = StateProps & DefaultDispatchProps

function Header ({ index, count, push }: Props) {
  if (index === undefined) {
    return null
  } else {
    const onNavigate = (delta: number) =>
      () => {
        push(`/slides/${index! + delta}`)
      }
    const backEnabled = index > 0
    const forwardEnabled = index < count - 1

    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img src='http://localhost:3020/images/ocelot.svg' alt='ocelot logo'/>
          </Link>
        </div>

        <div className='navbar-menu'>
          <div className='navbar-start'>
            <NavButton icon='fa-chevron-left' enabled={backEnabled} onClick={onNavigate(-1)}/>
            <NavButton icon='fa-chevron-right' enabled={forwardEnabled} onClick={onNavigate(1)}/>
            <div className='navbar-item status'>
              {`${index + 1} of ${count}`}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  index: parseSlideIndex(state),
  count: state.slides.list.length
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
