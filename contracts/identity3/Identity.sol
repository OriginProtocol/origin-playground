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

contract Identity is ERC725, ERC735 {

    mapping (bytes32 => Key) public keys;
    mapping (bytes32 => Claim) public claims;
    mapping (uint => Execution) executions;
    uint executionNonce;

    struct Execution {
        address to;
        uint256 value;
        bytes data;
    }

    constructor(Claim[] _claims) public {
        bytes32 _key = keccak256(msg.sender);
        keys[_key] = Key({ purpose: 7, keyType: 1 });
        emit KeyAdded(_key, 7, 1);

        bytes32 claimId;
        for (uint i = 0; i < _claims.length; i++) {
            claimId = keccak256(_claims[i].issuer, _claims[i].claimType);
            claims[claimId] = _claims[i];

            emit ClaimAdded(
                claimId,
                claims[claimId].claimType,
                claims[claimId].scheme,
                claims[claimId].issuer,
                claims[claimId].signature,
                claims[claimId].data,
                claims[claimId].uri
            );
        }
    }

    function addKey(bytes32 _key, Key _keyData)
        public
        returns (bool success)
    {
        require(senderHasPurpose(MANAGEMENT_KEY));
        keys[_key] = _keyData;

        emit KeyAdded(_key, _keyData.purpose, _keyData.keyType);
        return true;
    }

    function removeKey(bytes32 _key)
        public
        returns (bool success)
    {
        require(senderHasPurpose(MANAGEMENT_KEY));
        require(keys[_key].keyType != 0);
        emit KeyRemoved(_key);
        delete keys[_key];
        return true;
    }

    function approve(uint256 _id, bool _approve)
        public
        returns (bool success)
    {
        require(senderHasPurpose(ACTION_KEY));

        Execution storage execution = executions[_id];
        emit Approved(_id, _approve);

        if (_approve == true) {
            success = execution.to.call.value(execution.value)(execution.data);
            if (success) {
                delete executions[_id];
                emit Executed(_id);
                return;
            }
        }
        return true;
    }

    function execute(address _to, uint256 _value, bytes _data)
        public
        returns (uint256 executionId)
    {
        executions[executionNonce].to = _to;
        executions[executionNonce].value = _value;
        executions[executionNonce].data = _data;

        emit ExecutionRequested(executionNonce, _to, _value, _data);
        if (senderHasPurpose(ACTION_KEY)) {
            approve(executionNonce, true);
        }
        executionNonce++;
        return executionNonce;
    }

    function addClaim(Claim _claim)
        public
        returns (bytes32 claimRequestId)
    {
        require(senderHasPurpose(CLAIM_SIGNER_KEY));
        bytes32 claimId = keccak256(_claim.issuer, _claim.claimType);
        claims[claimId] = _claim;

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

    function removeClaim(bytes32 _claimId)
        public
        returns (bool success)
    {
        require(senderHasPurpose(MANAGEMENT_KEY));
        emit ClaimRemoved(_claimId);
        delete claims[_claimId];
        return true;
    }

    function senderHasPurpose(uint _purpose) private returns(bool) {
        if (msg.sender == address(this)) {
            return true;
        }
        Key storage key = keys[keccak256(msg.sender)];
        return key.purpose & _purpose == _purpose;
    }
}
