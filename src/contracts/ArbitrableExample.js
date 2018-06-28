module.exports = {
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "arbitratorExtraData",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes"
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
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "name": "_ruling",
                    "type": "uint256"
                }
            ],
            "name": "rule",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "arbitrator",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "name": "_evidence",
                    "type": "string"
                }
            ],
            "name": "submitEvidence",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "startDispute",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_arbitrator",
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
                    "indexed": true,
                    "name": "_arbitrator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "_rulingOptions",
                    "type": "string"
                }
            ],
            "name": "Dispute",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_arbitrator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "_ruling",
                    "type": "uint256"
                }
            ],
            "name": "Ruling",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_arbitrator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "_party",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_evidence",
                    "type": "string"
                }
            ],
            "name": "Evidence",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_contractHash",
                    "type": "bytes32"
                }
            ],
            "name": "ContractHash",
            "type": "event"
        }
    ],
    "data": "608060405234801561001057600080fd5b5060405160208061080d833981018060405281019080805190602001909291905050508060206040519081016040528060008152506000826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816001908051906020019061009d9291906100e6565b507f1892820d22f2ab2b60795935d39550f42562bf8862a0b3c2193b095baa40af218160405180826000191660001916815260200191505060405180910390a15050505061018b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012757805160ff1916838001178555610155565b82800160010185558215610155579182015b82811115610154578251825591602001919060010190610139565b5b5090506101629190610166565b5090565b61018891905b8082111561018457600081600090555060010161016c565b5090565b90565b6106738061019a6000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c7ac7b614610072578063311a6c56146101025780636cc6cde114610139578063a6a7f0eb14610190578063bbdc7709146101f6575b600080fd5b34801561007e57600080fd5b50610087610200565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100c75780820151818401526020810190506100ac565b50505050905090810190601f1680156100f45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561010e57600080fd5b50610137600480360381019080803590602001909291908035906020019092919050505061029e565b005b34801561014557600080fd5b5061014e610356565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101f460048036038101908080359060200190929190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061037b565b005b6101fe610488565b005b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f957600080fd5b813373ffffffffffffffffffffffffffffffffffffffff167f394027a5fa6e098a1191094d1719d6929b9abc535fcc0c8f448d6a4e75622276836040518082815260200191505060405180910390a36103528282610635565b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b816000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fdccf2f8b2cc26eafcd61905cba744cff4b81d14740725f6376390dc6298a6a3c3384604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561044957808201518184015260208101905061042e565b50505050905090810190601f1680156104765780820380516001836020036101000a031916815260200191505b50935050505060405180910390a35050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c13517e160016040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200180602001828103825260048152602001807f307830300000000000000000000000000000000000000000000000000000000081525060200192505050602060405180830381600087803b15801561055457600080fd5b505af1158015610568573d6000803e3d6000fd5b505050506040513d602081101561057e57600080fd5b81019080805190602001909291905050509050806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f775071bee3f2d409883bcb9dfcef6befa9343668ab341f76fcc5817b52a126116040518080602001828103825260168152602001807f42757965722077696e733b53656c6c65722077696e730000000000000000000081525060200191505060405180910390a350565b816002819055508060038190555050505600a165627a7a7230582087022efeabb9a8540596f652e7c328a5ac16f3d989b5d02885ceb9f1a3480dd10029"
}