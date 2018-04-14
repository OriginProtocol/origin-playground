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
                    "name": "claimId",
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
            "name": "checkClaimConstant",
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
                },
                {
                    "indexed": false,
                    "name": "recoveredKey",
                    "type": "bytes32"
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
                },
                {
                    "indexed": false,
                    "name": "recoveredKey",
                    "type": "bytes32"
                }
            ],
            "name": "ClaimInvalid",
            "type": "event"
        }
    ],
    "data": "6060604052341561000f57600080fd5b6040516020806109db83398101604052808051906020019091905050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506109608061007b6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630382ad261461006757806336938354146100c1578063bcd68f4f14610116578063e6c1f9021461019c575b600080fd5b341561007257600080fd5b6100a7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506101f6565b604051808215151515815260200191505060405180910390f35b34156100cc57600080fd5b6100d4610565565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012157600080fd5b61015a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190505061058a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101a757600080fd5b6101dc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506106cc565b604051808215151515815260200191505060405180910390f35b60008060008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1688604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182815260200192505050604051809103902092508873ffffffffffffffffffffffffffffffffffffffff1663c9100bcb846040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180826000191660001916815260200191505060c060405180830381600087803b15156102f357600080fd5b5af1151561030057600080fd5b50505060405180519060200180519060200180519060200180519060200180519060200180519050909150905050809650819750829850505050610344898461058a565b915081604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401915050604051809103902090506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d202158d8260036040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180836000191660001916815260200182815260200192505050602060405180830381600087803b151561043957600080fd5b5af1151561044657600080fd5b50505060405180519050156104d9577f3d4de4d11a11373233ed38924ca212d8f7207c65836d87f9d8d4305d1792c713898983604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018260001916600019168152602001935050505060405180910390a160019650610559565b7fe40aa58a04374428c5b27d482e2afa1b57a4a05127c6606b6d3fcec4c8c7361a898983604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018260001916600019168152602001935050505060405180910390a1600096505b50505050505092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806000808773ffffffffffffffffffffffffffffffffffffffff1663a0ebcf61886040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050608060405180830381600087803b151561060957600080fd5b5af1151561061657600080fd5b5050506040518051906020018051906020018051906020018051905080955081965082975083985050505050600185838686604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af115156106b357600080fd5b5050602060405103519050809550505050505092915050565b60008060008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1688604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182815260200192505050604051809103902092508873ffffffffffffffffffffffffffffffffffffffff1663c9100bcb846040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180826000191660001916815260200191505060c060405180830381600087803b15156107c957600080fd5b5af115156107d657600080fd5b5050506040518051906020018051906020018051906020018051906020018051906020018051905090915090505080965081975082985050505061081a898461058a565b915081604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401915050604051809103902090506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d202158d8260036040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180836000191660001916815260200182815260200192505050602060405180830381600087803b151561090f57600080fd5b5af1151561091c57600080fd5b505050604051805190509650505050505050929150505600a165627a7a723058208547e1bdf47239a8e13ee10bc58d6d9edcb0c6d6a20a76ca66a697aa96c15e540029"
}