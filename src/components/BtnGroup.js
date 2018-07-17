import React from 'react'

const BtnGroup = props => {
  var active = props.active || props.buttons[0]
  return (
    <div className={`btn-group${props.className ? ' ' + props.className : ''}`} style={props.style}>
      {props.buttons.map(b => (
        <button
          key={b}
          className={`btn btn-outline-secondary${
            active === b ? ' active' : ''
          }`}
          onClick={() => {
            if (active !== b && props.onClick) {
              props.onClick(b)
            }
          }}
          children={b}
        />
      ))}
    </div>
  )
}

export default BtnGroup
