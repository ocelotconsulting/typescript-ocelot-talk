import React from 'react'

type Props = Readonly<{
  icon: 'fa-chevron-left' | 'fa-chevron-right'
  enabled: boolean
  onClick: (event: React.MouseEvent) => void
}>

const cancelFocus = (event: React.FocusEvent) => {
  event.preventDefault()
}

export default function NavButton({ icon, enabled, onClick }: Props) {
  return (
    <button className='navbar-item button is-link is-small'
            onClick={onClick}
            tabIndex={-1}
            disabled={!enabled}
            onFocus={cancelFocus}>
      <i className={`fas ${icon}`}/>
    </button>
  )
}
