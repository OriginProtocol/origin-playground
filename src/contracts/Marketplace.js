module.exports = {
    "abi": [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_finalizes",
                    "type": "uint32"
                },
                {
                    "name": "_affiliate",
                    "type": "address"
                },
                {
                    "name": "_commission",
                    "type": "uint256"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_currency",
                    "type": "address"
                },
                {
                    "name": "_arbitrator",
                    "type": "address"
                },
                {
                    "name": "_withdrawOfferID",
                    "type": "uint256"
                }
            ],
            "name": "makeOffer",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "withdrawListing",
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
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "offers",
            "outputs": [
                {
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "name": "commission",
                    "type": "uint256"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "currency",
                    "type": "address"
                },
                {
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "name": "affiliate",
                    "type": "address"
                },
                {
                    "name": "arbitrator",
                    "type": "address"
                },
                {
                    "name": "finalizes",
                    "type": "uint32"
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
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "target",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "sendDeposit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "dispute",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                }
            ],
            "name": "totalOffers",
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "addData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "acceptOffer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_additionalDeposit",
                    "type": "uint256"
                }
            ],
            "name": "updateListing",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalListings",
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
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_deposit",
                    "type": "uint256"
                },
                {
                    "name": "_arbitrator",
                    "type": "address"
                }
            ],
            "name": "createListing",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_finalizes",
                    "type": "uint32"
                },
                {
                    "name": "_affiliate",
                    "type": "address"
                },
                {
                    "name": "_commission",
                    "type": "uint256"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_currency",
                    "type": "address"
                },
                {
                    "name": "_arbitrator",
                    "type": "address"
                }
            ],
            "name": "makeOffer",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "addData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_ruling",
                    "type": "uint256"
                }
            ],
            "name": "executeRuling",
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
                    "type": "uint256"
                }
            ],
            "name": "listings",
            "outputs": [
                {
                    "name": "seller",
                    "type": "address"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "deposit",
                    "type": "uint256"
                },
                {
                    "name": "arbitrator",
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "withdrawOffer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "finalize",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_tokenAddr",
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
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "ListingCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "ListingUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "ListingWithdrawn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "ListingData",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "ListingArbitrated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferWithdrawn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferAccepted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "disputeID",
                    "type": "uint256"
                }
            ],
            "name": "OfferDisputed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "ruling",
                    "type": "uint256"
                }
            ],
            "name": "OfferRuling",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferFinalized",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferData",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "OfferDisputed",
            "type": "event"
        }
    ],
    "data": "608060405234801561001057600080fd5b50604051602080612bf88339810180604052810190808051906020019092919050505080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050612b74806100846000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063034767f5146100f657806333ce5e76146101b25780634d03a9a5146101ed5780635f0da25b1461033a578063708097571461039f57806391f1f310146103e45780639a8d10a3146104255780639c3f7ca214610460578063bf77aa1f146104a5578063c78b616c146104ea578063ca27eb1c14610515578063d10be3de14610570578063d9fefbf814610622578063dd00867214610667578063de74e57b146106a8578063ebe65f601461075e578063fde34dc4146107a3575b600080fd5b6101b0600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107e8565b005b3480156101be57600080fd5b506101eb60048036038101908080359060200190929190803560001916906020019092919050505061080e565b005b3480156101f957600080fd5b506102226004803603810190808035906020019092919080359060200190929190505050610a8f565b604051808a815260200189815260200188600019166000191681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018363ffffffff1663ffffffff1681526020018260ff1660ff168152602001995050505050505050505060405180910390f35b34801561034657600080fd5b5061039d60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190505050610b96565b005b3480156103ab57600080fd5b506103e260048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050610da2565b005b3480156103f057600080fd5b5061040f60048036038101908080359060200190929190505050610fe9565b6040518082815260200191505060405180910390f35b34801561043157600080fd5b5061045e600480360381019080803590602001909291908035600019169060200190929190505050611009565b005b34801561046c57600080fd5b506104a360048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611064565b005b3480156104b157600080fd5b506104e86004803603810190808035906020019092919080356000191690602001909291908035906020019092919050505061125f565b005b3480156104f657600080fd5b506104ff6114bf565b6040518082815260200191505060405180910390f35b34801561052157600080fd5b5061056e600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114cb565b005b610620600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061179d565b005b34801561062e57600080fd5b5061066560048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611bd8565b005b34801561067357600080fd5b506106a6600480360381019080803590602001909291908035906020019092919080359060200190929190505050611c35565b005b3480156106b457600080fd5b506106d360048036038101908080359060200190929190505050611f12565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184600019166000191681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390f35b34801561076a57600080fd5b506107a160048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611f91565b005b3480156107af57600080fd5b506107e660048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050612290565b005b6107f389828a611f91565b610803898989898989898961179d565b505050505050505050565b6000808381548110151561081e57fe5b906000526020600020906004020190508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561088c57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600201546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561097957600080fd5b505af115801561098d573d6000803e3d6000fd5b505050506040513d60208110156109a357600080fd5b8101908080519060200190929190505050506000838154811015156109c457fe5b9060005260206000209060040201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050823373ffffffffffffffffffffffffffffffffffffffff167fafa3dc4f271ef3419006f21140d375eba48ef3def56e8bfe6d54d0c72a81a3078460405180826000191660001916815260200191505060405180910390a3505050565b600160205281600052604060002081815481101515610aaa57fe5b9060005260206000209060070201600091509150508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160149054906101000a900463ffffffff16908060060160189054906101000a900460ff16905089565b60008085815481101515610ba657fe5b906000526020600020906004020190503373ffffffffffffffffffffffffffffffffffffffff168160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c1457600080fd5b82816002015410151515610c2757600080fd5b828160020160008282540392505081905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610cfe57600080fd5b505af1158015610d12573d6000803e3d6000fd5b505050506040513d6020811015610d2857600080fd5b81019080805190602001909291905050501515610d4457600080fd5b848473ffffffffffffffffffffffffffffffffffffffff167f9c9827b799328bcbadbd04862686713436136571c54d7ca0388bd952f314f8908460405180826000191660001916815260200191505060405180910390a35050505050565b6000806001600086815260200190815260200160002084815481101515610dc557fe5b906000526020600020906007020191508160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e3357600080fd5b60028260060160189054906101000a900460ff1660ff16141515610e5657600080fd5b8160060160149054906101000a900463ffffffff1663ffffffff164211151515610e7f57600080fd5b60038260060160186101000a81548160ff021916908360ff160217905550828260020181600019169055508160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f26999cd86866040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050602060405180830381600087803b158015610f4557600080fd5b505af1158015610f59573d6000803e3d6000fd5b505050506040513d6020811015610f6f57600080fd5b8101908080519060200190929190505050905083853373ffffffffffffffffffffffffffffffffffffffff167fe7b748cad62cc757524a7d98437c112b869a47707319290fb3a03223389972b286856040518083600019166000191681526020018281526020019250505060405180910390a45050505050565b600060016000838152602001908152602001600020805490509050919050565b813373ffffffffffffffffffffffffffffffffffffffff167f12dc84d4005dd5b86fd88951106aa76927a62b83b85ba9c912a7268582906aa98360405180826000191660001916815260200191505060405180910390a35050565b60008060008581548110151561107657fe5b906000526020600020906004020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110e157600080fd5b6000858154811015156110f057fe5b90600052602060002090600402019150600160008681526020019081526020016000208481548110151561112057fe5b9060005260206000209060070201905060018160060160189054906101000a900460ff1660ff1614151561115357600080fd5b60028160060160186101000a81548160ff021916908360ff1602179055508281600201816000191690555060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156111cd575060008160010154115b156112005780600101548260020154101515156111e957600080fd5b806001015482600201600082825403925050819055505b83853373ffffffffffffffffffffffffffffffffffffffff167f449224201a35688b74a38ff24770e8b2a326ebf42357bf19a36f5fedbbe552a08660405180826000191660001916815260200191505060405180910390a45050505050565b60008060008581548110151561127157fe5b906000526020600020906004020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156112df57600080fd5b83816001018160001916905550600083111561143d57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156113ee57600080fd5b505af1158015611402573d6000803e3d6000fd5b505050506040513d602081101561141857600080fd5b8101908080519060200190929190505050508281600201600082825401925050819055505b848160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f470503ad37642fff73a57bac35e69733b6b38281a893f39b50c285aad1f040e08660405180826000191660001916815260200191505060405180910390a35050505050565b60008080549050905090565b6000821115156114da57600080fd5b60006080604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001856000191681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600402016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101906000191690556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156116fd57600080fd5b505af1158015611711573d6000803e3d6000fd5b505050506040513d602081101561172757600080fd5b8101908080519060200190929190505050506001600080549050033373ffffffffffffffffffffffffffffffffffffffff167fec3d306143145322b45d2788d826e3b7b9ad062f16e1ec59a5eaba214f96ee3c8560405180826000191660001916815260200191505060405180910390a3505050565b6001600089815260200190815260200160002061012060405190810160405280858152602001868152602001896000191681526020018473ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018863ffffffff168152602001600160ff168152509080600181540180825580915050906001820390600052602060002090600702016000909192909190915060008201518160000155602082015181600101556040820151816002019060001916905560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060e08201518160060160146101000a81548163ffffffff021916908363ffffffff1602179055506101008201518160060160186101000a81548160ff021916908360ff16021790555050505060008273ffffffffffffffffffffffffffffffffffffffff161415611a40578234141515611a3b57600080fd5b611b5e565b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611b1757600080fd5b505af1158015611b2b573d6000803e3d6000fd5b505050506040513d6020811015611b4157600080fd5b81019080805190602001909291905050501515611b5d57600080fd5b5b60018060008a81526020019081526020016000208054905003883373ffffffffffffffffffffffffffffffffffffffff167f6ee68cb753f284cf771c1a32c236d7ffcab6011345186a30e57837d761e868378a60405180826000191660001916815260200191505060405180910390a45050505050505050565b81833373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808460405180826000191660001916815260200191505060405180910390a4505050565b6000806001600086815260200190815260200160002084815481101515611c5857fe5b90600052602060002090600702019150600085815481101515611c7757fe5b906000526020600020906004020190508160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611ce557600080fd5b60038260060160189054906101000a900460ff1660ff16141515611d0857600080fd5b6000831480611d51575060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15611dd75760008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611d9f576005611da2565b60075b8260060160186101000a81548160ff021916908360ff160217905550611dc8858561252e565b611dd2858561274b565b611e87565b60068260060160186101000a81548160ff021916908360ff160217905550611dff858561290a565b60008260010154118015611e4e575060008260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15611e86578160010154600086815481101515611e6757fe5b9060005260206000209060040201600201600082825401925050819055505b5b83858360060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3e4d55eb2a402ba6f500db5d75f9303dfe863a2e8319054aeddb6a35ec7e3c6160008760405180836001026000191681526020018281526020019250505060405180910390a45050505050565b600081815481101515611f2157fe5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b600080600085815481101515611fa357fe5b906000526020600020906004020191506001600086815260200190815260200160002084815481101515611fd357fe5b906000526020600020906007020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561204157600080fd5b60008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156120f35760018160060160189054906101000a900460ff1660ff1614806120bb575060028160060160189054906101000a900460ff1660ff16145b15156120c657600080fd5b60028160060160189054906101000a900460ff1660ff1614156120ee576120ed858561274b565b5b612117565b60018160060160189054906101000a900460ff1660ff1614151561211657600080fd5b5b612121858561252e565b83853373ffffffffffffffffffffffffffffffffffffffff167fe9ae767ab1c8f3f874a5b2810a1f6323b43283a5b462b52a4de5f8ed53a4fe258660405180826000191660001916815260200191505060405180910390a4600160008681526020019081526020016000208481548110151561219957fe5b9060005260206000209060070201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160146101000a81549063ffffffff02191690556006820160186101000a81549060ff021916905550505050505050565b6000806000858154811015156122a257fe5b9060005260206000209060040201915060016000868152602001908152602001600020848154811015156122d257fe5b906000526020600020906007020190508060060160149054906101000a900463ffffffff1663ffffffff1642111515612368578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561236357600080fd5b612421565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061241557508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561242057600080fd5b5b60028160060160189054906101000a900460ff1660ff1614151561244457600080fd5b60048160060160186101000a81548160ff021916908360ff16021790555061246c858561290a565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156124cf576124ce858561274b565b5b83853373ffffffffffffffffffffffffffffffffffffffff167fbfefa76df66ac53c6517b1939b14bfc4d5fdf714b93a71aea2e50977d1b3b8e68660405180826000191660001916815260200191505060405180910390a45050505050565b6000600160008481526020019081526020016000208281548110151561255057fe5b9060005260206000209060070201905060008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612610578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f19350505050151561260b57600080fd5b612746565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156126ff57600080fd5b505af1158015612713573d6000803e3d6000fd5b505050506040513d602081101561272957600080fd5b8101908080519060200190929190505050151561274557600080fd5b5b505050565b6000600160008481526020019081526020016000208281548110151561276d57fe5b9060005260206000209060070201905060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156127cc575060008160010154115b1561290557600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156128be57600080fd5b505af11580156128d2573d6000803e3d6000fd5b505050506040513d60208110156128e857600080fd5b8101908080519060200190929190505050151561290457600080fd5b5b505050565b60008060008481548110151561291c57fe5b90600052602060002090600402019150600160008581526020019081526020016000208381548110151561294c57fe5b9060005260206000209060070201905060008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612a0c578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f193505050501515612a0757600080fd5b612b42565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612afb57600080fd5b505af1158015612b0f573d6000803e3d6000fd5b505050506040513d6020811015612b2557600080fd5b81019080805190602001909291905050501515612b4157600080fd5b5b505050505600a165627a7a72305820ad38feb2475f837bbde7338fb6f9ea6a8b0209578f9b440b448ca7cab1eeb4c90029"
}