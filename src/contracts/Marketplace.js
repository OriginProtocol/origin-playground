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
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddr",
                    "type": "address"
                }
            ],
            "name": "setTokenAddr",
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
                    "type": "uint256"
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
            "constant": true,
            "inputs": [],
            "name": "tokenAddr",
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
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "addFunds",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
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
                },
                {
                    "name": "_ruling",
                    "type": "uint256"
                },
                {
                    "name": "_refund",
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_finalizes",
                    "type": "uint256"
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
                }
            ],
            "name": "OfferFundsAdded",
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
        }
    ],
    "data": "60806040523480156200001157600080fd5b506040516020806200382683398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000cf81620000d6640100000000026401000000009004565b5062000176565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200013257600080fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6136a080620001866000396000f300608060405260043610610149576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631d34be471461014e57806328af94c81461019d5780632ebd1e28146101ce5780634d03a9a51461021157806351b182501461034a5780635f0da25b146103f65780635fbe4d1d1461045b57806370809757146104b2578063715018a6146104f75780637d19514d1461050e5780638da5cb5b1461055057806391f1f310146105a75780639a8d10a3146105e85780639c3f7ca214610623578063a3111d7c14610668578063bf77aa1f146106c3578063c73111dd14610708578063c78b616c14610761578063c9c8580c1461078c578063ca27eb1c14610842578063d9fefbf81461089d578063de74e57b146108e2578063ebe65f6014610989578063f2fde38b146109ce578063fde34dc414610a11575b600080fd5b34801561015a57600080fd5b5061019b6004803603810190808035906020019092919080359060200190929190803590602001909291908035600019169060200190929190505050610a56565b005b3480156101a957600080fd5b506101cc6004803603810190808035600019169060200190929190505050610ba5565b005b3480156101da57600080fd5b5061020f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bfe565b005b34801561021d57600080fd5b506102466004803603810190808035906020019092919080359060200190929190505050610c9d565b604051808a81526020018981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018260ff1660ff168152602001995050505050505050505060405180910390f35b6103f460048036038101908080359060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d94565b005b34801561040257600080fd5b5061045960048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080356000191690602001909291905050506111b3565b005b34801561046757600080fd5b506104706113c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104be57600080fd5b506104f5600480360381019080803590602001909291908035906020019092919080356000191690602001909291905050506113e6565b005b34801561050357600080fd5b5061050c611528565b005b61054e600480360381019080803590602001909291908035906020019092919080356000191690602001909291908035906020019092919050505061162a565b005b34801561055c57600080fd5b506105656118f5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105b357600080fd5b506105d26004803603810190808035906020019092919050505061191a565b6040518082815260200191505060405180910390f35b3480156105f457600080fd5b5061062160048036038101908080359060200190929190803560001916906020019092919050505061193a565b005b34801561062f57600080fd5b5061066660048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611995565b005b34801561067457600080fd5b506106c160048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190505050611b32565b005b3480156106cf57600080fd5b5061070660048036038101908080359060200190929190803560001916906020019092919080359060200190929190505050611daf565b005b34801561071457600080fd5b5061075f600480360381019080803590602001909291908035906020019092919080356000191690602001909291908035906020019092919080359060200190929190505050612000565b005b34801561076d57600080fd5b506107766122ce565b6040518082815260200191505060405180910390f35b61084060048036038101908080359060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506122db565b005b34801561084e57600080fd5b5061089b600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612301565b005b3480156108a957600080fd5b506108e0600480360381019080803590602001909291908035906020019092919080356000191690602001909291905050506125d9565b005b3480156108ee57600080fd5b5061090d60048036038101908080359060200190929190505050612636565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b34801561099557600080fd5b506109cc600480360381019080803590602001909291908035906020019092919080356000191690602001909291905050506126af565b005b3480156109da57600080fd5b50610a0f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506129f9565b005b348015610a1d57600080fd5b50610a5460048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050612a60565b005b6000806002600087815260200190815260200160002085815481101515610a7957fe5b90600052602060002090600902019150600186815481101515610a9857fe5b906000526020600020906003020190508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b0657600080fd5b60028260080160009054906101000a900460ff1660ff16141515610b2957600080fd5b81600001548411151515610b3c57600080fd5b83826002018190555084863373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808660405180826000191660001916815260200191505060405180910390a4505050505050565b3373ffffffffffffffffffffffffffffffffffffffff167f8e530f3a09c59fdf1b0d5ed714b7a5b94c059256cdc29b8521e9891734c6a2b78260405180826000191660001916815260200191505060405180910390a250565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c5957600080fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260205281600052604060002081815481101515610cb857fe5b9060005260206000209060090201600091509150508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060070154908060080160009054906101000a900460ff16905089565b6002600089815260200190815260200160002061012060405190810160405280858152602001868152602001600081526020018473ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001888152602001600160ff168152509080600181540180825580915050906001820390600052602060002090600902016000909192909190915060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060e082015181600701556101008201518160080160006101000a81548160ff021916908360ff16021790555050505060008273ffffffffffffffffffffffffffffffffffffffff16141561100b57823414151561100657600080fd5b611138565b60003414151561101a57600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156110f157600080fd5b505af1158015611105573d6000803e3d6000fd5b505050506040513d602081101561111b57600080fd5b8101908080519060200190929190505050151561113757600080fd5b5b6001600260008a81526020019081526020016000208054905003883373ffffffffffffffffffffffffffffffffffffffff167f6ee68cb753f284cf771c1a32c236d7ffcab6011345186a30e57837d761e868378a60405180826000191660001916815260200191505060405180910390a45050505050505050565b60006001858154811015156111c457fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561123257600080fd5b8281600101541015151561124557600080fd5b828160010160008282540392505081905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561131c57600080fd5b505af1158015611330573d6000803e3d6000fd5b505050506040513d602081101561134657600080fd5b8101908080519060200190929190505050151561136257600080fd5b848473ffffffffffffffffffffffffffffffffffffffff167f9c9827b799328bcbadbd04862686713436136571c54d7ca0388bd952f314f8908460405180826000191660001916815260200191505060405180910390a35050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260008581526020019081526020016000208381548110151561140857fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561147657600080fd5b60028160080160009054906101000a900460ff1660ff1614151561149957600080fd5b806007015442111515156114ac57600080fd5b60038160080160006101000a81548160ff021916908360ff16021790555082843373ffffffffffffffffffffffffffffffffffffffff167f11c45991938e1dec0b00887cd2368a2195fccb46b08cc56483ac3053ddb609b28560405180826000191660001916815260200191505060405180910390a450505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561158357600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600260008681526020019081526020016000208481548110151561164c57fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156116ba57600080fd5b60028160080160009054906101000a900460ff1660ff161415156116dd57600080fd5b60008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561173357813414151561172e57600080fd5b611884565b60003414151561174257600080fd5b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561183d57600080fd5b505af1158015611851573d6000803e3d6000fd5b505050506040513d602081101561186757600080fd5b8101908080519060200190929190505050151561188357600080fd5b5b81816000016000828254019250508190555083853373ffffffffffffffffffffffffffffffffffffffff167f5f0e66c42b81a43cbd35b11ea0a599d0be1d8e1fdb61d1d4f7a98243ba6cc26b8660405180826000191660001916815260200191505060405180910390a45050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060026000838152602001908152602001600020805490509050919050565b813373ffffffffffffffffffffffffffffffffffffffff167f12dc84d4005dd5b86fd88951106aa76927a62b83b85ba9c912a7268582906aa98360405180826000191660001916815260200191505060405180910390a35050565b6000806001858154811015156119a757fe5b9060005260206000209060030201915060026000868152602001908152602001600020848154811015156119d757fe5b906000526020600020906009020190508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611a4557600080fd5b60018160080160009054906101000a900460ff1660ff16141515611a6857600080fd5b8060010154826001015410151515611a7f57600080fd5b633b9aca0081600701541015611a9f578060070154420181600701819055505b8060010154826001016000828254039250508190555060028160080160006101000a81548160ff021916908360ff16021790555083853373ffffffffffffffffffffffffffffffffffffffff167f449224201a35688b74a38ff24770e8b2a326ebf42357bf19a36f5fedbbe552a08660405180826000191660001916815260200191505060405180910390a45050505050565b6000600184815481101515611b4357fe5b906000526020600020906003020190508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611bb157600080fd5b60008373ffffffffffffffffffffffffffffffffffffffff1614151515611bd757600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8483600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611ca057600080fd5b505af1158015611cb4573d6000803e3d6000fd5b505050506040513d6020811015611cca57600080fd5b810190808051906020019092919050505050600184815481101515611ceb57fe5b9060005260206000209060030201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050838373ffffffffffffffffffffffffffffffffffffffff167fafa3dc4f271ef3419006f21140d375eba48ef3def56e8bfe6d54d0c72a81a3078460405180826000191660001916815260200191505060405180910390a350505050565b6000600184815481101515611dc057fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611e2e57600080fd5b6000821115611f7f57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611f3057600080fd5b505af1158015611f44573d6000803e3d6000fd5b505050506040513d6020811015611f5a57600080fd5b8101908080519060200190929190505050508181600101600082825401925050819055505b838160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f470503ad37642fff73a57bac35e69733b6b38281a893f39b50c285aad1f040e08560405180826000191660001916815260200191505060405180910390a350505050565b6000600260008781526020019081526020016000208581548110151561202257fe5b906000526020600020906009020190508060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561209057600080fd5b60038160080160009054906101000a900460ff1660ff161415156120b357600080fd5b806000015482111515156120c657600080fd5b818160020181905550600180841614156120e9576120e48686612dcb565b6120f4565b6120f38686612fe8565b5b6002808416141561210e5761210986866133cb565b612141565b806001015460018781548110151561212257fe5b9060005260206000209060030201600101600082825401925050819055505b84868260060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3e4d55eb2a402ba6f500db5d75f9303dfe863a2e8319054aeddb6a35ec7e3c6187876040518083600019166000191681526020018281526020019250505060405180910390a460026000878152602001908152602001600020858154811015156121e557fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff02191690555050505050505050565b6000600180549050905090565b6122e689828a6126af565b6122f68989898989898989610d94565b505050505050505050565b60008173ffffffffffffffffffffffffffffffffffffffff161415151561232757600080fd5b60016060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050600082111561257657600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561253957600080fd5b505af115801561254d573d6000803e3d6000fd5b505050506040513d602081101561256357600080fd5b8101908080519060200190929190505050505b60018080549050033373ffffffffffffffffffffffffffffffffffffffff167fec3d306143145322b45d2788d826e3b7b9ad062f16e1ec59a5eaba214f96ee3c8560405180826000191660001916815260200191505060405180910390a3505050565b81833373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808460405180826000191660001916815260200191505060405180910390a4505050565b60018181548110151561264557fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b6000806001858154811015156126c157fe5b9060005260206000209060030201915060026000868152602001908152602001600020848154811015156126f157fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806127ae57508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156127b957600080fd5b60008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561286b5760018160080160009054906101000a900460ff1660ff161480612833575060028160080160009054906101000a900460ff1660ff16145b151561283e57600080fd5b60028160080160009054906101000a900460ff1660ff1614156128665761286585856133cb565b5b61288f565b60018160080160009054906101000a900460ff1660ff1614151561288e57600080fd5b5b6128998585612dcb565b83853373ffffffffffffffffffffffffffffffffffffffff167fe9ae767ab1c8f3f874a5b2810a1f6323b43283a5b462b52a4de5f8ed53a4fe258660405180826000191660001916815260200191505060405180910390a4600260008681526020019081526020016000208481548110151561291157fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff021916905550505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612a5457600080fd5b612a5d8161357a565b50565b600080600185815481101515612a7257fe5b906000526020600020906003020191506002600086815260200190815260200160002084815481101515612aa257fe5b90600052602060002090600902019050806007015442111515612b22578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612b1d57600080fd5b612bdb565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480612bcf57508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515612bda57600080fd5b5b60028160080160009054906101000a900460ff1660ff16141515612bfe57600080fd5b612c088585612fe8565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415612c6b57612c6a85856133cb565b5b83853373ffffffffffffffffffffffffffffffffffffffff167fbfefa76df66ac53c6517b1939b14bfc4d5fdf714b93a71aea2e50977d1b3b8e68660405180826000191660001916815260200191505060405180910390a46002600086815260200190815260200160002084815481101515612ce357fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff021916905550505050505050565b60006002600084815260200190815260200160002082815481101515612ded57fe5b9060005260206000209060090201905060008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612ead578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f193505050501515612ea857600080fd5b612fe3565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612f9c57600080fd5b505af1158015612fb0573d6000803e3d6000fd5b505050506040513d6020811015612fc657600080fd5b81019080805190602001909291905050501515612fe257600080fd5b5b505050565b6000806000600185815481101515612ffc57fe5b90600052602060002090600302019250600260008681526020019081526020016000208481548110151561302c57fe5b906000526020600020906009020191508160020154826000015403905060008260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561315d578160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600201549081150290604051600060405180830381858888f1935050505015156130f457600080fd5b8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561315857600080fd5b6133c4565b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600201546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561324c57600080fd5b505af1158015613260573d6000803e3d6000fd5b505050506040513d602081101561327657600080fd5b8101908080519060200190929190505050151561329257600080fd5b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561337d57600080fd5b505af1158015613391573d6000803e3d6000fd5b505050506040513d60208110156133a757600080fd5b810190808051906020019092919050505015156133c357600080fd5b5b5050505050565b600060026000848152602001908152602001600020828154811015156133ed57fe5b9060005260206000209060090201905060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561357557600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561352e57600080fd5b505af1158015613542573d6000803e3d6000fd5b505050506040513d602081101561355857600080fd5b8101908080519060200190929190505050151561357457600080fd5b5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156135b657600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820efc5451e9f0d4792450fdc4549c2c99eec1f99d7882b26df7a3bd891f7d5cbdb0029"
}