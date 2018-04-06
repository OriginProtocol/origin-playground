import React from 'react'

import Dropdown from 'components/Dropdown'

const latestVersion = '0.1.0'
const oldVersions = [
  // { version: '0.1.0', hash: '' }
]

const Versions = () => (
  <Dropdown label={latestVersion} caret={true} className="ml-3">
    <a href="#" className="dropdown-item active">
      <span>{latestVersion}</span>
      <i className="fa fa-caret" />
    </a>
    {oldVersions.map(({ version, hash }) => (
      <a
        key={hash}
        href={`https://gateway.originprotocol.com/ipfs/${hash}`}
        className="dropdown-item"
        onClick={() => {}}
      >
        <span>{version}</span>
        <i className="fa fa-caret" />
      </a>
    ))}
  </Dropdown>
)

export default Versions
