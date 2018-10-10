module.exports = {
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "whitelistActive",
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
            "name": "mintingFinished",
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
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
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
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
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
            "name": "totalSupply",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_transactor",
                    "type": "address"
                }
            ],
            "name": "addAllowedTransactor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
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
            "constant": false,
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_transactor",
                    "type": "address"
                }
            ],
            "name": "removeAllowedTransactor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "paused",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseApproval",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
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
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "finishMinting",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_selector",
                    "type": "bytes4"
                },
                {
                    "name": "_callParams",
                    "type": "bytes"
                }
            ],
            "name": "approveAndCallWithSender",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
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
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "addCallSpenderWhitelist",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
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
                    "name": "_who",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
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
            "name": "whitelistExpiration",
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
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowedTransactors",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_expiration",
                    "type": "uint256"
                }
            ],
            "name": "setWhitelistExpiration",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseApproval",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "removeCallSpenderWhitelist",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "callSpenderWhitelist",
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
            "inputs": [
                {
                    "name": "_initialSupply",
                    "type": "uint256"
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
                    "name": "enabler",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "AddCallSpenderWhitelist",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "disabler",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "RemoveCallSpenderWhitelist",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "expiration",
                    "type": "uint256"
                }
            ],
            "name": "SetWhitelistExpiration",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "AllowedTransactorAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "AllowedTransactorRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "Pause",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "Unpause",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Mint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "MintFinished",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipRenounced",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "burner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Burn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ],
    "data": "60806040526000600360146101000a81548160ff0219169083151502179055506000600360156101000a81548160ff0219169083151502179055503480156200004757600080fd5b5060405160208062003603833981018060405281019080805190602001909291905050506040805190810160405280600b81526020017f4f726967696e546f6b656e0000000000000000000000000000000000000000008152506040805190810160405280600381526020017f4f474e0000000000000000000000000000000000000000000000000000000000815250601233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600690805190602001906200013292919062000415565b5081600790805190602001906200014b92919062000415565b5080600860006101000a81548160ff021916908360ff16021790555050505033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001e8600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682620001f0640100000000026401000000009004565b5050620004c4565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200024f57600080fd5b600360149054906101000a900460ff161515156200026c57600080fd5b6200029182600154620003f86401000000000262002379179091906401000000009004565b600181905550620002f8826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054620003f86401000000000262002379179091906401000000009004565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600081830190508281101515156200040c57fe5b80905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200045857805160ff191683800117855562000489565b8280016001018555821562000489579182015b82811115620004885782518255916020019190600101906200046b565b5b5090506200049891906200049c565b5090565b620004c191905b80821115620004bd576000816000905550600101620004a3565b5090565b90565b61312f80620004d46000396000f300608060405260043610610196576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302ce58131461019b57806305d2035b146101ca57806306fdde03146101f9578063095ea7b31461028957806318160ddd146102ee57806323b872dd146103195780632faad46f1461039e578063313ce567146103e15780633f4ba83a1461041257806340c10f191461042957806342966c681461048e5780635c561fff146104bb5780635c975abb146104fe578063661884631461052d57806370a0823114610592578063715018a6146105e95780637d64bcb41461060057806382857a031461062f5780638456cb59146106f65780638da5cb5b1461070d5780638e09c8cd1461076457806395d89b41146107a75780639dc29fac14610837578063a9059cbb14610884578063c5e1edcb146108e9578063c985321114610914578063ce73a61d1461096f578063d73dd6231461099c578063dd62ed3e14610a01578063f2fde38b14610a78578063f75eb24014610abb578063f7613fb114610afe575b600080fd5b3480156101a757600080fd5b506101b0610b59565b604051808215151515815260200191505060405180910390f35b3480156101d657600080fd5b506101df610b65565b604051808215151515815260200191505060405180910390f35b34801561020557600080fd5b5061020e610b78565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561024e578082015181840152602081019050610233565b50505050905090810190601f16801561027b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561029557600080fd5b506102d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c16565b604051808215151515815260200191505060405180910390f35b3480156102fa57600080fd5b50610303610c46565b6040518082815260200191505060405180910390f35b34801561032557600080fd5b50610384600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c50565b604051808215151515815260200191505060405180910390f35b3480156103aa57600080fd5b506103df600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610db5565b005b3480156103ed57600080fd5b506103f6610ecf565b604051808260ff1660ff16815260200191505060405180910390f35b34801561041e57600080fd5b50610427610ee2565b005b34801561043557600080fd5b50610474600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fa2565b604051808215151515815260200191505060405180910390f35b34801561049a57600080fd5b506104b960048036038101908080359060200190929190505050611188565b005b3480156104c757600080fd5b506104fc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506111f0565b005b34801561050a57600080fd5b50610513611301565b604051808215151515815260200191505060405180910390f35b34801561053957600080fd5b50610578600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611314565b604051808215151515815260200191505060405180910390f35b34801561059e57600080fd5b506105d3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611344565b6040518082815260200191505060405180910390f35b3480156105f557600080fd5b506105fe61138c565b005b34801561060c57600080fd5b50610615611491565b604051808215151515815260200191505060405180910390f35b6106dc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050611559565b604051808215151515815260200191505060405180910390f35b34801561070257600080fd5b5061070b61191c565b005b34801561071957600080fd5b506107226119dd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561077057600080fd5b506107a5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a03565b005b3480156107b357600080fd5b506107bc611b51565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156107fc5780820151818401526020810190506107e1565b50505050905090810190601f1680156108295780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561084357600080fd5b50610882600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611bef565b005b34801561089057600080fd5b506108cf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611c59565b604051808215151515815260200191505060405180910390f35b3480156108f557600080fd5b506108fe611dbc565b6040518082815260200191505060405180910390f35b34801561092057600080fd5b50610955600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611dc2565b604051808215151515815260200191505060405180910390f35b34801561097b57600080fd5b5061099a60048036038101908080359060200190929190505050611de2565b005b3480156109a857600080fd5b506109e7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611fd1565b604051808215151515815260200191505060405180910390f35b348015610a0d57600080fd5b50610a62600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612001565b6040518082815260200191505060405180910390f35b348015610a8457600080fd5b50610ab9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612088565b005b348015610ac757600080fd5b50610afc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506120f0565b005b348015610b0a57600080fd5b50610b3f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612235565b604051808215151515815260200191505060405180910390f35b60006004544210905090565b600360149054906101000a900460ff1681565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c0e5780601f10610be357610100808354040283529160200191610c0e565b820191906000526020600020905b815481529060010190602001808311610bf157829003601f168201915b505050505081565b6000600360159054906101000a900460ff16151515610c3457600080fd5b610c3e8383612255565b905092915050565b6000600154905090565b60008383610c5c610b59565b1580610cb15750600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b80610d055750600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1515610d9f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001807f6e6569746865722073656e646572206e6f7220726563697069656e742061726581526020017f20616c6c6f77656400000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b610daa868686612347565b925050509392505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e1157600080fd5b7fe504b838e935ead8d5abd80b50f40c979d04e5a09fb1a3ffad89d2652a458a3181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16001600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600860009054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f3e57600080fd5b600360159054906101000a900460ff161515610f5957600080fd5b6000600360156101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561100057600080fd5b600360149054906101000a900460ff1615151561101c57600080fd5b6110318260015461237990919063ffffffff16565b600181905550611088826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461237990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156111e457600080fd5b6111ed81612395565b50565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561124c57600080fd5b7ffd1d27a7b372eaafdb0f7bb6231d45a1557a67d539850354457c36e54b65b47981604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff021916905550565b600360159054906101000a900460ff1681565b6000600360159054906101000a900460ff1615151561133257600080fd5b61133c83836123a2565b905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113e857600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114ef57600080fd5b600360149054906101000a900460ff1615151561150b57600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600060603073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614151515611601576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f746f6b656e20636f6e74726163742063616e277420626520617070726f76656481525060200191505060405180910390fd5b600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615156116c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f7370656e646572206e6f7420696e2077686974656c697374000000000000000081525060200191505060405180910390fd5b6116cc8686610c16565b1515611740576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f617070726f7665206661696c656400000000000000000000000000000000000081525060200191505060405180910390fd5b833373ffffffffffffffffffffffffffffffffffffffff168460405160200180847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260040183815260200182805190602001908083835b6020831015156117db57805182526020820191506020810190506020830392506117b6565b6001836020036101000a038019825116818451168082178552505050505050905001935050505060405160208183030381529060405290508573ffffffffffffffffffffffffffffffffffffffff16348260405180828051906020019080838360005b8381101561185957808201518184015260208101905061183e565b50505050905090810190601f1680156118865780820380516001836020036101000a031916815260200191505b5091505060006040518083038185875af192505050151561190f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f70726f786965642063616c6c206661696c65640000000000000000000000000081525060200191505060405180910390fd5b6001915050949350505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561197857600080fd5b600360159054906101000a900460ff1615151561199457600080fd5b6001600360156101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611a5f57600080fd5b6001600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f1ba6e2be05698ce865c32566beec57943dafda4497692900d3d5b3c15fecfbb33382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150565b60078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611be75780601f10611bbc57610100808354040283529160200191611be7565b820191906000526020600020905b815481529060010190602001808311611bca57829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611c4b57600080fd5b611c558282612634565b5050565b60003383611c65610b59565b1580611cba5750600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b80611d0e5750600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1515611da8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001807f6e6569746865722073656e646572206e6f7220726563697069656e742061726581526020017f20616c6c6f77656400000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b611db285856127e7565b9250505092915050565b60045481565b60056020528060005260406000206000915054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611e3e57600080fd5b60006004541480611e535750611e52610b59565b5b1515611eed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001807f616e20657870697265642077686974656c6973742063616e6e6f74206265206581526020017f7874656e6465640000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b6201518042018110151515611f90576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260338152602001807f77686974656c6973742065787069726174696f6e206e6f742066617220656e6f81526020017f75676820696e746f20746865206675747572650000000000000000000000000081525060400191505060405180910390fd5b7f425185790737a8bc9659e0a4633a6b6b0428202b2e51b787b431d5fa68242f58816040518082815260200191505060405180910390a18060048190555050565b6000600360159054906101000a900460ff16151515611fef57600080fd5b611ff98383612817565b905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156120e457600080fd5b6120ed81612a13565b50565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561214c57600080fd5b600960008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690557fe840dc5b604bdf9f0bb0eafea84c8542625377dd1fe6116b6b63323e4855a85a3382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150565b60096020528060005260406000206000915054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600360159054906101000a900460ff1615151561236557600080fd5b612370848484612b0f565b90509392505050565b6000818301905082811015151561238c57fe5b80905092915050565b61239f3382612634565b50565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831015156124b4576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612548565b6124c78382612eca90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115151561268157600080fd5b6126d2816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612eca90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061272981600154612eca90919063ffffffff16565b6001819055508173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6000600360159054906101000a900460ff1615151561280557600080fd5b61280f8383612ee3565b905092915050565b60006128a882600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461237990919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515612a4f57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515612b5e57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515612be957600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515612c2557600080fd5b612c76826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612eca90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612d09826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461237990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612dda82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612eca90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b6000828211151515612ed857fe5b818303905092915050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515612f3257600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515612f6e57600080fd5b612fbf826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612eca90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550613052826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461237990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a72305820c31cfbd53e18c0f27a3afa37efd1aa349323675b3e42cdf814d61f59c5a247d00029"
}