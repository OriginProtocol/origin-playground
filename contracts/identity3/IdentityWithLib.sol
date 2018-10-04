pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract ERC725 {

    uint256 constant MANAGEMENT_KEY = 1;
    uint256 constant ACTION_KEY = 2;
    uint256 constant CLAIM_SIGNER_KEY = 4;
    uint256 constant ENCRYPTION_KEY = 8;

    event KeyAdded(bytes32 indexed key, uint128 indexed purpose, uint128 indexed keyType);
    event KeyRemoved(bytes32 indexed key);
    event ExecutionRequested(uint256 indexed executionId, address indexed to, uint256 value, bytes data);
    event Executed(uint256 indexed executionId);
    event Approved(uint256 indexed executionId, bool approved);

    struct Key {
        uint128 purpose; // e.g., MANAGEMENT_KEY = 1, ACTION_KEY = 2, etc.
        uint128 keyType; // e.g. 1 = ECDSA, 2 = RSA, etc.
    }

    function addKey(bytes32 _key, Key _keyData) public returns (bool success);
    function execute(address _to, uint256 _value, bytes _data) public returns (uint256 executionId);
    function approve(uint256 _id, bool _approve) public returns (bool success);
}

contract ERC735 {

    event ClaimRequested(uint256 indexed claimRequestId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimAdded(bytes32 indexed claimId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimRemoved(bytes32 indexed claimId);

    struct Claim {
        uint256 claimType;
        uint256 scheme;
        address issuer;
        bytes signature;
        bytes data;
        string uri;
    }

    function addClaim(Claim _claim) public returns (bytes32 claimRequestId);
    function removeClaim(bytes32 _claimId) public returns (bool success);
}

library IdentityLib {

    uint256 constant MANAGEMENT_KEY = 1;
    uint256 constant ACTION_KEY = 2;
    uint256 constant CLAIM_SIGNER_KEY = 4;
    uint256 constant ENCRYPTION_KEY = 8;

    event KeyAdded(bytes32 indexed key, uint128 indexed purpose, uint128 indexed keyType);
    event KeyRemoved(bytes32 indexed key);
    event ExecutionRequested(uint256 indexed executionId, address indexed to, uint256 value, bytes data);
    event Executed(uint256 indexed executionId);
    event Approved(uint256 indexed executionId, bool approved);

    event ClaimRequested(uint256 indexed claimRequestId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimAdded(bytes32 indexed claimId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimRemoved(bytes32 indexed claimId);

    struct IdentityData {
        mapping (bytes32 => Key) keys;
        mapping (bytes32 => Claim) claims;
        mapping (uint => Execution) executions;
        uint executionNonce;
    }

    struct Claim {
        uint256 claimType;
        uint256 scheme;
        address issuer;
        bytes signature;
        bytes data;
        string uri;
    }

    struct Key {
        uint128 purpose; // e.g., MANAGEMENT_KEY = 1, ACTION_KEY = 2, etc.
        uint128 keyType; // e.g. 1 = ECDSA, 2 = RSA, etc.
    }

    struct Execution {
        address to;
        uint256 value;
        bytes data;
    }

    function init(IdentityData storage _identityData, Claim[] _claims) public {
        bytes32 _key = keccak256(msg.sender);
        _identityData.keys[_key] = Key({ purpose: 7, keyType: 1 });
        emit KeyAdded(_key, 7, 1);

        bytes32 claimId;
        for (uint i = 0; i < _claims.length; i++) {
            claimId = keccak256(_claims[i].issuer, _claims[i].claimType);
            _identityData.claims[claimId] = _claims[i];

            emit ClaimAdded(
                claimId,
                _identityData.claims[claimId].claimType,
                _identityData.claims[claimId].scheme,
                _identityData.claims[claimId].issuer,
                _identityData.claims[claimId].signature,
                _identityData.claims[claimId].data,
                _identityData.claims[claimId].uri
            );
        }
    }

    function addKey(IdentityData storage _identityData, bytes32 _key, Key _keyData)
        public
        returns (bool success)
    {
        require(senderHasPurpose(_identityData, MANAGEMENT_KEY));
        _identityData.keys[_key] = _keyData;

        emit KeyAdded(_key, _keyData.purpose, _keyData.keyType);
        return true;
    }

    function removeKey(IdentityData storage _identityData, bytes32 _key)
        public
        returns (bool success)
    {
        require(senderHasPurpose(_identityData, MANAGEMENT_KEY));
        require(_identityData.keys[_key].keyType != 0);
        emit KeyRemoved(_key);
        delete _identityData.keys[_key];
        return true;
    }

    function approve(IdentityData storage _identityData, uint256 _id, bool _approve)
        public
        returns (bool success)
    {
        require(senderHasPurpose(_identityData, ACTION_KEY));

        Execution storage execution = _identityData.executions[_id];
        emit Approved(_id, _approve);

        if (_approve == true) {
            success = execution.to.call.value(execution.value)(execution.data);
            if (success) {
                delete _identityData.executions[_id];
                emit Executed(_id);
                return;
            }
        }
        return true;
    }

    function execute(IdentityData storage _identityData, address _to, uint256 _value, bytes _data)
        public
        returns (uint256 executionId)
    {
        _identityData.executions[_identityData.executionNonce].to = _to;
        _identityData.executions[_identityData.executionNonce].value = _value;
        _identityData.executions[_identityData.executionNonce].data = _data;

        emit ExecutionRequested(_identityData.executionNonce, _to, _value, _data);
        if (senderHasPurpose(_identityData, ACTION_KEY)) {
            approve(_identityData, _identityData.executionNonce, true);
        }
        _identityData.executionNonce++;
        return _identityData.executionNonce;
    }

    function addClaim(IdentityData storage _identityData, Claim _claim)
        public
        returns (bytes32 claimRequestId)
    {
        require(senderHasPurpose(_identityData, CLAIM_SIGNER_KEY));
        bytes32 claimId = keccak256(_claim.issuer, _claim.claimType);
        _identityData.claims[claimId] = _claim;

        emit ClaimAdded(
            claimId,
            _claim.claimType,
            _claim.scheme,
            _claim.issuer,
            _claim.signature,
            _claim.data,
            _claim.uri
        );

        return claimId;
    }

    function removeClaim(IdentityData storage _identityData, bytes32 _claimId)
        public
        returns (bool success)
    {
        require(senderHasPurpose(_identityData, MANAGEMENT_KEY));
        emit ClaimRemoved(_claimId);
        delete _identityData.claims[_claimId];
        return true;
    }

    function senderHasPurpose(IdentityData storage _identityData, uint _purpose) private returns(bool) {
        if (msg.sender == address(this)) {
            return true;
        }
        Key storage key = _identityData.keys[keccak256(msg.sender)];
        return key.purpose & _purpose == _purpose;
    }
}


contract IdentityWithLib {

    IdentityLib.IdentityData identityData;

    constructor(IdentityLib.Claim[] _claims) public {
        IdentityLib.init(identityData, _claims);
    }

    function addKey(bytes32 _key, IdentityLib.Key _keyData)
        public
        returns (bool success)
    {
        return IdentityLib.addKey(identityData, _key, _keyData);
    }

    function removeKey(bytes32 _key)
        public
        returns (bool success)
    {
        IdentityLib.removeKey(identityData, _key);
    }

    function approve(uint256 _id, bool _approve)
        public
        returns (bool success)
    {
        return IdentityLib.approve(identityData, _id, _approve);
    }

    function execute(address _to, uint256 _value, bytes _data)
        public
        returns (uint256 executionId)
    {
        return IdentityLib.execute(identityData, _to, _value, _data);
    }

    function addClaim(IdentityLib.Claim _claim)
        public
        returns (bytes32 claimRequestId)
    {
        return IdentityLib.addClaim(identityData, _claim);
    }

    function removeClaim(bytes32 _claimId)
        public
        returns (bool success)
    {
        return IdentityLib.removeClaim(identityData, _claimId);
    }
}
