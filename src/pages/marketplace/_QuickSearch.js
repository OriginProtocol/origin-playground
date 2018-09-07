import React, { Component } from 'react'
import moment from 'moment'

import Dropdown from 'components/Dropdown'
import TagSelector from 'components/TagSelector'
import TooltipTrigger from 'components/TooltipTrigger'
import StatusMask from 'components/StatusMask'
import { toggleTooltips } from 'components/PageHeaderSearch'

import SearchActions from 'actions/SearchActions'
import SearchStore from 'stores/SearchStore'
import DropdownsStore from 'stores/Dropdowns'
import TagClassNames from 'constants/TagClassNames'
import UploadSource from 'constants/UploadSource'
import Verdicts from 'constants/Verdicts'

import SavedSearches from './_SavedSearches'

// Move Dashboard time dropdown to same quicks search style
// Tag dropdown 2 levels
// Jump to search from tag defaults to advanced

// Add custom time range to time picker
// Tags dropdown
// Include / Exclude WFTest samples

class Row extends Component {
  render() {
    return (
      <div className="input-group input-group-sm mb-2">
        <input
          placeholder={this.props.label}
          ref={ref => (this.input = ref)}
          className="form-control"
          type="text"
          onClick={e => e.stopPropagation()}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={e => {
              e.preventDefault()
              if (this.props.onSearch && this.input.value) {
                this.props.onSearch(this.input.value)
              }
            }}
          >
            Go
          </button>
        </div>
      </div>
    )
  }
}

export const DisabledDropdown = props => (
  <TooltipTrigger text="Disabled due to Saved Search" position="bottom">
    <div className="quick-search-dropdown cp" style={{ opacity: 0.75 }}>
      {props.label}
      <i className="fa fa-caret-down ml-1" />
    </div>
  </TooltipTrigger>
)

class QuickDropdown extends Component {
  render() {
    const { label, value, header } = this.props
    const options = this.props.options.map(o => (Array.isArray(o) ? o : [o, o]))
    const selected = options.find(o => JSON.stringify(o[2] || o[0]) === JSON.stringify(value))
    const valueLabel = selected ? selected[1] : 'Unknown'
    const filteredOptions = value === undefined ? options.filter(o => o[0] !== undefined) : options
    if (this.props.disabled) {
      return <DisabledDropdown label={label} />
    }
    return (
      <Dropdown
        label={value === undefined ? valueLabel : `${label ? `${label}: ` : ''}${valueLabel}`}
        caret={true}
        type="text"
        className={`quick-search-dropdown${value !== undefined ? ' font-weight-bold' : ''}`}
      >
        {header}
        {filteredOptions.map(([val, lab], idx) => (
          <div
            key={idx}
            className={`dropdown-item${val === value ? ' active' : ''}`}
            onClick={() => this.props.onSearch(val)}
            children={lab}
          />
        ))}
      </Dropdown>
    )
  }
}

function getStateFromStores() {
  var firstSeen = SearchStore.getNamedIdentifier('firstSeen') || {},
    tag = SearchStore.getNamedIdentifier('tag') || {}
  return {
    identifiers: {
      malware: SearchStore.getNamedIdentifier('malware'),
      source: SearchStore.getNamedIdentifier('source'),
      firstSeen,
      ioc: SearchStore.getNamedIdentifier('ioc'),
      tag,
      wildfireTest: SearchStore.getNamedIdentifierValue('wildfireTest'),
      savedSearch: SearchStore.getNamedIdentifier('savedSearch')
    },
    timeField: firstSeen ? firstSeen.field : 'sample.create_date',
    tagGroups: DropdownsStore.get('sample.tag_group') || [],
    tagGroupsLoading: DropdownsStore.getResponseCode('sample.tag_group'),
    isDefault: SearchStore.isDefault()
  }
}

