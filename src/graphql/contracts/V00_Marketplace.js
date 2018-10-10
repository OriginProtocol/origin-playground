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
                    "name": "_affiliate",
                    "type": "address"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "addAffiliate",
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowedAffiliates",
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
                    "name": "_affiliate",
                    "type": "address"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "removeAffiliate",
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
                    "name": "_depositManager",
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
                    "name": "_seller",
                    "type": "address"
                },
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
            "name": "updateListingWithSender",
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
                    "name": "_seller",
                    "type": "address"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_deposit",
                    "type": "uint256"
                },
                {
                    "name": "_depositManager",
                    "type": "address"
                }
            ],
            "name": "createListingWithSender",
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
                    "name": "depositManager",
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
                    "indexed": false,
                    "name": "ipfsHash",
                    "type": "bytes32"
                }
            ],
            "name": "AffiliateAdded",
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
            "name": "AffiliateRemoved",
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
            "name": "OfferData",
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
    "data": "60806040523480156200001157600080fd5b506040516020806200515583398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000cf8162000118640100000000026401000000009004565b6001600360008073ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050620001b8565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200017457600080fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b614f8d80620001c86000396000f300608060405260043610610180576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631d34be471461018557806328af94c8146101d45780632ebd1e28146102055780634d03a9a51461024857806351b18250146103815780635f0da25b1461042d5780635fbe4d1d1461049257806370809757146104e9578063715018a61461052e57806378572816146105455780637d19514d146105965780638da5cb5b146105d857806391f1f3101461062f578063963ff4cb146106705780639a8d10a3146106cb5780639c3f7ca214610706578063a08231111461074b578063a3111d7c1461079c578063bf77aa1f146107f7578063c73111dd1461083c578063c78b616c14610895578063c9c8580c146108c0578063ca27eb1c14610976578063cea4b687146109d1578063d9fefbf814610a4e578063de40062914610a93578063de74e57b14610b26578063ebe65f6014610bcd578063f2fde38b14610c12578063fde34dc414610c55575b600080fd5b34801561019157600080fd5b506101d26004803603810190808035906020019092919080359060200190929190803590602001909291908035600019169060200190929190505050610c9a565b005b3480156101e057600080fd5b506102036004803603810190808035600019169060200190929190505050610f24565b005b34801561021157600080fd5b50610246600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f7d565b005b34801561025457600080fd5b5061027d600480360381019080803590602001909291908035906020019092919050505061101c565b604051808a81526020018981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018260ff1660ff168152602001995050505050505050505060405180910390f35b61042b60048036038101908080359060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611113565b005b34801561043957600080fd5b5061049060048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190505050611820565b005b34801561049e57600080fd5b506104a7611b68565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104f557600080fd5b5061052c60048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050611b8e565b005b34801561053a57600080fd5b50610543611e86565b005b34801561055157600080fd5b50610594600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190505050611f88565b005b6105d66004803603810190808035906020019092919080359060200190929190803560001916906020019092919080359060200190929190505050612095565b005b3480156105e457600080fd5b506105ed61256d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561063b57600080fd5b5061065a60048036038101908080359060200190929190505050612592565b6040518082815260200191505060405180910390f35b34801561067c57600080fd5b506106b1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506125b2565b604051808215151515815260200191505060405180910390f35b3480156106d757600080fd5b506107046004803603810190808035906020019092919080356000191690602001909291905050506125d2565b005b34801561071257600080fd5b506107496004803603810190808035906020019092919080359060200190929190803560001916906020019092919050505061262d565b005b34801561075757600080fd5b5061079a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190505050612905565b005b3480156107a857600080fd5b506107f560048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600019169060200190929190505050612a09565b005b34801561080357600080fd5b5061083a60048036038101908080359060200190929190803560001916906020019092919080359060200190929190505050612d58565b005b34801561084857600080fd5b50610893600480360381019080803590602001909291908035906020019092919080356000191690602001909291908035906020019092919080359060200190929190505050612d69565b005b3480156108a157600080fd5b506108aa613172565b6040518082815260200191505060405180910390f35b61097460048036038101908080359060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061317f565b005b34801561098257600080fd5b506109cf600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506131a5565b005b3480156109dd57600080fd5b50610a34600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035600019169060200190929190803590602001909291905050506131b6565b604051808215151515815260200191505060405180910390f35b348015610a5a57600080fd5b50610a9160048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050613295565b005b348015610a9f57600080fd5b50610b0c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506132f2565b604051808215151515815260200191505060405180910390f35b348015610b3257600080fd5b50610b51600480360381019080803590602001909291905050506133d1565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b348015610bd957600080fd5b50610c106004803603810190808035906020019092919080359060200190929190803560001916906020019092919050505061344a565b005b348015610c1e57600080fd5b50610c53600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506138cf565b005b348015610c6157600080fd5b50610c9860048036038101908080359060200190929190803590602001909291908035600019169060200190929190505050613936565b005b6000806002600087815260200190815260200160002085815481101515610cbd57fe5b90600052602060002090600902019150600186815481101515610cdc57fe5b906000526020600020906003020190508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610db3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f53656c6c6572206d7573742063616c6c0000000000000000000000000000000081525060200191505060405180910390fd5b60028260080160009054906101000a900460ff1660ff16141515610e3f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f73746174757320213d206163636570746564000000000000000000000000000081525060200191505060405180910390fd5b81600001548411151515610ebb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f45786365737369766520726566756e640000000000000000000000000000000081525060200191505060405180910390fd5b83826002018190555084863373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808660405180826000191660001916815260200191505060405180910390a4505050505050565b3373ffffffffffffffffffffffffffffffffffffffff167f8e530f3a09c59fdf1b0d5ed714b7a5b94c059256cdc29b8521e9891734c6a2b78260405180826000191660001916815260200191505060405180910390a250565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fd857600080fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60026020528160005260406000208181548110151561103757fe5b9060005260206000209060090201600091509150508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060070154908060080160009054906101000a900460ff16905089565b6000600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905080806111b95750600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b151561122d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f416666696c69617465206e6f7420616c6c6f776564000000000000000000000081525060200191505060405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff1614156112c5576000851415156112c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f636f6d6d697373696f6e20726571756972657320616666696c6961746500000081525060200191505060405180910390fd5b5b600260008a815260200190815260200160002061012060405190810160405280868152602001878152602001600081526020018573ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff168152602001898152602001600160ff168152509080600181540180825580915050906001820390600052602060002090600902016000909192909190915060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060e082015181600701556101008201518160080160006101000a81548160ff021916908360ff16021790555050505060008373ffffffffffffffffffffffffffffffffffffffff1614156115a55783341415156115a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4554482076616c756520646f65736e2774206d61746368206f6666657200000081525060200191505060405180910390fd5b6117a4565b60003414151561161d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f45544820776f756c64206265206c6f737400000000000000000000000000000081525060200191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156116f457600080fd5b505af1158015611708573d6000803e3d6000fd5b505050506040513d602081101561171e57600080fd5b810190808051906020019092919050505015156117a3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f7472616e7366657246726f6d206661696c65640000000000000000000000000081525060200191505060405180910390fd5b5b6001600260008b81526020019081526020016000208054905003893373ffffffffffffffffffffffffffffffffffffffff167f6ee68cb753f284cf771c1a32c236d7ffcab6011345186a30e57837d761e868378b60405180826000191660001916815260200191505060405180910390a4505050505050505050565b600060018581548110151561183157fe5b906000526020600020906003020190503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611908576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f6465706f7369744d616e61676572206d7573742063616c6c000000000000000081525060200191505060405180910390fd5b82816001015410151515611984576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f56616c756520746f6f206869676800000000000000000000000000000000000081525060200191505060405180910390fd5b828160010160008282540392505081905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611a5b57600080fd5b505af1158015611a6f573d6000803e3d6000fd5b505050506040513d6020811015611a8557600080fd5b81019080805190602001909291905050501515611b0a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f5472616e73666572206661696c6564000000000000000000000000000000000081525060200191505060405180910390fd5b848473ffffffffffffffffffffffffffffffffffffffff167f9c9827b799328bcbadbd04862686713436136571c54d7ca0388bd952f314f8908460405180826000191660001916815260200191505060405180910390a35050505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600185815481101515611ba057fe5b906000526020600020906003020191506002600086815260200190815260200160002084815481101515611bd057fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611c8d57508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515611d01576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f4d7573742062652073656c6c6572206f7220627579657200000000000000000081525060200191505060405180910390fd5b60028160080160009054906101000a900460ff1660ff16141515611d8d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f73746174757320213d206163636570746564000000000000000000000000000081525060200191505060405180910390fd5b80600701544211151515611e09576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f416c72656164792066696e616c697a656400000000000000000000000000000081525060200191505060405180910390fd5b60038160080160006101000a81548160ff021916908360ff16021790555083853373ffffffffffffffffffffffffffffffffffffffff167f11c45991938e1dec0b00887cd2368a2195fccb46b08cc56483ac3053ddb609b28660405180826000191660001916815260200191505060405180910390a45050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611ee157600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611fe357600080fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff167f5e48128fde8c162f70ea9f59d0a58f1d1cc40c2eec4b4c71356ab395650bfbdf8260405180826000191660001916815260200191505060405180910390a25050565b600060026000868152602001908152602001600020848154811015156120b757fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561218e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f4275796572206d7573742063616c6c000000000000000000000000000000000081525060200191505060405180910390fd5b60028160080160009054906101000a900460ff1660ff1614151561221a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f73746174757320213d206163636570746564000000000000000000000000000081525060200191505060405180910390fd5b60008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156122d95781341415156122d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f73656e7420213d206f6666657265642076616c7565000000000000000000000081525060200191505060405180910390fd5b6124fc565b600034141515612351576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f455448206d757374206e6f742062652073656e7400000000000000000000000081525060200191505060405180910390fd5b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561244c57600080fd5b505af1158015612460573d6000803e3d6000fd5b505050506040513d602081101561247657600080fd5b810190808051906020019092919050505015156124fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f7472616e7366657246726f6d206661696c65640000000000000000000000000081525060200191505060405180910390fd5b5b81816000016000828254019250508190555083853373ffffffffffffffffffffffffffffffffffffffff167f5f0e66c42b81a43cbd35b11ea0a599d0be1d8e1fdb61d1d4f7a98243ba6cc26b8660405180826000191660001916815260200191505060405180910390a45050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060026000838152602001908152602001600020805490509050919050565b60036020528060005260406000206000915054906101000a900460ff1681565b813373ffffffffffffffffffffffffffffffffffffffff167f12dc84d4005dd5b86fd88951106aa76927a62b83b85ba9c912a7268582906aa98360405180826000191660001916815260200191505060405180910390a35050565b60008060018581548110151561263f57fe5b90600052602060002090600302019150600260008681526020019081526020016000208481548110151561266f57fe5b906000526020600020906009020190508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612746576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f53656c6c6572206d75737420616363657074000000000000000000000000000081525060200191505060405180910390fd5b60018160080160009054906101000a900460ff1660ff161415156127d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f73746174757320213d206372656174656400000000000000000000000000000081525060200191505060405180910390fd5b8060010154826001015410151515612852576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f6465706f736974206d75737420636f76657220636f6d6d697373696f6e00000081525060200191505060405180910390fd5b633b9aca0081600701541015612872578060070154420181600701819055505b8060010154826001016000828254039250508190555060028160080160006101000a81548160ff021916908360ff16021790555083853373ffffffffffffffffffffffffffffffffffffffff167f449224201a35688b74a38ff24770e8b2a326ebf42357bf19a36f5fedbbe552a08660405180826000191660001916815260200191505060405180910390a45050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561296057600080fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690558173ffffffffffffffffffffffffffffffffffffffff167f3553c89fbe376344fc3e6cfb39cce65e6d961cece468c297dad2a1e31d4fa2b68260405180826000191660001916815260200191505060405180910390a25050565b6000600184815481101515612a1a57fe5b906000526020600020906003020190508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612af1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f4d757374206265206465706f7369744d616e616765720000000000000000000081525060200191505060405180910390fd5b60008373ffffffffffffffffffffffffffffffffffffffff1614151515612b80576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f4e6f20746172676574000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8483600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015612c4957600080fd5b505af1158015612c5d573d6000803e3d6000fd5b505050506040513d6020811015612c7357600080fd5b810190808051906020019092919050505050600184815481101515612c9457fe5b9060005260206000209060030201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050838373ffffffffffffffffffffffffffffffffffffffff167fafa3dc4f271ef3419006f21140d375eba48ef3def56e8bfe6d54d0c72a81a3078460405180826000191660001916815260200191505060405180910390a350505050565b612d6433848484613ddc565b505050565b60006002600087815260200190815260200160002085815481101515612d8b57fe5b906000526020600020906009020190508060060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612e62576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4d7573742062652061726269747261746f72000000000000000000000000000081525060200191505060405180910390fd5b60038160080160009054906101000a900460ff1660ff16141515612eee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f73746174757320213d206469737075746564000000000000000000000000000081525060200191505060405180910390fd5b80600001548211151515612f6a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f726566756e6420746f6f2068696768000000000000000000000000000000000081525060200191505060405180910390fd5b81816002018190555060018084161415612f8d57612f888686614097565b612f98565b612f978686614386565b5b60028084161415612fb257612fad868661490d565b612fe5565b8060010154600187815481101515612fc657fe5b9060005260206000209060030201600101600082825401925050819055505b84868260060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3e4d55eb2a402ba6f500db5d75f9303dfe863a2e8319054aeddb6a35ec7e3c6187876040518083600019166000191681526020018281526020019250505060405180910390a4600260008781526020019081526020016000208581548110151561308957fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff02191690555050505050505050565b6000600180549050905090565b61318a89828a61344a565b61319a8989898989898989611113565b505050505050505050565b6131b133848484614b25565b505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561327d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f546f6b656e206d7573742063616c6c000000000000000000000000000000000081525060200191505060405180910390fd5b61328985858585613ddc565b60019050949350505050565b81833373ffffffffffffffffffffffffffffffffffffffff167f9b7312a236066d2da679eba7e3a2e86d2d07a973819499846c0efd2fd2506c808460405180826000191660001916815260200191505060405180910390a4505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156133b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f546f6b656e206d7573742063616c6c000000000000000000000000000000000081525060200191505060405180910390fd5b6133c585858585614b25565b60019050949350505050565b6001818154811015156133e057fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b60008060018581548110151561345c57fe5b90600052602060002090600302019150600260008681526020019081526020016000208481548110151561348c57fe5b906000526020600020906009020190508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061354957508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156135bd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f5265737472696374656420746f206275796572206f722073656c6c657200000081525060200191505060405180910390fd5b60008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156136d85760018160080160009054906101000a900460ff1660ff161480613637575060028160080160009054906101000a900460ff1660ff16145b15156136ab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f737461747573206e6f742063726561746564206f72206163636570746564000081525060200191505060405180910390fd5b60028160080160009054906101000a900460ff1660ff1614156136d3576136d2858561490d565b5b613765565b60018160080160009054906101000a900460ff1660ff16141515613764576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f73746174757320213d206372656174656400000000000000000000000000000081525060200191505060405180910390fd5b5b61376f8585614097565b83853373ffffffffffffffffffffffffffffffffffffffff167fe9ae767ab1c8f3f874a5b2810a1f6323b43283a5b462b52a4de5f8ed53a4fe258660405180826000191660001916815260200191505060405180910390a460026000868152602001908152602001600020848154811015156137e757fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff021916905550505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561392a57600080fd5b61393381614e67565b50565b60008060018581548110151561394857fe5b90600052602060002090600302019150600260008681526020019081526020016000208481548110151561397857fe5b90600052602060002090600902019050806007015442111515613a61578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515613a5c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f4f6e6c792062757965722063616e2066696e616c697a6500000000000000000081525060200191505060405180910390fd5b613b83565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480613b0e57508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515613b82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f53656c6c6572206f72206275796572206d7573742066696e616c697a6500000081525060200191505060405180910390fd5b5b60028160080160009054906101000a900460ff1660ff16141515613c0f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f73746174757320213d206163636570746564000000000000000000000000000081525060200191505060405180910390fd5b613c198585614386565b8060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415613c7c57613c7b858561490d565b5b83853373ffffffffffffffffffffffffffffffffffffffff167fbfefa76df66ac53c6517b1939b14bfc4d5fdf714b93a71aea2e50977d1b3b8e68660405180826000191660001916815260200191505060405180910390a46002600086815260200190815260200160002084815481101515613cf457fe5b9060005260206000209060090201600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560078201600090556008820160006101000a81549060ff021916905550505050505050565b6000600184815481101515613ded57fe5b906000526020600020906003020190508473ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515613ec4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f53656c6c6572206d7573742063616c6c0000000000000000000000000000000081525060200191505060405180910390fd5b600082111561401557600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8630856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015613fc657600080fd5b505af1158015613fda573d6000803e3d6000fd5b505050506040513d6020811015613ff057600080fd5b8101908080519060200190929190505050508181600101600082825401925050819055505b838160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f470503ad37642fff73a57bac35e69733b6b38281a893f39b50c285aad1f040e08560405180826000191660001916815260200191505060405180910390a35050505050565b600060026000848152602001908152602001600020828154811015156140b957fe5b9060005260206000209060090201905060008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156141e2578060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600001549081150290604051600060405180830381858888f1935050505015156141dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f45544820726566756e64206661696c656400000000000000000000000000000081525060200191505060405180910390fd5b614381565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600001546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156142d157600080fd5b505af11580156142e5573d6000803e3d6000fd5b505050506040513d60208110156142fb57600080fd5b81019080805190602001909291905050501515614380576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f526566756e64206661696c65640000000000000000000000000000000000000081525060200191505060405180910390fd5b5b505050565b600080600060018581548110151561439a57fe5b9060005260206000209060030201925060026000868152602001908152602001600020848154811015156143ca57fe5b906000526020600020906009020191508160020154826000015403905060008260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156145cd578160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600201549081150290604051600060405180830381858888f1935050505015156144fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f45544820726566756e64206661696c656400000000000000000000000000000081525060200191505060405180910390fd5b8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156145c8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f4554482073656e64206661696c6564000000000000000000000000000000000081525060200191505060405180910390fd5b614906565b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600201546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156146bc57600080fd5b505af11580156146d0573d6000803e3d6000fd5b505050506040513d60208110156146e657600080fd5b8101908080519060200190929190505050151561476b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f526566756e64206661696c65640000000000000000000000000000000000000081525060200191505060405180910390fd5b8160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561485657600080fd5b505af115801561486a573d6000803e3d6000fd5b505050506040513d602081101561488057600080fd5b81019080805190602001909291905050501515614905576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f5472616e73666572206661696c6564000000000000000000000000000000000081525060200191505060405180910390fd5b5b5050505050565b6000600260008481526020019081526020016000208281548110151561492f57fe5b9060005260206000209060090201905060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515614b2057600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600101546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015614a7057600080fd5b505af1158015614a84573d6000803e3d6000fd5b505050506040513d6020811015614a9a57600080fd5b81019080805190602001909291905050501515614b1f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f436f6d6d697373696f6e207472616e73666572206661696c656400000000000081525060200191505060405180910390fd5b5b505050565b60008173ffffffffffffffffffffffffffffffffffffffff1614151515614bb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f4d7573742073706563696679206465706f7369744d616e61676572000000000081525060200191505060405180910390fd5b60016060604051908101604052808673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506000821115614e0357600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8530856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015614dc657600080fd5b505af1158015614dda573d6000803e3d6000fd5b505050506040513d6020811015614df057600080fd5b8101908080519060200190929190505050505b60018080549050038473ffffffffffffffffffffffffffffffffffffffff167fec3d306143145322b45d2788d826e3b7b9ad062f16e1ec59a5eaba214f96ee3c8560405180826000191660001916815260200191505060405180910390a350505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515614ea357600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058209a1f910542fa3b70ded32b98be62cfae17d90dd19a48b7406d16a797688056230029"
}