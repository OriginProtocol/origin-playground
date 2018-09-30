module.exports = {
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "storedUint256",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "sender",
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
            "inputs": [],
            "name": "storedBytes32",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storedInt256",
            "outputs": [
                {
                    "name": "",
                    "type": "int256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storedInt8",
            "outputs": [
                {
                    "name": "",
                    "type": "int8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "_bytes32",
                    "type": "bytes32"
                },
                {
                    "name": "_bool",
                    "type": "bool"
                },
                {
                    "name": "_uint8",
                    "type": "uint8"
                },
                {
                    "name": "_uint32",
                    "type": "uint32"
                },
                {
                    "name": "_uint256",
                    "type": "uint256"
                },
                {
                    "name": "_int8",
                    "type": "int8"
                },
                {
                    "name": "_int256",
                    "type": "int256"
                }
            ],
            "name": "transferTokens",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storedBool",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storedUint8",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storedUint32",
            "outputs": [
                {
                    "name": "",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_token",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ],
    "data": "608060405234801561001057600080fd5b5060405160208061069483398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610611806100836000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d19ede01461009e57806367e404ce146100c95780639a0363bb14610120578063a7083cde14610153578063aa6846321461017e578063ba5f5437146101af578063cefe183314610247578063da26416514610276578063faf3beaf146102a7575b600080fd5b3480156100aa57600080fd5b506100b36102de565b6040518082815260200191505060405180910390f35b3480156100d557600080fd5b506100de6102e4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012c57600080fd5b5061013561030a565b60405180826000191660001916815260200191505060405180910390f35b34801561015f57600080fd5b50610168610310565b6040518082815260200191505060405180910390f35b34801561018a57600080fd5b50610193610316565b604051808260000b60000b815260200191505060405180910390f35b610245600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190803515159060200190929190803560ff169060200190929190803563ffffffff16906020019092919080359060200190929190803560000b906020019092919080359060200190929190505050610329565b005b34801561025357600080fd5b5061025c6105a9565b604051808215151515815260200191505060405180910390f35b34801561028257600080fd5b5061028b6105bc565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102b357600080fd5b506102bc6105cf565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b60045481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b60065481565b600560009054906101000a900460000b81565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8a308b6040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561042157600080fd5b505af1158015610435573d6000803e3d6000fd5b505050506040513d602081101561044b57600080fd5b810190808051906020019092919050505015156104d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f7472616e7366657246726f6d206661696c65640000000000000000000000000081525060200191505060405180910390fd5b88600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550866002816000191690555085600360006101000a81548160ff02191690831515021790555084600360016101000a81548160ff021916908360ff16021790555083600360026101000a81548163ffffffff021916908363ffffffff1602179055508260048190555081600560006101000a81548160ff021916908360000b60ff16021790555080600681905550505050505050505050565b600360009054906101000a900460ff1681565b600360019054906101000a900460ff1681565b600360029054906101000a900463ffffffff16815600a165627a7a72305820300bbb8cb9e6bc5a6871884ac1b9e61ca4069d77b382068c43622f2c022982910029"
}