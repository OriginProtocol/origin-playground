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
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "name": "_refund",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "updateRefund",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
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
                    "name": "refund",
                    "type": "uint256"
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
                    "name": "_target",
                    "type": "address"
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
            "name": "ListingCreated",
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
            "name": "ListingUpdated",
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
            "name": "OfferCreated",
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
            "name": "OfferWithdrawn",
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
            "name": "OfferAccepted",
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
                    "name": "party",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "MarketplaceData",
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
            "name": "OfferDisputed",
            "type": "event"
        }
    ],
    "data": "608060405234801561001057600080fd5b506040516020806130668339810180604052810190808051906020019092919050505080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050612fe2806100846000396000f300608060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063034767f51461010c5780631d34be47146101c857806328af94c8146102175780634d03a9a5146102485780635f0da25b1461038d57806370809757146103f257806391f1f310146104375780639a8d10a3146104785780639c3f7ca2146104b3578063a3111d7c146104f8578063bf77aa1f14610553578063c78b616c14610598578063ca27eb1c146105c3578063d10be3de1461061e578063d9fefbf8146106d0578063dd00867214610715578063de74e57b14610756578063ebe65f60146107fd578063fde34dc414610842575b600080fd5b6101c6600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610887565b005b3480156101d457600080fd5b5061021560048036038101908080359060200190929190803590602001909291908035906020019092919080356000191690602001909291905050506108ad565b005b34801561022357600080fd5b5061024660048036038101908080356000191690602001909291905050506109fc565b005b34801561025457600080fd5b5061027d6004803603810190808035906020019092919080359060200190929190505050610a55565b604051808a81526020018981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018363ffffffff1663ffffffff1681526020018260ff1660ff168152602001995050505050505050505060405180910390f35b34801561039957600080fd5b506103f060048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190505050610b5c565b005b3480156103fe57600080fd5b5061043560048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050610d68565b005b34801561044357600080fd5b5061046260048036038101908080359060200190929190505050610fa2565b6040518082815260200191505060405180910390f35b34801561048457600080fd5b506104b1600480360381019080803590602001909291908035600019169060200190929190505050610fc2565b005b3480156104bf57600080fd5b506104f66004803603810190808035906020019092919080359060200190929190803560001916906020019092919050505061101d565b005b34801561050457600080fd5b5061055160048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560001916906020019092919050505061119a565b005b34801561055f57600080fd5b5061059660048036038101908080359060200190929190803560001916906020019092919080359060200190929190505050611416565b005b3480156105a457600080fd5b506105ad611666565b6040518082815260200191505060405180910390f35b3480156105cf57600080fd5b5061061c600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611672565b005b6106ce600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611950565b005b3480156106dc57600080fd5b5061071360048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611d91565b005b34801561072157600080fd5b50610754600480360381019080803590602001909291908035906020019092919080359060200190929190505050611dee565b005b34801561076257600080fd5b5061078160048036038101908080359060200190929190505050612100565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b34801561080957600080fd5b5061084060048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050612179565b005b34801561084e57600080fd5b5061088560048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050612478565b005b61089289828a612179565b6108a28989898989898989611950565b505050505050505050565b60008060016000878152602001908152602001600020858154811015156108d057fe5b906000526020600020906007020191506000868154811015156108ef57fe5b906000526020600020906003020190508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561095d57600080fd5b60028260060160189054906101000a900460ff1660ff1614151561098057600080fd5b8160000154841115151561099357600080fd5b83826002018190555084863373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808660405180826000191660001916815260200191505060405180910390a4505050505050565b3373ffffffffffffffffffffffffffffffffffffffff167f8e530f3a09c59fdf1b0d5ed714b7a5b94c059256cdc29b8521e9891734c6a2b78260405180826000191660001916815260200191505060405180910390a250565b600160205281600052604060002081815481101515610a7057fe5b9060005260206000209060070201600091509150508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160149054906101000a900463ffffffff16908060060160189054906101000a900460ff16905089565b60008085815481101515610b6c57fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610bda57600080fd5b82816001015410151515610bed57600080fd5b828160010160008282540392505081905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610cc457600080fd5b505af1158015610cd8573d6000803e3d6000fd5b505050506040513d6020811015610cee57600080fd5b81019080805190602001909291905050501515610d0a57600080fd5b848473ffffffffffffffffffffffffffffffffffffffff167f9c9827b799328bcbadbd04862686713436136571c54d7ca0388bd952f314f8908460405180826000191660001916815260200191505060405180910390a35050505050565b6000806001600086815260200190815260200160002084815481101515610d8b57fe5b906000526020600020906007020191508160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610df957600080fd5b60028260060160189054906101000a900460ff1660ff16141515610e1c57600080fd5b8160060160149054906101000a900463ffffffff1663ffffffff164211151515610e4557600080fd5b60038260060160186101000a81548160ff021916908360ff1602179055508160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f26999cd86866040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050602060405180830381600087803b158015610efe57600080fd5b505af1158015610f12573d6000803e3d6000fd5b505050506040513d6020811015610f2857600080fd5b8101908080519060200190929190505050905083853373ffffffffffffffffffffffffffffffffffffffff167fe7b748cad62cc757524a7d98437c112b869a47707319290fb3a03223389972b286856040518083600019166000191681526020018281526020019250505060405180910390a45050505050565b600060016000838152602001908152602001600020805490509050919050565b813373ffffffffffffffffffffffffffffffffffffffff167f12dc84d4005dd5b86fd88951106aa76927a62b83b85ba9c912a7268582906aa98360405180826000191660001916815260200191505060405180910390a35050565b60008060008581548110151561102f57fe5b90600052602060002090600302019150600160008681526020019081526020016000208481548110151561105f57fe5b906000526020600020906007020190508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110cd57600080fd5b60018160060160189054906101000a900460ff1660ff161415156110f057600080fd5b806001015482600101541015151561110757600080fd5b8060010154826001016000828254039250508190555060028160060160186101000a81548160ff021916908360ff16021790555083853373ffffffffffffffffffffffffffffffffffffffff167f449224201a35688b74a38ff24770e8b2a326ebf42357bf19a36f5fedbbe552a08660405180826000191660001916815260200191505060405180910390a45050505050565b600080848154811015156111aa57fe5b906000526020600020906003020190508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561121857600080fd5b60008373ffffffffffffffffffffffffffffffffffffffff161415151561123e57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8483600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561130757600080fd5b505af115801561131b573d6000803e3d6000fd5b505050506040513d602081101561133157600080fd5b81019080805190602001909291905050505060008481548110151561135257fe5b9060005260206000209060030201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050838373ffffffffffffffffffffffffffffffffffffffff167fafa3dc4f271ef3419006f21140d375eba48ef3def56e8bfe6d54d0c72a81a3078460405180826000191660001916815260200191505060405180910390a350505050565b6000808481548110151561142657fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561149457600080fd5b60008211156115e557600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561159657600080fd5b505af11580156115aa573d6000803e3d6000fd5b505050506040513d60208110156115c057600080fd5b8101908080519060200190929190505050508181600101600082825401925050819055505b838160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f470503ad37642fff73a57bac35e69733b6b38281a893f39b50c285aad1f040e08560405180826000191660001916815260200191505060405180910390a350505050565b60008080549050905090565b60008211151561168157600080fd5b60008173ffffffffffffffffffffffffffffffffffffffff16141515156116a757600080fd5b60006060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156118b057600080fd5b505af11580156118c4573d6000803e3d6000fd5b505050506040513d60208110156118da57600080fd5b8101908080519060200190929190505050506001600080549050033373ffffffffffffffffffffffffffffffffffffffff167fec3d306143145322b45d2788d826e3b7b9ad062f16e1ec59a5eaba214f96ee3c8560405180826000191660001916815260200191505060405180910390a3505050565b6001600089815260200190815260200160002061012060405190810160405280858152602001868152602001600081526020018473ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018863ffffffff168152602001600160ff168152509080600181540180825580915050906001820390600052602060002090600702016000909192909190915060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060e08201518160060160146101000a81548163ffffffff021916908363ffffffff1602179055506101008201518160060160186101000a81548160ff021916908360ff16021790555050505060008273ffffffffffffffffffffffffffffffffffffffff161415611bea578234141515611be557600080fd5b611d17565b600034141515611bf957600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611cd057600080fd5b505af1158015611ce4573d6000803e3d6000fd5b505050506040513d6020811015611cfa57600080fd5b81019080805190602001909291905050501515611d1657600080fd5b5b60018060008a81526020019081526020016000208054905003883373ffffffffffffffffffffffffffffffffffffffff167f6ee68cb753f284cf771c1a32c236d7ffcab6011345186a30e57837d761e868378a60405180826000191660001916815260200191505060405180910390a45050505050505050565b81833373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808460405180826000191660001916815260200191505060405180910390a4505050565b6000806001600086815260200190815260200160002084815481101515611e1157fe5b90600052602060002090600702019150600085815481101515611e3057fe5b906000526020600020906003020190508160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611e9e57600080fd5b60038260060160189054906101000a900460ff1660ff16141515611ec157600080fd5b6000831480611f0a575060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15611f2857611f198585612808565b611f238585612a25565b611f65565b611f328585612bd4565b8160010154600086815481101515611f4657fe5b9060005260206000209060030201600101600082825401925050819055505b83858360060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3e4d55eb2a402ba6f500db5d75f9303dfe863a2e8319054aeddb6a35ec7e3c6160008760405180836001026000191681526020018281526020019250505060405180910390a4600160008681526020019081526020016000208481548110151561200957fe5b9060005260206000209060070201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160146101000a81549063ffffffff02191690556006820160186101000a81549060ff021916905550505050505050565b60008181548110151561210f57fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b60008060008581548110151561218b57fe5b9060005260206000209060030201915060016000868152602001908152602001600020848154811015156121bb57fe5b906000526020600020906007020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561222957600080fd5b60008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156122db5760018160060160189054906101000a900460ff1660ff1614806122a3575060028160060160189054906101000a900460ff1660ff16145b15156122ae57600080fd5b60028160060160189054906101000a900460ff1660ff1614156122d6576122d58585612a25565b5b6122ff565b60018160060160189054906101000a900460ff1660ff161415156122fe57600080fd5b5b6123098585612808565b83853373ffffffffffffffffffffffffffffffffffffffff167fe9ae767ab1c8f3f874a5b2810a1f6323b43283a5b462b52a4de5f8ed53a4fe258660405180826000191660001916815260200191505060405180910390a4600160008681526020019081526020016000208481548110151561238157fe5b9060005260206000209060070201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160146101000a81549063ffffffff02191690556006820160186101000a81549060ff021916905550505050505050565b60008060008581548110151561248a57fe5b9060005260206000209060030201915060016000868152602001908152602001600020848154811015156124ba57fe5b906000526020600020906007020190508060060160149054906101000a900463ffffffff1663ffffffff1642111515612550578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561254b57600080fd5b612609565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806125fd57508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561260857600080fd5b5b60028160060160189054906101000a900460ff1660ff1614151561262c57600080fd5b6126368585612bd4565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415612699576126988585612a25565b5b83853373ffffffffffffffffffffffffffffffffffffffff167fbfefa76df66ac53c6517b1939b14bfc4d5fdf714b93a71aea2e50977d1b3b8e68660405180826000191660001916815260200191505060405180910390a4600160008681526020019081526020016000208481548110151561271157fe5b9060005260206000209060070201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160146101000a81549063ffffffff02191690556006820160186101000a81549060ff021916905550505050505050565b6000600160008481526020019081526020016000208281548110151561282a57fe5b9060005260206000209060070201905060008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156128ea578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f1935050505015156128e557600080fd5b612a20565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156129d957600080fd5b505af11580156129ed573d6000803e3d6000fd5b505050506040513d6020811015612a0357600080fd5b81019080805190602001909291905050501515612a1f57600080fd5b5b505050565b60006001600084815260200190815260200160002082815481101515612a4757fe5b9060005260206000209060070201905060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515612bcf57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612b8857600080fd5b505af1158015612b9c573d6000803e3d6000fd5b505050506040513d6020811015612bb257600080fd5b81019080805190602001909291905050501515612bce57600080fd5b5b505050565b60008060008085815481101515612be757fe5b906000526020600020906003020192506001600086815260200190815260200160002084815481101515612c1757fe5b906000526020600020906007020191508160020154826000015403905060008260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612d48578160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600201549081150290604051600060405180830381858888f193505050501515612cdf57600080fd5b8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515612d4357600080fd5b612faf565b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600201546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612e3757600080fd5b505af1158015612e4b573d6000803e3d6000fd5b505050506040513d6020811015612e6157600080fd5b81019080805190602001909291905050501515612e7d57600080fd5b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612f6857600080fd5b505af1158015612f7c573d6000803e3d6000fd5b505050506040513d6020811015612f9257600080fd5b81019080805190602001909291905050501515612fae57600080fd5b5b50505050505600a165627a7a7230582085b30b9ff7269bbdd0a5caa1b4a06e76d131dd9cbdeb3acb7a0cc91e5586a0d10029"
}