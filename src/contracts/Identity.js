module.exports = {
    "abi": [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_key",
                    "type": "bytes32"
                }
            ],
            "name": "getKeyPurpose",
            "outputs": [
                {
                    "name": "purpose",
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
                    "name": "_key",
                    "type": "bytes32"
                }
            ],
            "name": "getKey",
            "outputs": [
                {
                    "name": "purpose",
                    "type": "uint256"
                },
                {
                    "name": "keyType",
                    "type": "uint256"
                },
                {
                    "name": "key",
                    "type": "bytes32"
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
                    "name": "_key",
                    "type": "bytes32"
                },
                {
                    "name": "_purpose",
                    "type": "uint256"
                },
                {
                    "name": "_type",
                    "type": "uint256"
                }
            ],
            "name": "addKey",
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
                    "name": "_claimType",
                    "type": "uint256"
                }
            ],
            "name": "getClaimIdsByType",
            "outputs": [
                {
                    "name": "claimIds",
                    "type": "bytes32[]"
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
                    "name": "_claimId",
                    "type": "bytes32"
                }
            ],
            "name": "removeClaim",
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
                    "name": "_str",
                    "type": "bytes"
                },
                {
                    "name": "_offset",
                    "type": "uint256"
                },
                {
                    "name": "_length",
                    "type": "uint256"
                }
            ],
            "name": "getBytes",
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
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "name": "_approve",
                    "type": "bool"
                }
            ],
            "name": "approve",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_key",
                    "type": "bytes32"
                }
            ],
            "name": "removeKey",
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
                    "name": "_purpose",
                    "type": "uint256"
                }
            ],
            "name": "getKeysByPurpose",
            "outputs": [
                {
                    "name": "_keys",
                    "type": "bytes32[]"
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
                    "name": "_claimType",
                    "type": "uint256"
                },
                {
                    "name": "_scheme",
                    "type": "uint256"
                },
                {
                    "name": "_issuer",
                    "type": "address"
                },
                {
                    "name": "_signature",
                    "type": "bytes"
                },
                {
                    "name": "_data",
                    "type": "bytes"
                },
                {
                    "name": "_uri",
                    "type": "string"
                }
            ],
            "name": "addClaim",
            "outputs": [
                {
                    "name": "claimRequestId",
                    "type": "bytes32"
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
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "execute",
            "outputs": [
                {
                    "name": "executionId",
                    "type": "uint256"
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
                    "name": "_claimId",
                    "type": "bytes32"
                }
            ],
            "name": "getClaim",
            "outputs": [
                {
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "name": "scheme",
                    "type": "uint256"
                },
                {
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "name": "uri",
                    "type": "string"
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
                    "name": "_key",
                    "type": "bytes32"
                },
                {
                    "name": "_purpose",
                    "type": "uint256"
                }
            ],
            "name": "keyHasPurpose",
            "outputs": [
                {
                    "name": "result",
                    "type": "bool"
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
                    "name": "_str",
                    "type": "string"
                },
                {
                    "name": "_offset",
                    "type": "uint256"
                },
                {
                    "name": "_length",
                    "type": "uint256"
                }
            ],
            "name": "getString",
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
            "inputs": [
                {
                    "name": "_claimType",
                    "type": "uint256[]"
                },
                {
                    "name": "_scheme",
                    "type": "uint256[]"
                },
                {
                    "name": "_issuer",
                    "type": "address[]"
                },
                {
                    "name": "_signature",
                    "type": "bytes"
                },
                {
                    "name": "_data",
                    "type": "bytes"
                },
                {
                    "name": "_uri",
                    "type": "string"
                },
                {
                    "name": "_sigSizes",
                    "type": "uint256[]"
                },
                {
                    "name": "dataSizes",
                    "type": "uint256[]"
                },
                {
                    "name": "uriSizes",
                    "type": "uint256[]"
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
                    "name": "claimRequestId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "scheme",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "ClaimRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "claimId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "signatureType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "signature",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "claim",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "ClaimAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "claimId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "scheme",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "ClaimAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "claimId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "scheme",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "ClaimRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "claimId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "claimType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "scheme",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "issuer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "ClaimChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "executionId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "ExecutionFailed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "key",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "purpose",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "keyType",
                    "type": "uint256"
                }
            ],
            "name": "KeyAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "key",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "purpose",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "keyType",
                    "type": "uint256"
                }
            ],
            "name": "KeyRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "executionId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "ExecutionRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "executionId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "Executed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "executionId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "Approved",
            "type": "event"
        }
    ],
    "data": "60806040523480156200001157600080fd5b506040516200388838038062003888833981018060405262000037919081019062000b37565b60008060008060008033604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390209050806001600083600019166000191681526020019081526020016000206002018160001916905550600180600083600019166000191681526020019081526020016000206000018190555060018060008360001916600019168152602001908152602001600020600101819055506002600060018152602001908152602001600020819080600181540180825580915050906001820390600052602060002001600090919290919091509060001916905550600180600083600019166000191681526020019081526020016000206000015482600019167f480000bb1edad8ca1470381cc334b1917fbd51c6531f3a623ea8e0ec7e38a6e960405160405180910390a450600093506000925060009150600090505b8d51811015620005c9578b81815181101515620001c057fe5b906020019060200201518e82815181101515620001d957fe5b90602001906020020151604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401828152602001925050506040518091039020945060c0604051908101604052808f838151811015156200025757fe5b9060200190602002015181526020018e838151811015156200027557fe5b9060200190602002015181526020018d838151811015156200029357fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff168152602001620002ec8d878c86815181101515620002cd57fe5b90602001906020020151620005dd640100000000026401000000009004565b8152602001620003258c858b868151811015156200030657fe5b90602001906020020151620005dd640100000000026401000000009004565b81526020016200035e8b868a868151811015156200033f57fe5b90602001906020020151620006e9640100000000026401000000009004565b815250600560008760001916600019168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003019080519060200190620003f5929190620007fb565b50608082015181600401908051906020019062000414929190620007fb565b5060a08201518160050190805190602001906200043392919062000882565b5090505087818151811015156200044657fe5b906020019060200201518401935085818151811015156200046357fe5b906020019060200201518301925086818151811015156200048057fe5b906020019060200201518201915060056000866000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166005600087600019166000191681526020019081526020016000206000015486600019167f46149b18aa084502c3f12bc75e19eda8bda8d102b82cce8474677a6d0d5f43c5600560008a6000191660001916815260200190815260200160002060010154600560008b60001916600019168152602001908152602001600020600301600560008c60001916600019168152602001908152602001600020600401600560008d60001916600019168152602001908152602001600020600501604051620005b3949392919062000e1e565b60405180910390a48080600101915050620001a7565b505050505050505050505050505062000fe8565b606080600080846040519080825280601f01601f191660200182016040528015620006175781602001602082028038833980820191505090505b509250600091508590505b848601811015620006dc5786818151811015156200063c57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000283838151811015156200069657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508180600101925050808060010191505062000622565b8293505050509392505050565b6060806060600080879350856040519080825280601f01601f191660200182016040528015620007285781602001602082028038833980820191505090505b509250600091508690505b858701811015620007ed5783818151811015156200074d57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383815181101515620007a757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508180600101925050808060010191505062000733565b829450505050509392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200083e57805160ff19168380011785556200086f565b828001600101855582156200086f579182015b828111156200086e57825182559160200191906001019062000851565b5b5090506200087e919062000909565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620008c557805160ff1916838001178555620008f6565b82800160010185558215620008f6579182015b82811115620008f5578251825591602001919060010190620008d8565b5b50905062000905919062000909565b5090565b6200092e91905b808211156200092a57600081600090555060010162000910565b5090565b90565b60006200093f825162000f88565b905092915050565b600082601f83011215156200095b57600080fd5b8151620009726200096c8262000eae565b62000e80565b915081818352602084019350602081019050838560208402820111156200099857600080fd5b60005b83811015620009cc5781620009b1888262000931565b8452602084019350602083019250506001810190506200099b565b5050505092915050565b600082601f8301121515620009ea57600080fd5b815162000a01620009fb8262000ed7565b62000e80565b9150818183526020840193506020810190508385602084028201111562000a2757600080fd5b60005b8381101562000a5b578162000a40888262000b21565b84526020840193506020830192505060018101905062000a2a565b5050505092915050565b600082601f830112151562000a7957600080fd5b815162000a9062000a8a8262000f00565b62000e80565b9150808252602083016020830185838301111562000aad57600080fd5b62000aba83828462000fb2565b50505092915050565b600082601f830112151562000ad757600080fd5b815162000aee62000ae88262000f2d565b62000e80565b9150808252602083016020830185838301111562000b0b57600080fd5b62000b1883828462000fb2565b50505092915050565b600062000b2f825162000fa8565b905092915050565b60008060008060008060008060006101208a8c03121562000b5757600080fd5b60008a015167ffffffffffffffff81111562000b7257600080fd5b62000b808c828d01620009d6565b99505060208a015167ffffffffffffffff81111562000b9e57600080fd5b62000bac8c828d01620009d6565b98505060408a015167ffffffffffffffff81111562000bca57600080fd5b62000bd88c828d0162000947565b97505060608a015167ffffffffffffffff81111562000bf657600080fd5b62000c048c828d0162000a65565b96505060808a015167ffffffffffffffff81111562000c2257600080fd5b62000c308c828d0162000a65565b95505060a08a015167ffffffffffffffff81111562000c4e57600080fd5b62000c5c8c828d0162000ac3565b94505060c08a015167ffffffffffffffff81111562000c7a57600080fd5b62000c888c828d01620009d6565b93505060e08a015167ffffffffffffffff81111562000ca657600080fd5b62000cb48c828d01620009d6565b9250506101008a015167ffffffffffffffff81111562000cd357600080fd5b62000ce18c828d01620009d6565b9150509295985092959850929598565b60008154600181166000811462000d11576001811462000d325762000d77565b607f600283041680865260ff19831660208701526040860193505062000d77565b6002820480865260208601955062000d4a8562000f5a565b60005b8281101562000d6e5781548189015260018201915060208101905062000d4d565b80880195505050505b505092915050565b60008154600181166000811462000d9f576001811462000dc05762000e05565b607f600283041680865260ff19831660208701526040860193505062000e05565b6002820480865260208601955062000dd88562000f6c565b60005b8281101562000dfc5781548189015260018201915060208101905062000ddb565b80880195505050505b505092915050565b62000e188162000f7e565b82525050565b600060808201905062000e35600083018762000e0d565b818103602083015262000e49818662000cf1565b9050818103604083015262000e5f818562000cf1565b9050818103606083015262000e75818462000d7f565b905095945050505050565b6000604051905081810181811067ffffffffffffffff8211171562000ea457600080fd5b8060405250919050565b600067ffffffffffffffff82111562000ec657600080fd5b602082029050602081019050919050565b600067ffffffffffffffff82111562000eef57600080fd5b602082029050602081019050919050565b600067ffffffffffffffff82111562000f1857600080fd5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff82111562000f4557600080fd5b601f19601f8301169050602081019050919050565b60008160005260206000209050919050565b60008160005260206000209050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000fd257808201518184015260208101905062000fb5565b8381111562000fe2576000848401525b50505050565b6128908062000ff86000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063032c1a8a146100d557806312aaac70146101125780631d38124014610151578063262b54f51461018e5780634eee424a146101cb5780635d2cfd6114610208578063747442d314610245578063862642f5146102825780639010f726146102bf578063b1a34e0d146102fc578063b61d27f614610339578063c9100bcb14610376578063d202158d146103b8578063df9319be146103f5575b600080fd5b3480156100e157600080fd5b506100fc60048036036100f79190810190611dc5565b610432565b6040516101099190612523565b60405180910390f35b34801561011e57600080fd5b5061013960048036036101349190810190611dc5565b61045a565b60405161014893929190612668565b60405180910390f35b34801561015d57600080fd5b5061017860048036036101739190810190611e2a565b6104c9565b60405161018591906123e7565b60405180910390f35b34801561019a57600080fd5b506101b560048036036101b09190810190611f47565b6106f6565b6040516101c291906123c5565b60405180910390f35b3480156101d757600080fd5b506101f260048036036101ed9190810190611dc5565b610765565b6040516101ff91906123e7565b60405180910390f35b34801561021457600080fd5b5061022f600480360361022a9190810190611e79565b6109f2565b60405161023c919061241d565b60405180910390f35b34801561025157600080fd5b5061026c60048036036102679190810190611f70565b610af9565b60405161027991906123e7565b60405180910390f35b34801561028e57600080fd5b506102a960048036036102a49190810190611dc5565b610ed2565b6040516102b691906123e7565b60405180910390f35b3480156102cb57600080fd5b506102e660048036036102e19190810190611f47565b61100a565b6040516102f391906123c5565b60405180910390f35b34801561030857600080fd5b50610323600480360361031e9190810190611fac565b611079565b6040516103309190612402565b60405180910390f35b34801561034557600080fd5b50610360600480360361035b9190810190611d5e565b611423565b60405161036d9190612523565b60405180910390f35b34801561038257600080fd5b5061039d60048036036103989190810190611dc5565b61166d565b6040516103af969594939291906125f2565b60405180910390f35b3480156103c457600080fd5b506103df60048036036103da9190810190611dee565b611937565b6040516103ec91906123e7565b60405180910390f35b34801561040157600080fd5b5061041c60048036036104179190810190611ee0565b6119a0565b6040516104299190612461565b60405180910390f35b6000600160008360001916600019168152602001908152602001600020600001549050919050565b60008060006001600085600019166000191681526020019081526020016000206000015460016000866000191660001916815260200190815260200160002060010154600160008760001916600019168152602001908152602001600020600201549250925092509193909250565b60008360001916600160008660001916600019168152602001908152602001600020600201546000191614151515610536576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052d906124a3565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610608576105c633604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611937565b1515610607576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105fe906124e3565b60405180910390fd5b5b8360016000866000191660001916815260200190815260200160002060020181600019169055508260016000866000191660001916815260200190815260200160002060000181905550816001600086600019166000191681526020019081526020016000206001018190555060026000848152602001908152602001600020849080600181540180825580915050906001820390600052602060002001600090919290919091509060001916905550818385600019167f480000bb1edad8ca1470381cc334b1917fbd51c6531f3a623ea8e0ec7e38a6e960405160405180910390a4600190509392505050565b60606006600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561075957602002820191906000526020600020905b81546000191681526020019060010190808311610741575b50505050509050919050565b60003073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610839576107f733604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611937565b1515610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082f906124e3565b60405180910390fd5b5b60056000836000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166005600084600019166000191681526020019081526020016000206000015483600019167f3cf57863a89432c61c4a27073c6ee39e8a764bff5a05aebfbcdcdc80b2e6130a60056000876000191660001916815260200190815260200160002060010154600560008860001916600019168152602001908152602001600020600301600560008960001916600019168152602001908152602001600020600401600560008a6000191660001916815260200190815260200160002060050160405161095c9493929190612598565b60405180910390a460056000836000191660001916815260200190815260200160002060008082016000905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006109c79190611aad565b6004820160006109d79190611aad565b6005820160006109e79190611af5565b505060019050919050565b606080600080846040519080825280601f01601f191660200182016040528015610a2b5781602001602082028038833980820191505090505b509250600091508590505b848601811015610aec578681815181101515610a4e57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383815181101515610aa757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250508080600101915050610a36565b8293505050509392505050565b6000610b5633604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206002611937565b1515610b97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8e90612483565b60405180910390fd5b827fb3932da477fe5d6c8ff2eafef050c0f3a1af18fc07121001482600f36f3715d883604051610bc791906123e7565b60405180910390a2600115158215151415610e985760016003600085815260200190815260200160002060030160006101000a81548160ff0219169083151502179055506003600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166003600085815260200190815260200160002060020160006040518083805460018160011615610100020316600290048015610cd55780601f10610caa57610100808354040283529160200191610cd5565b820191906000526020600020905b815481529060010190602001808311610cb857829003601f168201915b50508260ff168152602001925050506000604051808303816000865af191505090508015610de25760016003600085815260200190815260200160002060030160016101000a81548160ff02191690831515021790555060036000848152602001908152602001600020600101546003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16847f1f920dbda597d7bf95035464170fa58d0a4b57f13a1c315ace6793b9f63688b860036000888152602001908152602001600020600201604051610dd5919061243f565b60405180910390a4610ecc565b60036000848152602001908152602001600020600101546003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16847fe10c49d9f7c71da23262367013434763cfdb2332267641728d25cd712c5c6a6860036000888152602001908152602001600020600201604051610e8b919061243f565b60405180910390a4610ecc565b60006003600085815260200190815260200160002060030160006101000a81548160ff021916908315150217905550600190505b92915050565b600081600019166001600084600019166000191681526020019081526020016000206002015460001916141515610f3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3590612503565b60405180910390fd5b600160008360001916600019168152602001908152602001600020600101546001600084600019166000191681526020019081526020016000206000015460016000856000191660001916815260200190815260200160002060020154600019167f585a4aef50f8267a92b32412b331b20f7f8b96f2245b253b9cc50dcc621d339760405160405180910390a460016000836000191660001916815260200190815260200160002060008082016000905560018201600090556002820160009055505060019050919050565b60606002600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561106d57602002820191906000526020600020905b81546000191681526020019060010190808311611055575b50505050509050919050565b6000808588604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401828152602001925050506040518091039020600481600019169055508090503073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156111b45761117233604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206003611937565b15156111b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111aa906124e3565b60405180910390fd5b5b8573ffffffffffffffffffffffffffffffffffffffff16600560006004546000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561126f576006600089815260200190815260200160002060045490806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055505b876005600060045460001916600019168152602001908152602001600020600001819055508660056000600454600019166000191681526020019081526020016000206001018190555085600560006004546000191660001916815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846005600060045460001916600019168152602001908152602001600020600301908051906020019061134c929190611b3d565b508360056000600454600019166000191681526020019081526020016000206004019080519060200190611381929190611b3d565b5082600560006004546000191660001916815260200190815260200160002060050190805190602001906113b6929190611bbd565b508573ffffffffffffffffffffffffffffffffffffffff1688600454600019167f46149b18aa084502c3f12bc75e19eda8bda8d102b82cce8474677a6d0d5f43c58a89898960405161140b949392919061253e565b60405180910390a46004549150509695505050505050565b6000600360008054815260200190815260200160002060030160019054906101000a900460ff1615151561148c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611483906124c3565b60405180910390fd5b83600360008054815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826003600080548152602001908152602001600020600101819055508160036000805481526020019081526020016000206002019080519060200190611529929190611b3d565b50828473ffffffffffffffffffffffffffffffffffffffff166000547f8afcfabcb00e47a53a8fc3e9f23ff47ee1926194bb1350dd007c50b412a6cee885604051611574919061241d565b60405180910390a46115d733604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611937565b80611639575061163833604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206002611937565b5b1561164d5761164b6000546001610af9565b505b600080815480929190600101919050555060016000540390509392505050565b600080600060608060606005600088600019166000191681526020019081526020016000206000015460056000896000191660001916815260200190815260200160002060010154600560008a6000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600560008b60001916600019168152602001908152602001600020600301600560008c60001916600019168152602001908152602001600020600401600560008d60001916600019168152602001908152602001600020600501828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156117e35780601f106117b8576101008083540402835291602001916117e3565b820191906000526020600020905b8154815290600101906020018083116117c657829003601f168201915b50505050509250818054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561187f5780601f106118545761010080835404028352916020019161187f565b820191906000526020600020905b81548152906001019060200180831161186257829003601f168201915b50505050509150808054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561191b5780601f106118f05761010080835404028352916020019161191b565b820191906000526020600020905b8154815290600101906020018083116118fe57829003601f168201915b5050505050905095509550955095509550955091939550919395565b6000806000600102600160008660001916600019168152602001908152602001600020600201546000191614156119715760009150611999565b8260016000866000191660001916815260200190815260200160002060000154111590508091505b5092915050565b6060806060600080879350856040519080825280601f01601f1916602001820160405280156119de5781602001602082028038833980820191505090505b509250600091508690505b858701811015611a9f578381815181101515611a0157fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383815181101515611a5a57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350818060010192505080806001019150506119e9565b829450505050509392505050565b50805460018160011615610100020316600290046000825580601f10611ad35750611af2565b601f016020900490600052602060002090810190611af19190611c3d565b5b50565b50805460018160011615610100020316600290046000825580601f10611b1b5750611b3a565b601f016020900490600052602060002090810190611b399190611c3d565b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611b7e57805160ff1916838001178555611bac565b82800160010185558215611bac579182015b82811115611bab578251825591602001919060010190611b90565b5b509050611bb99190611c3d565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611bfe57805160ff1916838001178555611c2c565b82800160010185558215611c2c579182015b82811115611c2b578251825591602001919060010190611c10565b5b509050611c399190611c3d565b5090565b611c5f91905b80821115611c5b576000816000905550600101611c43565b5090565b90565b6000611c6e82356127c3565b905092915050565b6000611c8282356127e3565b905092915050565b6000611c9682356127ef565b905092915050565b600082601f8301121515611cb157600080fd5b8135611cc4611cbf826126cc565b61269f565b91508082526020830160208301858383011115611ce057600080fd5b611ceb838284612803565b50505092915050565b600082601f8301121515611d0757600080fd5b8135611d1a611d15826126f8565b61269f565b91508082526020830160208301858383011115611d3657600080fd5b611d41838284612803565b50505092915050565b6000611d5682356127f9565b905092915050565b600080600060608486031215611d7357600080fd5b6000611d8186828701611c62565b9350506020611d9286828701611d4a565b925050604084013567ffffffffffffffff811115611daf57600080fd5b611dbb86828701611c9e565b9150509250925092565b600060208284031215611dd757600080fd5b6000611de584828501611c8a565b91505092915050565b60008060408385031215611e0157600080fd5b6000611e0f85828601611c8a565b9250506020611e2085828601611d4a565b9150509250929050565b600080600060608486031215611e3f57600080fd5b6000611e4d86828701611c8a565b9350506020611e5e86828701611d4a565b9250506040611e6f86828701611d4a565b9150509250925092565b600080600060608486031215611e8e57600080fd5b600084013567ffffffffffffffff811115611ea857600080fd5b611eb486828701611c9e565b9350506020611ec586828701611d4a565b9250506040611ed686828701611d4a565b9150509250925092565b600080600060608486031215611ef557600080fd5b600084013567ffffffffffffffff811115611f0f57600080fd5b611f1b86828701611cf4565b9350506020611f2c86828701611d4a565b9250506040611f3d86828701611d4a565b9150509250925092565b600060208284031215611f5957600080fd5b6000611f6784828501611d4a565b91505092915050565b60008060408385031215611f8357600080fd5b6000611f9185828601611d4a565b9250506020611fa285828601611c76565b9150509250929050565b60008060008060008060c08789031215611fc557600080fd5b6000611fd389828a01611d4a565b9650506020611fe489828a01611d4a565b9550506040611ff589828a01611c62565b945050606087013567ffffffffffffffff81111561201257600080fd5b61201e89828a01611c9e565b935050608087013567ffffffffffffffff81111561203b57600080fd5b61204789828a01611c9e565b92505060a087013567ffffffffffffffff81111561206457600080fd5b61207089828a01611cf4565b9150509295509295509295565b61208681612783565b82525050565b600061209782612755565b8084526020840193506120a983612724565b60005b828110156120db576120bf8683516120f6565b6120c882612776565b91506020860195506001810190506120ac565b50849250505092915050565b6120f0816127a3565b82525050565b6120ff816127af565b82525050565b600061211082612760565b808452612124816020860160208601612812565b61212d81612845565b602085010191505092915050565b6000815460018116600081146121585760018114612178576121b9565b607f600283041680865260ff1983166020870152604086019350506121b9565b6002820480865260208601955061218e85612731565b60005b828110156121b057815481890152600182019150602081019050612191565b80880195505050505b505092915050565b60006121cc8261276b565b8084526121e0816020860160208601612812565b6121e981612845565b602085010191505092915050565b600081546001811660008114612214576001811461223457612275565b607f600283041680865260ff198316602087015260408601935050612275565b6002820480865260208601955061224a85612743565b60005b8281101561226c5781548189015260018201915060208101905061224d565b80880195505050505b505092915050565b6000601f82527f53656e64657220646f6573206e6f74206861766520616374696f6e206b6579006020830152604082019050919050565b6000601282527f4b657920616c72656164792065786973747300000000000000000000000000006020830152604082019050919050565b6000601082527f416c7265616479206578656375746564000000000000000000000000000000006020830152604082019050919050565b6000602382527f53656e64657220646f6573206e6f742068617665206d616e6167656d656e742060208301527f6b657900000000000000000000000000000000000000000000000000000000006040830152606082019050919050565b6000600b82527f4e6f2073756368206b65790000000000000000000000000000000000000000006020830152604082019050919050565b6123bf816127b9565b82525050565b600060208201905081810360008301526123df818461208c565b905092915050565b60006020820190506123fc60008301846120e7565b92915050565b600060208201905061241760008301846120f6565b92915050565b600060208201905081810360008301526124378184612105565b905092915050565b60006020820190508181036000830152612459818461213b565b905092915050565b6000602082019050818103600083015261247b81846121c1565b905092915050565b6000602082019050818103600083015261249c8161227d565b9050919050565b600060208201905081810360008301526124bc816122b4565b9050919050565b600060208201905081810360008301526124dc816122eb565b9050919050565b600060208201905081810360008301526124fc81612322565b9050919050565b6000602082019050818103600083015261251c8161237f565b9050919050565b600060208201905061253860008301846123b6565b92915050565b600060808201905061255360008301876123b6565b81810360208301526125658186612105565b905081810360408301526125798185612105565b9050818103606083015261258d81846121c1565b905095945050505050565b60006080820190506125ad60008301876123b6565b81810360208301526125bf818661213b565b905081810360408301526125d3818561213b565b905081810360608301526125e781846121f7565b905095945050505050565b600060c08201905061260760008301896123b6565b61261460208301886123b6565b612621604083018761207d565b81810360608301526126338186612105565b905081810360808301526126478185612105565b905081810360a083015261265b81846121c1565b9050979650505050505050565b600060608201905061267d60008301866123b6565b61268a60208301856123b6565b61269760408301846120f6565b949350505050565b6000604051905081810181811067ffffffffffffffff821117156126c257600080fd5b8060405250919050565b600067ffffffffffffffff8211156126e357600080fd5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff82111561270f57600080fd5b601f19601f8301169050602081019050919050565b6000602082019050919050565b60008160005260206000209050919050565b60008160005260206000209050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612830578082015181840152602081019050612815565b8381111561283f576000848401525b50505050565b6000601f19601f83011690509190505600a265627a7a72305820da63728e814adc5fbb8ce406c2aa9c47af19b6873153432b11cc02054e3935e46c6578706572696d656e74616cf50037"
}