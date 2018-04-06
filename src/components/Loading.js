import React from 'react'

const Loading = props => {
  if (props.show !== true) return null
  return (
    <div className="loading-spinner">
      <div>
        <i className="fa fa-spinner fa-spin" /> Loading...
      </div>
    </div>
  )
}

export default Loading

require('react-styl')(`
  .loading-spinner
    z-index: 5
    position: absolute;
    background: rgba(255,255,255,0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #333;
`)
