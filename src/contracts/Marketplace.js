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
    "data": "608060405234801561001057600080fd5b50604051602080612c4d8339810180604052810190808051906020019092919050505080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050612bc9806100846000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063034767f5146100f65780634d03a9a5146101b25780635f0da25b146102f0578063708097571461035557806391f1f3101461039a5780639a8d10a3146103db5780639c3f7ca214610416578063a3111d7c1461045b578063bf77aa1f146104b6578063c78b616c146104fb578063ca27eb1c14610526578063d10be3de14610581578063d9fefbf814610633578063dd00867214610678578063de74e57b146106b9578063ebe65f6014610760578063fde34dc4146107a5575b600080fd5b6101b0600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107ea565b005b3480156101be57600080fd5b506101e76004803603810190808035906020019092919080359060200190929190505050610810565b604051808981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018363ffffffff1663ffffffff1681526020018260ff1660ff1681526020019850505050505050505060405180910390f35b3480156102fc57600080fd5b5061035360048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190505050610911565b005b34801561036157600080fd5b5061039860048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050610b1d565b005b3480156103a657600080fd5b506103c560048036038101908080359060200190929190505050610d57565b6040518082815260200191505060405180910390f35b3480156103e757600080fd5b50610414600480360381019080803590602001909291908035600019169060200190929190505050610d77565b005b34801561042257600080fd5b5061045960048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050610dd2565b005b34801561046757600080fd5b506104b460048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190505050610f4f565b005b3480156104c257600080fd5b506104f9600480360381019080803590602001909291908035600019169060200190929190803590602001909291905050506111cb565b005b34801561050757600080fd5b5061051061141b565b6040518082815260200191505060405180910390f35b34801561053257600080fd5b5061057f600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611427565b005b610631600480360381019080803590602001909291908035600019169060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611705565b005b34801561063f57600080fd5b5061067660048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611b34565b005b34801561068457600080fd5b506106b7600480360381019080803590602001909291908035906020019092919080359060200190929190505050611b91565b005b3480156106c557600080fd5b506106e460048036038101908080359060200190929190505050611e9b565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b34801561076c57600080fd5b506107a360048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611f14565b005b3480156107b157600080fd5b506107e86004803603810190808035906020019092919080359060200190929190803560001916906020019092919050505061220b565b005b6107f589828a611f14565b6108058989898989898989611705565b505050505050505050565b60016020528160005260406000208181548110151561082b57fe5b9060005260206000209060060201600091509150508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160149054906101000a900463ffffffff16908060050160189054906101000a900460ff16905088565b6000808581548110151561092157fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561098f57600080fd5b828160010154101515156109a257600080fd5b828160010160008282540392505081905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610a7957600080fd5b505af1158015610a8d573d6000803e3d6000fd5b505050506040513d6020811015610aa357600080fd5b81019080805190602001909291905050501515610abf57600080fd5b848473ffffffffffffffffffffffffffffffffffffffff167f9c9827b799328bcbadbd04862686713436136571c54d7ca0388bd952f314f8908460405180826000191660001916815260200191505060405180910390a35050505050565b6000806001600086815260200190815260200160002084815481101515610b4057fe5b906000526020600020906006020191508160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bae57600080fd5b60028260050160189054906101000a900460ff1660ff16141515610bd157600080fd5b8160050160149054906101000a900463ffffffff1663ffffffff164211151515610bfa57600080fd5b60038260050160186101000a81548160ff021916908360ff1602179055508160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f26999cd86866040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050602060405180830381600087803b158015610cb357600080fd5b505af1158015610cc7573d6000803e3d6000fd5b505050506040513d6020811015610cdd57600080fd5b8101908080519060200190929190505050905083853373ffffffffffffffffffffffffffffffffffffffff167fe7b748cad62cc757524a7d98437c112b869a47707319290fb3a03223389972b286856040518083600019166000191681526020018281526020019250505060405180910390a45050505050565b600060016000838152602001908152602001600020805490509050919050565b813373ffffffffffffffffffffffffffffffffffffffff167f12dc84d4005dd5b86fd88951106aa76927a62b83b85ba9c912a7268582906aa98360405180826000191660001916815260200191505060405180910390a35050565b600080600085815481101515610de457fe5b906000526020600020906003020191506001600086815260200190815260200160002084815481101515610e1457fe5b906000526020600020906006020190508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e8257600080fd5b60018160050160189054906101000a900460ff1660ff16141515610ea557600080fd5b8060010154826001015410151515610ebc57600080fd5b8060010154826001016000828254039250508190555060028160050160186101000a81548160ff021916908360ff16021790555083853373ffffffffffffffffffffffffffffffffffffffff167f449224201a35688b74a38ff24770e8b2a326ebf42357bf19a36f5fedbbe552a08660405180826000191660001916815260200191505060405180910390a45050505050565b60008084815481101515610f5f57fe5b906000526020600020906003020190508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fcd57600080fd5b60008373ffffffffffffffffffffffffffffffffffffffff1614151515610ff357600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8483600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156110bc57600080fd5b505af11580156110d0573d6000803e3d6000fd5b505050506040513d60208110156110e657600080fd5b81019080805190602001909291905050505060008481548110151561110757fe5b9060005260206000209060030201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050838373ffffffffffffffffffffffffffffffffffffffff167fafa3dc4f271ef3419006f21140d375eba48ef3def56e8bfe6d54d0c72a81a3078460405180826000191660001916815260200191505060405180910390a350505050565b600080848154811015156111db57fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561124957600080fd5b600082111561139a57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561134b57600080fd5b505af115801561135f573d6000803e3d6000fd5b505050506040513d602081101561137557600080fd5b8101908080519060200190929190505050508181600101600082825401925050819055505b838160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f470503ad37642fff73a57bac35e69733b6b38281a893f39b50c285aad1f040e08560405180826000191660001916815260200191505060405180910390a350505050565b60008080549050905090565b60008211151561143657600080fd5b60008173ffffffffffffffffffffffffffffffffffffffff161415151561145c57600080fd5b60006060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561166557600080fd5b505af1158015611679573d6000803e3d6000fd5b505050506040513d602081101561168f57600080fd5b8101908080519060200190929190505050506001600080549050033373ffffffffffffffffffffffffffffffffffffffff167fec3d306143145322b45d2788d826e3b7b9ad062f16e1ec59a5eaba214f96ee3c8560405180826000191660001916815260200191505060405180910390a3505050565b60016000898152602001908152602001600020610100604051908101604052808581526020018681526020018473ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018863ffffffff168152602001600160ff1681525090806001815401808255809150509060018203906000526020600020906006020160009091929091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160050160146101000a81548163ffffffff021916908363ffffffff16021790555060e08201518160050160186101000a81548160ff021916908360ff16021790555050505060008273ffffffffffffffffffffffffffffffffffffffff16141561198d57823414151561198857600080fd5b611aba565b60003414151561199c57600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611a7357600080fd5b505af1158015611a87573d6000803e3d6000fd5b505050506040513d6020811015611a9d57600080fd5b81019080805190602001909291905050501515611ab957600080fd5b5b60018060008a81526020019081526020016000208054905003883373ffffffffffffffffffffffffffffffffffffffff167f6ee68cb753f284cf771c1a32c236d7ffcab6011345186a30e57837d761e868378a60405180826000191660001916815260200191505060405180910390a45050505050505050565b81833373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808460405180826000191660001916815260200191505060405180910390a4505050565b6000806001600086815260200190815260200160002084815481101515611bb457fe5b90600052602060002090600602019150600085815481101515611bd357fe5b906000526020600020906003020190508160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611c4157600080fd5b60038260050160189054906101000a900460ff1660ff16141515611c6457600080fd5b6000831480611cad575060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15611ccb57611cbc8585612593565b611cc685856127b0565b611d08565b611cd5858561295f565b8160010154600086815481101515611ce957fe5b9060005260206000209060030201600101600082825401925050819055505b83858360050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3e4d55eb2a402ba6f500db5d75f9303dfe863a2e8319054aeddb6a35ec7e3c6160008760405180836001026000191681526020018281526020019250505060405180910390a46001600086815260200190815260200160002084815481101515611dac57fe5b906000526020600020906006020160008082016000905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160146101000a81549063ffffffff02191690556005820160186101000a81549060ff021916905550505050505050565b600081815481101515611eaa57fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b600080600085815481101515611f2657fe5b906000526020600020906003020191506001600086815260200190815260200160002084815481101515611f5657fe5b906000526020600020906006020190508060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611fc457600080fd5b60008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156120765760018160050160189054906101000a900460ff1660ff16148061203e575060028160050160189054906101000a900460ff1660ff16145b151561204957600080fd5b60028160050160189054906101000a900460ff1660ff1614156120715761207085856127b0565b5b61209a565b60018160050160189054906101000a900460ff1660ff1614151561209957600080fd5b5b6120a48585612593565b83853373ffffffffffffffffffffffffffffffffffffffff167fe9ae767ab1c8f3f874a5b2810a1f6323b43283a5b462b52a4de5f8ed53a4fe258660405180826000191660001916815260200191505060405180910390a4600160008681526020019081526020016000208481548110151561211c57fe5b906000526020600020906006020160008082016000905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160146101000a81549063ffffffff02191690556005820160186101000a81549060ff021916905550505050505050565b60008060008581548110151561221d57fe5b90600052602060002090600302019150600160008681526020019081526020016000208481548110151561224d57fe5b906000526020600020906006020190508060050160149054906101000a900463ffffffff1663ffffffff16421115156122e3578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156122de57600080fd5b61239c565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061239057508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561239b57600080fd5b5b60028160050160189054906101000a900460ff1660ff161415156123bf57600080fd5b6123c9858561295f565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561242c5761242b85856127b0565b5b83853373ffffffffffffffffffffffffffffffffffffffff167fbfefa76df66ac53c6517b1939b14bfc4d5fdf714b93a71aea2e50977d1b3b8e68660405180826000191660001916815260200191505060405180910390a460016000868152602001908152602001600020848154811015156124a457fe5b906000526020600020906006020160008082016000905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160146101000a81549063ffffffff02191690556005820160186101000a81549060ff021916905550505050505050565b600060016000848152602001908152602001600020828154811015156125b557fe5b9060005260206000209060060201905060008160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612675578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f19350505050151561267057600080fd5b6127ab565b8060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561276457600080fd5b505af1158015612778573d6000803e3d6000fd5b505050506040513d602081101561278e57600080fd5b810190808051906020019092919050505015156127aa57600080fd5b5b505050565b600060016000848152602001908152602001600020828154811015156127d257fe5b9060005260206000209060060201905060008160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561295a57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561291357600080fd5b505af1158015612927573d6000803e3d6000fd5b505050506040513d602081101561293d57600080fd5b8101908080519060200190929190505050151561295957600080fd5b5b505050565b60008060008481548110151561297157fe5b9060005260206000209060030201915060016000858152602001908152602001600020838154811015156129a157fe5b9060005260206000209060060201905060008160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612a61578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f193505050501515612a5c57600080fd5b612b97565b8060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612b5057600080fd5b505af1158015612b64573d6000803e3d6000fd5b505050506040513d6020811015612b7a57600080fd5b81019080805190602001909291905050501515612b9657600080fd5b5b505050505600a165627a7a72305820ec804324708d614d0ebe5c0a8f7e9b22eb0f349bbe1de78c1283c272aab092d60029"
}