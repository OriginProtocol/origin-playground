import React from 'react'

const Btn = props => {
  if (!props.showIf) return null
  var className = `btn btn-sm btn-outline-${props.color || 'success'}`
  return (
    <a
      href="#"
      className={props.className === undefined ? className : props.className}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        props.onClick()
      }}
    >
      {props.text || props.children}
    </a>
  )
}

export default Btn
