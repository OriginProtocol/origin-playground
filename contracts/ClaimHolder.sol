pragma solidity ^0.4.18;

import './ERC735.sol';
import './KeyHolder.sol';

contract ClaimHolder is KeyHolder, ERC735 {

    bytes32 claimId;
    mapping (bytes32 => Claim) claims;
    mapping (uint256 => bytes32[]) claimsByType;

    function addClaim(
        uint256 _claimType,
        uint256 _scheme,
        address _issuer,
        bytes _signature,
        bytes32 _data,
        string _uri
    )
        public
        returns (bytes32 claimRequestId)
    {
        claimId = keccak256(_issuer, _claimType);
        KeyHolder issuer = KeyHolder(issuer);

        if (msg.sender != address(this)) {
          require(keyHasPurpose(keccak256(msg.sender), 3)); // Sender has MANAGEMENT_KEY
        }

        if (claims[claimId].issuer != _issuer) {
            claimsByType[_claimType].push(claimId);
        }

        claims[claimId].claimType = _claimType;
        claims[claimId].scheme = _scheme;
        claims[claimId].issuer = _issuer;
        claims[claimId].signature = _signature;
        claims[claimId].data = _data;
        claims[claimId].uri = _uri;

        emit ClaimAdded(
            claimId,
            _claimType,
            _scheme,
            _issuer,
            _signature,
            _data,
            _uri
        );

        return claimId;
    }

    function removeClaim(bytes32 _claimId) public returns (bool success) {
        if (msg.sender != address(this)) {
          require(keyHasPurpose(keccak256(msg.sender), 1)); // Sender has MANAGEMENT_KEY
        }

        /* uint index; */
        /* (index, ) = claimsByType[claims[_claimId].claimType].indexOf(_claimId);
        claimsByType[claims[_claimId].claimType].removeByIndex(index); */

        emit ClaimRemoved(
            _claimId,
            claims[_claimId].claimType,
            claims[_claimId].scheme,
            claims[_claimId].issuer,
            claims[_claimId].signature,
            claims[_claimId].data,
            claims[_claimId].uri
        );

        delete claims[_claimId];
        return true;
    }

    function getClaim(bytes32 _claimId)
        public
        constant
        returns(
            uint256 claimType,
            uint256 scheme,
            address issuer,
            bytes signature,
            bytes32 data,
            string uri
        )
    {
        return (
            claims[_claimId].claimType,
            claims[_claimId].scheme,
            claims[_claimId].issuer,
            claims[_claimId].signature,
            claims[_claimId].data,
            claims[_claimId].uri
        );
    }

    function getClaimSig(bytes32 _claimId)
        public
        constant
        returns(
          bytes32 data,
          bytes32 r,
          bytes32 s,
          uint8 v
        )
    {
        bytes32 ra;
        bytes32 sa;
        uint8 va;

        bytes memory prefix = "\x19Ethereum Signed Message:\n32"; // prefix used by web3
        bytes memory sig = claims[_claimId].signature;
        uint256 claimType = claims[_claimId].claimType;
        bytes32 claimData = claims[_claimId].data;
        bytes32 dataHash = keccak256(address(this), claimType, claimData);
        bytes32 prefixedHash = keccak256(prefix, dataHash);

        // Check the signature length
        if (sig.length != 65) {
          return (0, 0, 0, 0);
        }

        // Divide the signature in r, s and v variables
        assembly {
          ra := mload(add(sig, 32))
          sa := mload(add(sig, 64))
          va := byte(0, mload(add(sig, 96)))
        }

        if (va < 27) {
          va += 27;
        }

        return (prefixedHash, ra, sa, va);
    }

    function recoverIssuer(bytes32 _claimId)
        private
        constant
        returns(address issuer)
    {
        bytes32 dataHash;
        bytes32 sig_r;
        bytes32 sig_s;
        uint8 sig_v;

        (dataHash, sig_r, sig_s, sig_v ) = getClaimSig(_claimId);

        return ecrecover(dataHash, sig_v, sig_r, sig_s);
    }

    function isClaimValid(bytes32 _claimId)
        public
        view
        returns(bool result)
    {
        address issuer = claims[_claimId].issuer;
        if (issuer == address(this)) {
          return true;
        }

        address recovered = recoverIssuer(_claimId);
        bytes32 hashedAddr = keccak256(recovered);

        uint size;
        assembly { size := extcodesize(issuer) }

        if (size == 0) {
          return false;
        }

        KeyHolder certifier = KeyHolder(claims[_claimId].issuer);

        bool isValid = certifier.keyHasPurpose(hashedAddr, claims[_claimId].claimType);
        return isValid;
    }

    function getClaimIdsByType(uint256 _claimType)
        public
        constant
        returns(bytes32[] claimIds)
    {
        return claimsByType[_claimType];
    }

}