export default class QuickSearch extends Component {
  constructor(props) {
    super(props)
    var initialState = { ...getStateFromStores() }
    initialState.tagField = initialState.identifiers.tag.field || 'sample.tag'
    this.state = initialState
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange)
    DropdownsStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange)
    DropdownsStore.removeChangeListener(this._onChange)
  }

  _onChange = () => {
    this.setState(getStateFromStores())
  }

  render() {
    var iocLabel = 'IOC',
      identifiers = this.state.identifiers,
      ioc = identifiers.ioc,
      tag = identifiers.tag,
      tagLabel = 'Tag',
      tagCaret = true,
      tagDisabled = identifiers.savedSearch ? true : false

    if (tag && tag.value) {
      if (tag.field === 'sample.tag_class') {
        var tagClass = TagClassNames.find(c => c.stringId === tag.value)
        tagLabel = (
          <span>
            <b className="mr-2">Tag Class:</b>
            {tagClass ? tagClass.description : tag.value}
          </span>
        )
      } else if (tag.field === 'sample.tag_group') {
        tagLabel = (
          <span>
            <b className="mr-2">Tag Group:</b>
            {tag.value}
          </span>
        )
      } else {
        tagCaret = false
        tagDisabled = true
        tagLabel = (
          <span style={{ verticalAlign: -2 }}>
            <b className="mr-2">Tag:</b>
            <TagSelector
              listOnly={true}
              selected={tag.value}
              onRemove={() => {
                this.onSearch('tag', 'sample.tag', 'is in the list', undefined)
              }}
            />
          </span>
        )
      }
    }

    if (ioc && ioc.field) {
      if (ioc.field === 'alias.hash') {
        iocLabel = 'Hash'
      }
      if (ioc.field === 'alias.ip_address') {
        iocLabel = 'IP Address'
      }
      if (ioc.field === 'alias.domain') {
        iocLabel = 'Domain'
      }
      if (ioc.field === 'alias.url') {
        iocLabel = 'URL'
      }
      if (ioc.field === 'alias.email') {
        iocLabel = 'Email address'
      }
      if (ioc.field === 'alias.filename') {
        iocLabel = 'Filename'
      }
      iocLabel = `${iocLabel}: ${ioc.value}`
    }

    return (
      <div className="d-flex align-items-center flex-wrap">
        <QuickDropdown
          onSearch={val => this.onSearch('malware', 'sample.malware', 'is', val)}
          value={identifiers.malware === undefined ? undefined : String(identifiers.malware.value)}
          disabled={identifiers.malware ? identifiers.malware.disabled : identifiers.savedSearch ? true : false}
          options={VerdictOpts}
          label="Verdict"
        />
        <QuickDropdown
          onSearch={val => {
            if (val || identifiers.firstSeen.value) {
              this.onSearch(
                'firstSeen',
                this.state.timeField,
                'is after',
                val ? [val, moment().format('YYYY-MM-DD')] : undefined
              )
            }
          }}
          disabled={identifiers.firstSeen.disabled ? true : identifiers.savedSearch ? true : false}
          value={!identifiers.firstSeen.value ? undefined : moment(identifiers.firstSeen.value[0]).format('YYYY-MM-DD')}
          options={FirstSeenOpts}
          label={identifiers.firstSeen.field !== 'sample.create_date' ? 'Time' : 'First Seen'}
          header={
            <div>
              <TooltipTrigger position="right" text={toggleTooltips['sample.create_date']}>
                <div
                  className={`dropdown-item${this.state.timeField === 'sample.create_date' ? ' active' : ''}`}
                  onClick={() => {
                    this.setState({ timeField: 'sample.create_date' })
                    if (identifiers.firstSeen.value) {
                      this.onSearch('firstSeen', 'sample.create_date', 'is after', identifiers.firstSeen.value)
                    }
                  }}
                >
                  First Seen
                </div>
              </TooltipTrigger>
              <TooltipTrigger position="right" text={toggleTooltips['session.tstamp']}>
                <div
                  className={`dropdown-item${this.state.timeField !== 'sample.create_date' ? ' active' : ''}`}
                  onClick={() => {
                    this.setState({ timeField: 'session.tstamp' })
                    if (identifiers.firstSeen.value) {
                      this.onSearch('firstSeen', 'session.tstamp', 'is after', identifiers.firstSeen.value)
                    }
                  }}
                >
                  Time
                </div>
              </TooltipTrigger>
              <div className="dropdown-divider" />
            </div>
          }
        />
        <QuickDropdown
          onSearch={val => this.onSearch('source', 'session.upload_src', 'is', val)}
          value={identifiers.source ? identifiers.source.value : undefined}
          disabled={identifiers.source ? identifiers.source.disabled : identifiers.savedSearch ? true : false}
          options={SourceOpts}
          label="Source"
        />

        {identifiers.savedSearch ? (
          <DisabledDropdown label="Tag" />
        ) : (
          <Dropdown
            label={tagLabel}
            caret={tagCaret}
            disabled={tagDisabled}
            type="text"
            className="quick-search-dropdown"
            ref={r => (this.tagDropdown = r)}
          >
            <div style={{ minWidth: 180 }}>
              <div
                className={`dropdown-item${this.state.tagField === 'sample.tag' ? ' active' : ''}`}
                onClick={e => {
                  e.stopPropagation()
                  this.setState({ tagField: 'sample.tag' })
                }}
              >
                Tag
              </div>
              <div
                className={`dropdown-item${this.state.tagField === 'sample.tag_class' ? ' active' : ''}`}
                onClick={e => {
                  e.stopPropagation()
                  this.setState({ tagField: 'sample.tag_class' })
                }}
              >
                Tag Class
              </div>
              <div
                className={`dropdown-item${this.state.tagField === 'sample.tag_group' ? ' active' : ''}`}
                onClick={e => {
                  e.stopPropagation()
                  SearchActions.populateDropdown('sample.tag_group')
                  this.setState({ tagField: 'sample.tag_group' })
                }}
              >
                Tag Group
              </div>
              <div className="dropdown-divider" />
              {this.renderTag()}
            </div>
          </Dropdown>
        )}

        {identifiers.savedSearch ? (
          <DisabledDropdown label="IOC" />
        ) : (
          <Dropdown
            label={iocLabel}
            caret={true}
            type="text"
            className={`quick-search-dropdown${iocLabel === 'IOC' ? '' : ' font-weight-bold'}`}
          >
            <div className="px-2" style={{ minWidth: 150 }}>
              <Row label="Hash" onSearch={v => this.onSearch('ioc', 'alias.hash', 'contains', v)} />
              <Row label="IP Address" onSearch={v => this.onSearch('ioc', 'alias.ip_address', 'contains', v)} />
              <Row label="Domain" onSearch={v => this.onSearch('ioc', 'alias.domain', 'contains', v)} />
              <Row label="URL" onSearch={v => this.onSearch('ioc', 'alias.url', 'contains', v)} />
              <Row label="User Agent" onSearch={v => this.onSearch('ioc', 'alias.user_agent', 'contains', v)} />
              <Row label="Email address" onSearch={v => this.onSearch('ioc', 'alias.email', 'contains', v)} />
              <Row label="Filename" onSearch={v => this.onSearch('ioc', 'alias.filename', 'contains', v)} />
            </div>
          </Dropdown>
        )}

        <SavedSearches
          savedSearch={identifiers.savedSearch ? identifiers.savedSearch.value : undefined}
          onSearch={(...args) => {
            if (args[3]) { // Has a value
              SearchActions.clearIdentifiers()
              this.onSearch(...args)
            } else {
              SearchActions.reset()
              SearchActions.search(this.props.rootType, true)
            }
          }}
        />

        {/* <QuickDropdown
          onSearch={val => {
            this.onSearch('wildfireTest', 'sample.tag', 'is not in the list', val)
          }}
          value={identifiers.wildfireTest}
          options={[[['Commodity.WildFireTest'], 'Exclude Test Samples'], [undefined, 'Include Test Samples']]}
        /> */}

        {this.state.isDefault ? null : (
          <a
            href="#"
            className="quick-search-dropdown"
            onClick={e => {
              e.preventDefault()
              SearchActions.reset()
              SearchActions.search(this.props.rootType, true)
            }}
          >
            Reset
          </a>
        )}
      </div>
    )
  }

  renderTag() {
    var tag = this.state.identifiers.tag
    if (this.state.tagField === 'sample.tag_class') {
      return (
        <div>
          {TagClassNames.map((cls, idx) => (
            <div
              key={idx}
              className={`dropdown-item${tag && tag.value === cls.stringId ? ' active' : ''}`}
              children={cls.description}
              onClick={() => {
                this.onSearch('tag', 'sample.tag_class', 'is', cls.stringId)
              }}
            />
          ))}
        </div>
      )
    }
    if (this.state.tagField === 'sample.tag_group') {
      return (
        <StatusMask code={this.state.tagGroupsLoading} autoScroll={false} size="small" style={{ minHeight: 40 }}>
          {this.state.tagGroups.map((group, idx) => (
            <div
              key={idx}
              className={`dropdown-item${tag && tag.value === group[0] ? ' active' : ''}`}
              children={group[1]}
              onClick={() => {
                this.onSearch('tag', 'sample.tag_group', 'is', group[0])
              }}
            />
          ))}
        </StatusMask>
      )
    }
    return (
      <TagSelector
        enabledOnly={true}
        forceOpen={true}
        noBorder={true}
        relative={true}
        list={false}
        closeOnBlur={false}
        selected={tag && tag.field === 'sample.tag' ? tag.value : null}
        onAdd={(tagName, tag) => {
          this.setState({ tagField: 'sample.tag' })
          this.onSearch('tag', 'sample.tag', 'is in the list', tag)
          this.tagDropdown.forceClose()
        }}
      />
    )
  }

  onSearch(name, field, operator, value) {
    SearchActions.updateNamedIdentifier(name, field, operator, value)
    SearchActions.search(this.props.rootType)
  }
}

const VerdictOpts = [...Verdicts.map(([id, str]) => [String(id), str]), [undefined, 'Any Verdict']]

const SourceOpts = [...UploadSource, [undefined, 'Any Source']]

const FirstSeenOpts = [
  [
    moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DDTHH:mm:ss'),
    'Last 24 hours',
    moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
  ],
  [
    moment()
      .subtract(6, 'days')
      .format('YYYY-MM-DD'),
    'Last 7 days'
  ],
  [
    moment()
      .subtract(29, 'days')
      .format('YYYY-MM-DD'),
    'Last 30 days'
  ],
  [
    moment()
      .subtract(89, 'days')
      .format('YYYY-MM-DD'),
    'Last 90 days'
  ],
  [
    moment()
      .subtract(179, 'days')
      .format('YYYY-MM-DD'),
    'Last 6 months'
  ],
  [undefined, 'Any Time']
]

require('react-styl')(`
  .quick-search-dropdown
    margin-left: 2rem
    color: #666
    .dropdown-plain
      white-space: nowrap
      max-width: 250px
      overflow: hidden
      text-overflow: ellipsis
`)
