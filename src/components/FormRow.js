import React from 'react'

const FormRow = props => (
  <div className="form-group row mb-2">
    <label className="col-sm-4 col-form-label text-right">{props.label}</label>
    <div className="col-sm-8">{props.children}</div>
  </div>
)

export default FormRow
