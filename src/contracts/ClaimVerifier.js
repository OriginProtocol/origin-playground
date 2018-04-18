module.exports = {
    "abi": [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_identity",
                    "type": "address"
                },
                {
                    "name": "claimType",
                    "type": "uint256"
                }
            ],
            "name": "checkClaim",
            "outputs": [
                {
                    "name": "claimValid",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "trustedClaimHolder",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_identity",
                    "type": "address"
                },
                {
                    "name": "claimType",
                    "type": "uint256"
                }
            ],
            "name": "claimIsValid",
            "outputs": [
                {
                    "name": "claimValid",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "sig",
                    "type": "bytes"
                },
                {
                    "name": "dataHash",
                    "type": "bytes32"
                }
            ],
            "name": "getRecoveredAddress",
            "outputs": [
                {
                    "name": "addr",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_trustedClaimHolder",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_identity",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "claimType",
                    "type": "uint256"
                }
            ],
            "name": "ClaimValid",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_identity",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "claimType",
                    "type": "uint256"
                }
            ],
            "name": "ClaimInvalid",
            "type": "event"
        }
    ],
    "data": "608060405234801561001057600080fd5b5060405160208061099183398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061090e806100836000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630382ad261461006757806336938354146100cc5780639fecd55414610123578063c3b129e314610188575b600080fd5b34801561007357600080fd5b506100b2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061023f565b604051808215151515815260200191505060405180910390f35b3480156100d857600080fd5b506100e161033a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012f57600080fd5b5061016e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061035f565b604051808215151515815260200191505060405180910390f35b34801561019457600080fd5b506101fd600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803560001916906020019092919050505061080a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600061024b838361035f565b156102c4577f5637aa6b77cde2de563765b75a65099af73d3bf22cb9d089a64a01777823208e8383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019050610334565b7fc1e461cfcaa9ff5efbb053582a325fbfebec1d94ac7e9d9958ee7f74c2b6b5588383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600090505b92915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060008060608060008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168c604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182815260200192505050604051809103902094508c73ffffffffffffffffffffffffffffffffffffffff1663c9100bcb866040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b15801561046357600080fd5b505af1158015610477573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060c08110156104a157600080fd5b8101908080519060200190929190805190602001909291908051906020019092919080516401000000008111156104d757600080fd5b828101905060208101848111156104ed57600080fd5b815185600182028301116401000000008211171561050a57600080fd5b5050929190602001805164010000000081111561052657600080fd5b8281019050602081018481111561053c57600080fd5b815185600182028301116401000000008211171561055957600080fd5b5050929190602001805164010000000081111561057557600080fd5b8281019050602081018481111561058b57600080fd5b81518560018202830111640100000000821117156105a857600080fd5b505092919050505050809a50819b50829c50839d50849e5050505050508c8c87604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140183815260200182805190602001908083835b602083101515610644578051825260208201915060208101905060208303925061061f565b6001836020036101000a0380198251168184511680821785525050505050509050019350505050604051809103902093508360405180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018260001916600019168152602001915050604051809103902092506106c7878461080a565b915081604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401915050604051809103902090506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d202158d8260036040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180836000191660001916815260200182815260200192505050602060405180830381600087803b1580156107bd57600080fd5b505af11580156107d1573d6000803e3d6000fd5b505050506040513d60208110156107e757600080fd5b81019080805190602001909291905050509a505050505050505050505092915050565b60008060008060006041875114151561082657600094506108d8565b6020870151935060408701519250606087015160001a9150601b8260ff16101561085157601b820191505b600186838686604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af11580156108c8573d6000803e3d6000fd5b5050506020604051035190508094505b50505050929150505600a165627a7a7230582042ef457e2cd928a20c0b38f63a4fb625efecebd129c6bd8f1c040f7aea4a354b0029"
}