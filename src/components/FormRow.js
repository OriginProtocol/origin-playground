import React from 'react'

const FormRow = props => (
  <tr>
    <td className="text-right pr-3 pb-2 no-wrap">{props.label}</td>
    <td className="w-100 pb-2">
      {props.children}
    </td>
  </tr>
)

export default FormRow
