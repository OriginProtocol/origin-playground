pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract Token is StandardToken {
  string public name;
  string public symbol;
  uint8 public decimals;
  mapping (address => bool) public approveCallWhitelist;

  constructor(string _name, string _symbol, uint8 _decimals, uint _supply) public {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply_ = _supply;
    balances[msg.sender] = _supply;
  }

  function addToApproveCallWhitelist(address _spender) public {
      approveCallWhitelist[_spender] = true;
  }

  function approveAndCallWithSender(
    address _spender,
    uint256 _value,
    bytes4 selector,
    bytes call_params
  )
    public
    payable
    returns (bool)
  {
    require(_spender != address(this));
    require(approveCallWhitelist[_spender]);

    super.approve(_spender, _value);

    bytes memory call_data = abi.encodePacked(selector, uint256(msg.sender), call_params);
    require(_spender.call.value(msg.value)(call_data));

    return true;
  }
}
