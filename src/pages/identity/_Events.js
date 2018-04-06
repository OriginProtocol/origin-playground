import React from 'react'

import ClaimHolder from '../../contracts/ClaimHolder'
import decodeFn from 'utils/decodeFn'

const Events = props => {
  if (props.eventsResponse === null) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {props.events.length ? null : <div>No Events</div>}
      {props.events.map((event, idx) => {
        var data = null
        if (String(event.event).match(/(ExecutionRequested|Executed)/)) {
          var decoded = decodeFn(ClaimHolder, event.returnValues.data)
          data = (
            <pre className="ml-3">
              {`${decoded.name}\n`}
              {displayEvent(decoded.params)}
            </pre>
          )
        }

        return (
          <div key={idx}>
            <div>
              <b>{event.event}</b>
              <small className="muted ml-3">Block {event.blockNumber}</small>
            </div>
            <pre>{displayEvent(event.returnValues)}</pre>
            {data}
          </div>
        )
      })}
    </div>
  )
}

export function displayEvent(obj) {
  if (typeof obj !== 'object') {
    return ''
  }
  var ret = []
  Object.keys(obj).forEach(key => {
    if (!key.match(/^([0-9]+|__.*)$/)) {
      var val = String(obj[key])
      val = val.length > 32 ? `${val.substr(0, 32)}...` : val
      ret.push(`${key}: ${val}`)
    }
  })
  return ret.join('\n')
}

export default Events
