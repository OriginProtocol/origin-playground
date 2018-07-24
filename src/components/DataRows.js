import React, { Component } from 'react'

import FormRow from 'components/FormRow'

class DataRows extends Component {
  render() {
    let rows = []
    this.props.rows.forEach((row, rowIdx) => {
      if (row.showIf) {
        if (!row.showIf(this.props.data)) return
      }
      if (row.type === 'select') {
        rows.push(
          <FormRow label={row.label} key={rowIdx}>
            <select
              className="form-control"
              value={this.props.data[row.field]}
              onChange={e =>
                this.props.onChange(row.field, e.currentTarget.value)
              }
            >
              {row.options.map((opt, idx) => {
                if (Array.isArray(opt)) {
                  return (
                    <option key={idx} value={opt[0]}>
                      {opt[1]}
                    </option>
                  )
                } else {
                  return (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  )
                }
              })}
            </select>
          </FormRow>
        )
      } else if (row.appendLabel) {
        let appendLabel = row.appendLabel
        if (typeof appendLabel === 'function') {
          appendLabel = appendLabel(this.props.data)
        }
        rows.push(
          <FormRow label={row.label} key={rowIdx}>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={this.props.data[row.field]}
                onChange={e =>
                  this.props.onChange(row.field, e.currentTarget.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text">{appendLabel}</span>
              </div>
            </div>
          </FormRow>
        )
      } else if (row.type === 'checkbox') {
        rows.push(
          <FormRow key={rowIdx}>
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={this.props.data[row.field] ? true : false}
                onChange={e =>
                  this.props.onChange(row.field, e.currentTarget.checked)
                }
              />{' '}
              {row.label}
            </label>
          </FormRow>
        )
      } else {
        rows.push(
          <FormRow label={row.label} key={rowIdx}>
            <input
              className="form-control"
              type="text"
              value={this.props.data[row.field]}
              onChange={e =>
                this.props.onChange(row.field, e.currentTarget.value)
              }
            />
          </FormRow>
        )
      }
    })

    return rows
  }
}

export default DataRows
