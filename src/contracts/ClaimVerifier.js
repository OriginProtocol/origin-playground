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
    "data": "6060604052341561000f57600080fd5b6040516020806109bb83398101604052808051906020019091905050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506109408061007b6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630382ad261461006757806336938354146100c1578063bcd68f4f14610116578063e6c1f9021461019c575b600080fd5b341561007257600080fd5b6100a7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506101f6565b604051808215151515815260200191505060405180910390f35b34156100cc57600080fd5b6100d4610545565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012157600080fd5b61015a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190505061056a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101a757600080fd5b6101dc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506106ac565b604051808215151515815260200191505060405180910390f35b60008060008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1688604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182815260200192505050604051809103902092508873ffffffffffffffffffffffffffffffffffffffff1663c9100bcb846040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180826000191660001916815260200191505060c060405180830381600087803b15156102f357600080fd5b5af1151561030057600080fd5b50505060405180519060200180519060200180519060200180519060200180519060200180519050909150905050809650819750829850505050610344898461056a565b915081604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401915050604051809103902090506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d202158d8260036040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180836000191660001916815260200182815260200192505050602060405180830381600087803b151561043957600080fd5b5af1151561044657600080fd5b50505060405180519050156104c9577f5637aa6b77cde2de563765b75a65099af73d3bf22cb9d089a64a01777823208e8989604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019650610539565b7fc1e461cfcaa9ff5efbb053582a325fbfebec1d94ac7e9d9958ee7f74c2b6b5588989604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600096505b50505050505092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806000808773ffffffffffffffffffffffffffffffffffffffff1663a0ebcf61886040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050608060405180830381600087803b15156105e957600080fd5b5af115156105f657600080fd5b5050506040518051906020018051906020018051906020018051905080955081965082975083985050505050600185838686604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af1151561069357600080fd5b5050602060405103519050809550505050505092915050565b60008060008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1688604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182815260200192505050604051809103902092508873ffffffffffffffffffffffffffffffffffffffff1663c9100bcb846040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180826000191660001916815260200191505060c060405180830381600087803b15156107a957600080fd5b5af115156107b657600080fd5b505050604051805190602001805190602001805190602001805190602001805190602001805190509091509050508096508197508298505050506107fa898461056a565b915081604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401915050604051809103902090506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d202158d8260036040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180836000191660001916815260200182815260200192505050602060405180830381600087803b15156108ef57600080fd5b5af115156108fc57600080fd5b505050604051805190509650505050505050929150505600a165627a7a723058204502563097e4e5dbe13264cc0f437745343f06d5acd4af7b1b4f42f1f162bfb40029"
}