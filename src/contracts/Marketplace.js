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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
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
                    "name": "_currency",
                    "type": "address"
                },
                {
                    "name": "_seller",
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
            "constant": true,
            "inputs": [],
            "name": "minDeposit",
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
                    "name": "status",
                    "type": "uint256"
                },
                {
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "finalizes",
                    "type": "uint256"
                },
                {
                    "name": "commission",
                    "type": "uint256"
                },
                {
                    "name": "affiliate",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "name": "dispute",
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
                    "type": "uint256"
                }
            ],
            "name": "disputes",
            "outputs": [
                {
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "offerID",
                    "type": "uint256"
                },
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "name": "_ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_withdraw",
                    "type": "bool"
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
                }
            ],
            "name": "acceptOffer",
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
                    "name": "offerID",
                    "type": "uint256"
                }
            ],
            "name": "withdrawOffer",
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
                    "name": "currency",
                    "type": "address"
                },
                {
                    "name": "ipfsHash",
                    "type": "bytes32"
                },
                {
                    "name": "deposit",
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
                    "name": "offerID",
                    "type": "uint256"
                }
            ],
            "name": "buyerFinalize",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "seller",
                    "type": "address"
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
                    "name": "listingID",
                    "type": "uint256"
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "buyer",
                    "type": "address"
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
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
                    "name": "listingID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "offerID",
                    "type": "uint256"
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
    "data": "60806040523480156200001157600080fd5b50604051604080620020bb83398101806040528101908080519060200190929190805190602001909291905050508060206040519081016040528060008152506000826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160019080519060200190620000ab92919062000178565b507f1892820d22f2ab2b60795935d39550f42562bf8862a0b3c2193b095baa40af218160405180826000191660001916815260200191505060405180910390a150505081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000227565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001bb57805160ff1916838001178555620001ec565b82800160010185558215620001ec579182015b82811115620001eb578251825591602001919060010190620001ce565b5b509050620001fb9190620001ff565b5090565b6200022491905b808211156200022057600081600090555060010162000206565b5090565b90565b611e8480620002376000396000f3006080604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c7ac7b6146100eb5780631f2f7fc31461017b5780632f4732aa146101b2578063311a6c561461021e5780633a5112a51461025557806341b3d185146102d05780634d03a9a5146102fb578063564a565d146103d75780636cc6cde1146104265780637be2c4ad1461047d57806381257bd5146104ce57806391f1f31014610505578063c5a8d4bb14610546578063c78b616c1461057d578063de74e57b146105a8578063e6b0b40d1461065e575b600080fd5b3480156100f757600080fd5b50610100610695565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610140578082015181840152602081019050610125565b50505050905090810190601f16801561016d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561018757600080fd5b506101b06004803603810190808035906020019092919080359060200190929190505050610733565b005b61021c60048036038101908080359060200190929190803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610953565b005b34801561022a57600080fd5b506102536004803603810190808035906020019092919080359060200190929190505050610b41565b005b34801561026157600080fd5b506102ce600480360381019080803560001916906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bf9565b005b3480156102dc57600080fd5b506102e5610eaa565b6040518082815260200191505060405180910390f35b34801561030757600080fd5b506103306004803603810190808035906020019092919080359060200190929190505050610eb0565b604051808981526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200187600019166000191681526020018681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019850505050505050505060405180910390f35b3480156103e357600080fd5b5061040260048036038101908080359060200190929190505050610f54565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561043257600080fd5b5061043b610f7e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561048957600080fd5b506104cc60048036038101908080359060200190929190803560001916906020019092919080359060200190929190803515159060200190929190505050610fa4565b005b3480156104da57600080fd5b506105036004803603810190808035906020019092919080359060200190929190505050611326565b005b34801561051157600080fd5b506105306004803603810190808035906020019092919050505061138f565b6040518082815260200191505060405180910390f35b34801561055257600080fd5b5061057b60048036038101908080359060200190929190803590602001909291905050506113af565b005b34801561058957600080fd5b5061059261149a565b6040518082815260200191505060405180910390f35b3480156105b457600080fd5b506105d3600480360381019080803590602001909291905050506114a7565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001836000191660001916815260200182815260200194505050505060405180910390f35b34801561066a57600080fd5b506106936004803603810190808035906020019092919080359060200190929190505050611526565b005b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561072b5780601f106107005761010080835404028352916020019161072b565b820191906000526020600020905b81548152906001019060200180831161070e57829003601f168201915b505050505081565b6000806000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c13517e160016040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200180602001828103825260048152602001807f307830300000000000000000000000000000000000000000000000000000000081525060200192505050602060405180830381600087803b15801561080357600080fd5b505af1158015610817573d6000803e3d6000fd5b505050506040513d602081101561082d57600080fd5b81019080805190602001909291905050509250600360008681526020019081526020016000208481548110151561086057fe5b906000526020600020906008020191506003826000018190555082826007018190555060046000848152602001908152602001600020905084816000018190555083816001018190555082600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f775071bee3f2d409883bcb9dfcef6befa9343668ab341f76fcc5817b52a126116040518080602001828103825260168152602001807f42757965722077696e733b53656c6c65722077696e730000000000000000000081525060200191505060405180910390a35050505050565b6003600087815260200190815260200160002061010060405190810160405280600181526020013273ffffffffffffffffffffffffffffffffffffffff168152602001876000191681526020018681526020018481526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018381526020016000815250908060018154018082558091505090600182039060005260206000209060080201600090919290919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190600019169055606082015181600301556080820151816004015560a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c0820151816006015560e08201518160070155505050610adb8682611599565b3273ffffffffffffffffffffffffffffffffffffffff166001600360008981526020019081526020016000208054905003877f1be7385e5a960aabd206224f90e23bb92719f1749fa15a10c0e39302eec9ab5860405160405180910390a4505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b9c57600080fd5b813373ffffffffffffffffffffffffffffffffffffffff167f394027a5fa6e098a1191094d1719d6929b9abc535fcc0c8f448d6a4e75622276836040518082815260200191505060405180910390a3610bf58282611758565b5050565b60026080604051908101604052808373ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200186600019168152602001858152509080600181540180825580915050906001820390600052602060002090600402016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002019060001916905560608201518160030155505050600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8230866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015610e1c57600080fd5b505af1158015610e30573d6000803e3d6000fd5b505050506040513d6020811015610e4657600080fd5b8101908080519060200190929190505050508073ffffffffffffffffffffffffffffffffffffffff166001600280549050037f4e0f9c4c10f3933a613addba91d6bd94f54a77e3e2748707ee7fe140aef218c560405160405180910390a350505050565b60075481565b600360205281600052604060002081815481101515610ecb57fe5b9060005260206000209060080201600091509150508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060040154908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060154908060070154905088565b60046020528060005260406000206000915090508060000154908060010154908060020154905083565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600285815481101515610fb557fe5b906000526020600020906004020190503273ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561102357600080fd5b8381600201816000191690555081801561103d5750600083115b156111a05782816003015411151561105457600080fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3032866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561114d57600080fd5b505af1158015611161573d6000803e3d6000fd5b505050506040513d602081101561117757600080fd5b8101908080519060200190929190505050508281600301600082825403925050819055506112f2565b60008311156112f157600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3230866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156112a257600080fd5b505af11580156112b6573d6000803e3d6000fd5b505050506040513d60208110156112cc57600080fd5b8101908080519060200190929190505050508281600301600082825401925050819055505b5b847fe7d434e73289cca621fd9ee863535d63a2cc7b86e8ee22aa5555ff223c9540cf60405160405180910390a25050505050565b6002600360008481526020019081526020016000208281548110151561134857fe5b90600052602060002090600802016000018190555080827f397f87b3946767b09967764d50032941de13a2606bcb39dfed61d7b1ed0192cc60405160405180910390a35050565b600060036000838152602001908152602001600020805490509050919050565b6113b982826117f9565b80827ff9a2ede3410c9d02de379e8e6c525edb95b11fb6ef76b37ee64b4bc26a77968360405160405180910390a3600360008381526020019081526020016000208181548110151561140757fe5b90600052602060002090600802016000808201600090556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556002820160009055600382016000905560048201600090556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160009055600782016000905550505050565b6000600280549050905090565b6002818154811015156114b657fe5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154905084565b6004600360008481526020019081526020016000208281548110151561154857fe5b9060005260206000209060080201600001819055506115678282611a37565b80827f972cff1490a2e39635c445306f1a746df366970c3d2946b7c3d7a684f203203760405160405180910390a35050565b60006002838154811015156115aa57fe5b9060005260206000209060040201905060008160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156116115781341015151561160c57600080fd5b611753565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3230856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561170c57600080fd5b505af1158015611720573d6000803e3d6000fd5b505050506040513d602081101561173657600080fd5b8101908080519060200190929190505050151561175257600080fd5b5b505050565b600080600080600460008781526020019081526020016000209350836000015492508360010154915060036000848152602001908152602001600020828154811015156117a157fe5b9060005260206000209060080201905084846002018190555060008514156117dc57600581600001819055506117d783836117f9565b6117f1565b600681600001819055506117f08383611a37565b5b505050505050565b600080600360008581526020019081526020016000208381548110151561181c57fe5b9060005260206000209060080201915060028481548110151561183b57fe5b9060005260206000209060040201905060008160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156118fb578160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600601549081150290604051600060405180830381858888f1935050505015156118f657600080fd5b611a31565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600601546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156119ea57600080fd5b505af11580156119fe573d6000803e3d6000fd5b505050506040513d6020811015611a1457600080fd5b81019080805190602001909291905050501515611a3057600080fd5b5b50505050565b600080600284815481101515611a4957fe5b906000526020600020906004020191506003600085815260200190815260200160002083815481101515611a7957fe5b9060005260206000209060080201905060008160040154118015611ad8575060008160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b8015611b3357508060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15611c6c57600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600401546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611c2557600080fd5b505af1158015611c39573d6000803e3d6000fd5b505050506040513d6020811015611c4f57600080fd5b81019080805190602001909291905050501515611c6b57600080fd5b5b60008260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611d1c578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600601549081150290604051600060405180830381858888f193505050501515611d1757600080fd5b611e52565b8160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600601546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611e0b57600080fd5b505af1158015611e1f573d6000803e3d6000fd5b505050506040513d6020811015611e3557600080fd5b81019080805190602001909291905050501515611e5157600080fd5b5b505050505600a165627a7a723058200dcd923834899df9ca768c4793e57d863268d631702008e6322287c40598364a0029"
}