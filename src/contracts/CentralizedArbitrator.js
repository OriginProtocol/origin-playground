module.exports = {
    "abi": [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_disputeID",
                    "type": "uint256"
                }
            ],
            "name": "disputeStatus",
            "outputs": [
                {
                    "name": "status",
                    "type": "uint8"
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
                    "name": "_disputeID",
                    "type": "uint256"
                }
            ],
            "name": "currentRuling",
            "outputs": [
                {
                    "name": "ruling",
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
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "name": "_extraData",
                    "type": "bytes"
                }
            ],
            "name": "appeal",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "disputes",
            "outputs": [
                {
                    "name": "arbitrated",
                    "type": "address"
                },
                {
                    "name": "choices",
                    "type": "uint256"
                },
                {
                    "name": "fee",
                    "type": "uint256"
                },
                {
                    "name": "ruling",
                    "type": "uint256"
                },
                {
                    "name": "status",
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
                    "name": "_choices",
                    "type": "uint256"
                },
                {
                    "name": "_extraData",
                    "type": "bytes"
                }
            ],
            "name": "createDispute",
            "outputs": [
                {
                    "name": "disputeID",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
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
            "name": "giveRuling",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "name": "_extraData",
                    "type": "bytes"
                }
            ],
            "name": "appealCost",
            "outputs": [
                {
                    "name": "fee",
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
                    "name": "_extraData",
                    "type": "bytes"
                }
            ],
            "name": "arbitrationCost",
            "outputs": [
                {
                    "name": "fee",
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
                    "name": "_arbitrationPrice",
                    "type": "uint256"
                }
            ],
            "name": "setArbitrationPrice",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_arbitrationPrice",
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
                    "name": "_disputeID",
                    "type": "uint256"
                }
            ],
            "name": "AppealPossible",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "_arbitrable",
                    "type": "address"
                }
            ],
            "name": "DisputeCreation",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_disputeID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "_arbitrable",
                    "type": "address"
                }
            ],
            "name": "AppealDecision",
            "type": "event"
        }
    ],
    "data": "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561005057600080fd5b50604051602080610b1c833981018060405281019080805190602001909291905050508060018190555050610a928061008a6000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806310f169e8146100a95780631c3db16d146100f857806349912f8814610139578063564a565d1461019f5780638da5cb5b14610236578063c13517e11461028d578063c97c4d5c14610307578063f23f16e61461033e578063f7434ea9146103c5578063ffb43c4814610442575b600080fd5b3480156100b557600080fd5b506100d46004803603810190808035906020019092919050505061046f565b604051808260028111156100e457fe5b60ff16815260200191505060405180910390f35b34801561010457600080fd5b50610123600480360381019080803590602001909291905050506104a6565b6040518082815260200191505060405180910390f35b61019d60048036038101908080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506104d0565b005b3480156101ab57600080fd5b506101ca60048036038101908080359060200190929190505050610554565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200182600281111561021e57fe5b60ff1681526020019550505050505060405180910390f35b34801561024257600080fd5b5061024b6105c6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102f160048036038101908080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506105eb565b6040518082815260200191505060405180910390f35b34801561031357600080fd5b5061033c600480360381019080803590602001909291908035906020019092919050505061078b565b005b34801561034a57600080fd5b506103af60048036038101908080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109a5565b6040518082815260200191505060405180910390f35b3480156103d157600080fd5b5061042c600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109d0565b6040518082815260200191505060405180910390f35b34801561044e57600080fd5b5061046d600480360381019080803590602001909291905050506109dc565b005b600060028281548110151561048057fe5b906000526020600020906005020160040160009054906101000a900460ff169050919050565b60006002828154811015156104b757fe5b9060005260206000209060050201600301549050919050565b81816104dc82826109a5565b34101515156104ea57600080fd5b837f9c9b64db9e130f48381bf697abf638e73117dbfbfd7a4484f2da3ba188f4187d33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a250505050565b60028181548110151561056357fe5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040160009054906101000a900460ff16905085565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000816105f7816109d0565b341015151561060557600080fd5b61060f8484610a41565b506001600260a0604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001878152602001348152602001600081526020016000600281111561065c57fe5b8152509080600181540180825580915050906001820390600052602060002090600502016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff0219169083600281111561071357fe5b02179055505050039150817f141dfc18aa6a56fc816f44f0e9e2f1ebc92b15ab167770e17db5b084c10ed99533604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28191505092915050565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107eb57600080fd5b6002858154811015156107fa57fe5b906000526020600020906005020192508260010154841115151561081d57600080fd5b826002015491508260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008360000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000836002018190555083836003018190555060028360040160006101000a81548160ff021916908360028111156108c357fe5b02179055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015801561090e573d6000803e3d6000fd5b508073ffffffffffffffffffffffffffffffffffffffff1663311a6c5686866040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050600060405180830381600087803b15801561098657600080fd5b505af115801561099a573d6000803e3d6000fd5b505050505050505050565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905092915050565b60006001549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a3757600080fd5b8060018190555050565b600081610a4d816109d0565b3410151515610a5b57600080fd5b6000915050929150505600a165627a7a723058209923b5d0ca92412de7e784dcda1e7516d3ed9f1d9a8af4556dccd0dcec8eb5a80029"
}