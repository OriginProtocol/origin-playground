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
            "constant": true,
            "inputs": [
                {
                    "name": "_claimId",
                    "type": "bytes32"
                }
            ],
            "name": "isClaimValid",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_claimId",
                    "type": "bytes32"
                }
            ],
            "name": "getClaimSig",
            "outputs": [
                {
                    "name": "data",
                    "type": "bytes32"
                },
                {
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "name": "s",
                    "type": "bytes32"
                },
                {
                    "name": "v",
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
                    "type": "bytes32"
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
                    "type": "bytes32"
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
                    "type": "bytes32[]"
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
                    "type": "bytes32"
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
                    "type": "bytes32"
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
                    "type": "bytes32"
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
                    "type": "bytes32"
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
    "data": "606060405234156200001057600080fd5b60405162003b9138038062003b91833981016040526200003a906780000000000000009062000c26565b600080600080600033604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014019150506040518091039020905080600160008360001916600019168152602001908152602001600020600201816000191690555060018060008360001916600019168152602001908152602001600020600001819055506001806000836000191660001916815260200190815260200160002060010181905550600260006001815260200190815260200160002080548060010182816200012a9190620007c6565b916000526020600020900160008390919091509060001916905550600180600083600019166000191681526020019081526020016000206000015482600019167f480000bb1edad8ca1470381cc334b1917fbd51c6531f3a623ea8e0ec7e38a6e960405160405180910390a4506000925060009150600090505b8b518110156200058e578981815181101515620001bd57fe5b906020019060200201518c82815181101515620001d657fe5b90602001906020020151604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401828152602001925050506040518091039020935060c0604051908101604052808d838151811015156200025457fe5b9060200190602002015181526020018c838151811015156200027257fe5b9060200190602002015181526020018b838151811015156200029057fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff168152602001620002ee8b868a86815181101515620002ca57fe5b90602001906020020151620005a06401000000000262000b63176401000000009004565b815260200189838151811015156200030257fe5b906020019060200201516000191681526020016200034e898589868151811015156200032a57fe5b90602001906020020151620006ac6401000000000262001bd4176401000000009004565b815250600560008660001916600019168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003019080519060200190620003e5929190620007f5565b506080820151816004019060001916905560a0820151816005019080519060200190620004149291906200087c565b5090505085818151811015156200042757fe5b906020019060200201518301925084818151811015156200044457fe5b906020019060200201518201915060056000856000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166005600086600019166000191681526020019081526020016000206000015485600019167f4d05b1265dcc78fc8ef62fffd38d6b94ae2b1834635ff5122fc4f3f8346fb5a160056000896000191660001916815260200190815260200160002060010154600560008a60001916600019168152602001908152602001600020600301600560008b6000191660001916815260200190815260200160002060040154600560008c6000191660001916815260200190815260200160002060050160405162000578949392919062000eef565b60405180910390a48080600101915050620001a4565b505050505050505050505050620010ef565b620005aa62000903565b620005b462000903565b60008084604051805910620005c65750595b9080825280601f01601f19166020018201604052509250600091508590505b8486018110156200069f578681815181101515620005ff57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000283838151811015156200065957fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250508080600101915050620005e5565b8293505050509392505050565b620006b662000917565b620006c062000903565b620006ca62000903565b60008087935085604051805910620006df5750595b9080825280601f01601f19166020018201604052509250600091508690505b858701811015620007b85783818151811015156200071857fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000283838151811015156200077257fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250508080600101915050620006fe565b829450505050509392505050565b815481835581811511620007f057818360005260206000209182019101620007ef91906200092b565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200083857805160ff191683800117855562000869565b8280016001018555821562000869579182015b82811115620008685782518255916020019190600101906200084b565b5b50905062000878919062000953565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620008bf57805160ff1916838001178555620008f0565b82800160010185558215620008f0579182015b82811115620008ef578251825591602001919060010190620008d2565b5b509050620008ff919062000953565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b6200095091905b808211156200094c57600081600090555060010162000932565b5090565b90565b6200097891905b80821115620009745760008160009055506001016200095a565b5090565b90565b600062000989825162001085565b905092915050565b600082601f8301121515620009a557600080fd5b8151620009bc620009b68262000f78565b62000f4a565b91508181835260208401935060208101905083856020840282011115620009e257600080fd5b60005b8381101562000a165781620009fb88826200097b565b845260208401935060208301925050600181019050620009e5565b5050505092915050565b600082601f830112151562000a3457600080fd5b815162000a4b62000a458262000fa1565b62000f4a565b9150818183526020840193506020810190508385602084028201111562000a7157600080fd5b60005b8381101562000aa5578162000a8a888262000b3e565b84526020840193506020830192505060018101905062000a74565b5050505092915050565b600082601f830112151562000ac357600080fd5b815162000ada62000ad48262000fca565b62000f4a565b9150818183526020840193506020810190508385602084028201111562000b0057600080fd5b60005b8381101562000b34578162000b19888262000c10565b84526020840193506020830192505060018101905062000b03565b5050505092915050565b600062000b4c8251620010a5565b905092915050565b600082601f830112151562000b6857600080fd5b815162000b7f62000b798262000ff3565b62000f4a565b9150808252602083016020830185838301111562000b9c57600080fd5b62000ba9838284620010b9565b50505092915050565b600082601f830112151562000bc657600080fd5b815162000bdd62000bd78262001020565b62000f4a565b9150808252602083016020830185838301111562000bfa57600080fd5b62000c07838284620010b9565b50505092915050565b600062000c1e8251620010af565b905092915050565b600080600080600080600080610100898b03121562000c4457600080fd5b600089015167ffffffffffffffff81111562000c5f57600080fd5b62000c6d8b828c0162000aaf565b985050602089015167ffffffffffffffff81111562000c8b57600080fd5b62000c998b828c0162000aaf565b975050604089015167ffffffffffffffff81111562000cb757600080fd5b62000cc58b828c0162000991565b965050606089015167ffffffffffffffff81111562000ce357600080fd5b62000cf18b828c0162000b54565b955050608089015167ffffffffffffffff81111562000d0f57600080fd5b62000d1d8b828c0162000a20565b94505060a089015167ffffffffffffffff81111562000d3b57600080fd5b62000d498b828c0162000bb2565b93505060c089015167ffffffffffffffff81111562000d6757600080fd5b62000d758b828c0162000aaf565b92505060e089015167ffffffffffffffff81111562000d9357600080fd5b62000da18b828c0162000aaf565b9150509295985092959890939650565b62000dbc8162001071565b82525050565b60008154600181166000811462000de2576001811462000e035762000e48565b607f600283041680865260ff19831660208701526040860193505062000e48565b6002820480865260208601955062000e1b856200104d565b60005b8281101562000e3f5781548189015260018201915060208101905062000e1e565b80880195505050505b505092915050565b60008154600181166000811462000e70576001811462000e915762000ed6565b607f600283041680865260ff19831660208701526040860193505062000ed6565b6002820480865260208601955062000ea9856200105f565b60005b8281101562000ecd5781548189015260018201915060208101905062000eac565b80880195505050505b505092915050565b62000ee9816200107b565b82525050565b600060808201905062000f06600083018762000ede565b818103602083015262000f1a818662000dc2565b905062000f2b604083018562000db1565b818103606083015262000f3f818462000e50565b905095945050505050565b6000604051905081810181811067ffffffffffffffff8211171562000f6e57600080fd5b8060405250919050565b600067ffffffffffffffff82111562000f9057600080fd5b602082029050602081019050919050565b600067ffffffffffffffff82111562000fb957600080fd5b602082029050602081019050919050565b600067ffffffffffffffff82111562000fe257600080fd5b602082029050602081019050919050565b600067ffffffffffffffff8211156200100b57600080fd5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff8211156200103857600080fd5b601f19601f8301169050602081019050919050565b60008160005260206000209050919050565b60008160005260206000209050919050565b6000819050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000819050919050565b60005b83811015620010d9578082015181840152602081019050620010bc565b83811115620010e9576000848401525b50505050565b612a9280620010ff6000396000f3006060604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063032c1a8a146100eb57806312aaac70146101215780631d38124014610159578063262b54f51461018f5780633867eb41146101c55780634eee424a146101fb5780635d2cfd6114610231578063747442d314610267578063862642f51461029d5780639010f726146102d3578063a0ebcf6114610309578063b445712914610342578063b61d27f614610378578063c9100bcb146103ae578063d202158d146103e9578063df9319be1461041f575b600080fd5b34156100f657600080fd5b61010b60046101069036906120fe565b610455565b604051610118919061272d565b60405180910390f35b341561012c57600080fd5b610141600461013c9036906120fe565b61047d565b6040516101509392919061285d565b60405180910390f35b341561016457600080fd5b6101796004610174903690612163565b6104ec565b60405161018691906125de565b60405180910390f35b341561019a57600080fd5b6101af60046101aa903690612280565b6106aa565b6040516101bc91906125bc565b60405180910390f35b34156101d057600080fd5b6101e560046101e09036906120fe565b61071f565b6040516101f291906125de565b60405180910390f35b341561020657600080fd5b61021b60046102169036906120fe565b610913565b60405161022891906125de565b60405180910390f35b341561023c57600080fd5b610251600461024c9036906121b2565b610b63565b60405161025e91906126c7565b60405180910390f35b341561027257600080fd5b61028760046102829036906122a9565b610c66565b60405161029491906125de565b60405180910390f35b34156102a857600080fd5b6102bd60046102b89036906120fe565b611009565b6040516102ca91906125de565b60405180910390f35b34156102de57600080fd5b6102f360046102ee903690612280565b61110b565b60405161030091906125bc565b60405180910390f35b341561031457600080fd5b61032960046103249036906120fe565b611180565b6040516103399493929190612614565b60405180910390f35b341561034d57600080fd5b610362600461035d9036906122e5565b6113b6565b60405161036f91906125f9565b60405180910390f35b341561038357600080fd5b6103986004610393903690612097565b61171b565b6040516103a5919061272d565b60405180910390f35b34156103b957600080fd5b6103ce60046103c99036906120fe565b61192f565b6040516103e0969594939291906127ee565b60405180910390f35b34156103f457600080fd5b6104096004610404903690612127565b611b6b565b60405161041691906125de565b60405180910390f35b341561042a57600080fd5b61043f600461043a903690612219565b611bd4565b60405161044c919061270b565b60405180910390f35b6000600160008360001916600019168152602001908152602001600020600001549050919050565b60008060006001600085600019166000191681526020019081526020016000206000015460016000866000191660001916815260200190815260200160002060010154600160008760001916600019168152602001908152602001600020600201549250925092509193909250565b6000836000191660016000866000191660001916815260200190815260200160002060020154600019161415151561052357600080fd5b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105bf576105b333604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611b6b565b15156105be57600080fd5b5b836001600086600019166000191681526020019081526020016000206002018160001916905550826001600086600019166000191681526020019081526020016000206000018190555081600160008660001916600019168152602001908152602001600020600101819055506002600084815260200190815260200160002080548060010182816106519190611d59565b916000526020600020900160008690919091509060001916905550818385600019167f480000bb1edad8ca1470381cc334b1917fbd51c6531f3a623ea8e0ec7e38a6e960405160405180910390a4600190509392505050565b6106b2611d85565b6006600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561071357602002820191906000526020600020905b815460001916815260200190600101908083116106fb575b50505050509050919050565b600080600080600080600060056000896000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1695503073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614156107a85760019650610908565b6107b188611ce3565b945084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390209350853b9250600083141561081c5760009650610908565b60056000896000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691508173ffffffffffffffffffffffffffffffffffffffff1663d202158d85600560008c60001916600019168152602001908152602001600020600001546040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016108d2929190612659565b602060405180830381600087803b15156108eb57600080fd5b5af115156108f857600080fd5b5050506040518051905090508096505b505050505050919050565b60003073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109b1576109a533604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611b6b565b15156109b057600080fd5b5b60056000836000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166005600084600019166000191681526020019081526020016000206000015483600019167fe7b067e0d72c8c9ff31112abdeac4130a1acb085495698e0260411145f07972c6005600087600019166000191681526020019081526020016000206001015460056000886000191660001916815260200190815260200160002060030160056000896000191660001916815260200190815260200160002060040154600560008a60001916600019168152602001908152602001600020600501604051610ad5949392919061279b565b60405180910390a460056000836000191660001916815260200190815260200160002060008082016000905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600382016000610b409190611d99565b6004820160009055600582016000610b589190611de1565b505060019050919050565b610b6b611e29565b610b73611e29565b60008084604051805910610b845750595b9080825280601f01601f19166020018201604052509250600091508590505b848601811015610c59578681815181101515610bbb57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383815181101515610c1457fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250508080600101915050610ba3565b8293505050509392505050565b6000610cc333604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206002611b6b565b1515610cce57600080fd5b827fb3932da477fe5d6c8ff2eafef050c0f3a1af18fc07121001482600f36f3715d883604051610cfe91906125de565b60405180910390a2600115158215151415610fcf5760016003600085815260200190815260200160002060030160006101000a81548160ff0219169083151502179055506003600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166003600085815260200190815260200160002060020160006040518083805460018160011615610100020316600290048015610e0c5780601f10610de157610100808354040283529160200191610e0c565b820191906000526020600020905b815481529060010190602001808311610def57829003601f168201915b50508260ff168152602001925050506000604051808303816000865af191505090508015610f195760016003600085815260200190815260200160002060030160016101000a81548160ff02191690831515021790555060036000848152602001908152602001600020600101546003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16847f1f920dbda597d7bf95035464170fa58d0a4b57f13a1c315ace6793b9f63688b860036000888152602001908152602001600020600201604051610f0c91906126e9565b60405180910390a4611003565b60036000848152602001908152602001600020600101546003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16847fe10c49d9f7c71da23262367013434763cfdb2332267641728d25cd712c5c6a6860036000888152602001908152602001600020600201604051610fc291906126e9565b60405180910390a4611003565b60006003600085815260200190815260200160002060030160006101000a81548160ff021916908315150217905550600190505b92915050565b60008160001916600160008460001916600019168152602001908152602001600020600201546000191614151561103f57600080fd5b600160008360001916600019168152602001908152602001600020600101546001600084600019166000191681526020019081526020016000206000015460016000856000191660001916815260200190815260200160002060020154600019167f585a4aef50f8267a92b32412b331b20f7f8b96f2245b253b9cc50dcc621d339760405160405180910390a460016000836000191660001916815260200190815260200160002060008082016000905560018201600090556002820160009055505060019050919050565b611113611d85565b6002600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561117457602002820191906000526020600020905b8154600019168152602001906001019080831161115c575b50505050509050919050565b6000806000806000806000611193611e29565b600080600560008c600019166000191681526020019081526020016000206003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112485780601f1061121d57610100808354040283529160200191611248565b820191906000526020600020905b81548152906001019060200180831161122b57829003601f168201915b50505050509250604183511415156112825760008060008083600102935082600102925081600102915080905099509950995099506113a9565b6020830151955060408301519450606083015160001a9350601b8460ff1610156112ad57601b840193505b30600560008d6000191660001916815260200190815260200160002060000154600560008e6000191660001916815260200190815260200160002060040154604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140183815260200182600019166000191681526020019350505050604051809103902091508160405180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018260001916600019168152602001915050604051809103902090508086868699509950995099505b5050505050509193509193565b6000808588604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401828152602001925050506040518091039020600481600019169055508090503073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114bb576114af33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206003611b6b565b15156114ba57600080fd5b5b8573ffffffffffffffffffffffffffffffffffffffff16600560006004546000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611573576006600089815260200190815260200160002080548060010182816115559190611d59565b91600052602060002090016000600454909190915090600019169055505b876005600060045460001916600019168152602001908152602001600020600001819055508660056000600454600019166000191681526020019081526020016000206001018190555085600560006004546000191660001916815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508460056000600454600019166000191681526020019081526020016000206003019080519060200190611650929190611e3d565b50836005600060045460001916600019168152602001908152602001600020600401816000191690555082600560006004546000191660001916815260200190815260200160002060050190805190602001906116ae929190611ebd565b508573ffffffffffffffffffffffffffffffffffffffff1688600454600019167f4d05b1265dcc78fc8ef62fffd38d6b94ae2b1834635ff5122fc4f3f8346fb5a18a8989896040516117039493929190612748565b60405180910390a46004549150509695505050505050565b6000600360008054815260200190815260200160002060030160019054906101000a900460ff1615151561174e57600080fd5b83600360008054815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260036000805481526020019081526020016000206001018190555081600360008054815260200190815260200160002060020190805190602001906117eb929190611e3d565b50828473ffffffffffffffffffffffffffffffffffffffff166000547f8afcfabcb00e47a53a8fc3e9f23ff47ee1926194bb1350dd007c50b412a6cee88560405161183691906126c7565b60405180910390a461189933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206001611b6b565b806118fb57506118fa33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206002611b6b565b5b1561190f5761190d6000546001610c66565b505b600080815480929190600101919050555060016000540390509392505050565b600080600061193c611e29565b6000611946611f3d565b6005600088600019166000191681526020019081526020016000206000015460056000896000191660001916815260200190815260200160002060010154600560008a6000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600560008b60001916600019168152602001908152602001600020600301600560008c6000191660001916815260200190815260200160002060040154600560008d60001916600019168152602001908152602001600020600501828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611ab35780601f10611a8857610100808354040283529160200191611ab3565b820191906000526020600020905b815481529060010190602001808311611a9657829003601f168201915b50505050509250808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611b4f5780601f10611b2457610100808354040283529160200191611b4f565b820191906000526020600020905b815481529060010190602001808311611b3257829003601f168201915b5050505050905095509550955095509550955091939550919395565b600080600060010260016000866000191660001916815260200190815260200160002060020154600019161415611ba55760009150611bcd565b8260016000866000191660001916815260200190815260200160002060000154111590508091505b5092915050565b611bdc611f3d565b611be4611e29565b611bec611e29565b60008087935085604051805910611c005750595b9080825280601f01601f19166020018201604052509250600091508690505b858701811015611cd5578381815181101515611c3757fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383815181101515611c9057fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250508080600101915050611c1f565b829450505050509392505050565b6000806000806000611cf486611180565b8094508195508296508397505050505060018482858560405160008152602001604052604051611d279493929190612682565b60206040516020810390808403906000865af11515611d4557600080fd5b505060206040510351945050505050919050565b815481835581811511611d8057818360005260206000209182019101611d7f9190611f51565b5b505050565b602060405190810160405280600081525090565b50805460018160011615610100020316600290046000825580601f10611dbf5750611dde565b601f016020900490600052602060002090810190611ddd9190611f76565b5b50565b50805460018160011615610100020316600290046000825580601f10611e075750611e26565b601f016020900490600052602060002090810190611e259190611f76565b5b50565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611e7e57805160ff1916838001178555611eac565b82800160010185558215611eac579182015b82811115611eab578251825591602001919060010190611e90565b5b509050611eb99190611f76565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611efe57805160ff1916838001178555611f2c565b82800160010185558215611f2c579182015b82811115611f2b578251825591602001919060010190611f10565b5b509050611f399190611f76565b5090565b602060405190810160405280600081525090565b611f7391905b80821115611f6f576000816000905550600101611f57565b5090565b90565b611f9891905b80821115611f94576000816000905550600101611f7c565b5090565b90565b6000611fa782356129c5565b905092915050565b6000611fbb82356129e5565b905092915050565b6000611fcf82356129f1565b905092915050565b600082601f8301121515611fea57600080fd5b8135611ffd611ff8826128c1565b612894565b9150808252602083016020830185838301111561201957600080fd5b612024838284612a05565b50505092915050565b600082601f830112151561204057600080fd5b813561205361204e826128ed565b612894565b9150808252602083016020830185838301111561206f57600080fd5b61207a838284612a05565b50505092915050565b600061208f82356129fb565b905092915050565b6000806000606084860312156120ac57600080fd5b60006120ba86828701611f9b565b93505060206120cb86828701612083565b925050604084013567ffffffffffffffff8111156120e857600080fd5b6120f486828701611fd7565b9150509250925092565b60006020828403121561211057600080fd5b600061211e84828501611fc3565b91505092915050565b6000806040838503121561213a57600080fd5b600061214885828601611fc3565b925050602061215985828601612083565b9150509250929050565b60008060006060848603121561217857600080fd5b600061218686828701611fc3565b935050602061219786828701612083565b92505060406121a886828701612083565b9150509250925092565b6000806000606084860312156121c757600080fd5b600084013567ffffffffffffffff8111156121e157600080fd5b6121ed86828701611fd7565b93505060206121fe86828701612083565b925050604061220f86828701612083565b9150509250925092565b60008060006060848603121561222e57600080fd5b600084013567ffffffffffffffff81111561224857600080fd5b6122548682870161202d565b935050602061226586828701612083565b925050604061227686828701612083565b9150509250925092565b60006020828403121561229257600080fd5b60006122a084828501612083565b91505092915050565b600080604083850312156122bc57600080fd5b60006122ca85828601612083565b92505060206122db85828601611faf565b9150509250929050565b60008060008060008060c087890312156122fe57600080fd5b600061230c89828a01612083565b965050602061231d89828a01612083565b955050604061232e89828a01611f9b565b945050606087013567ffffffffffffffff81111561234b57600080fd5b61235789828a01611fd7565b935050608061236889828a01611fc3565b92505060a087013567ffffffffffffffff81111561238557600080fd5b61239189828a0161202d565b9150509295509295509295565b6123a781612978565b82525050565b60006123b88261294a565b8084526020840193506123ca83612919565b60005b828110156123fc576123e0868351612417565b6123e98261296b565b91506020860195506001810190506123cd565b50849250505092915050565b61241181612998565b82525050565b612420816129a4565b82525050565b600061243182612955565b808452612445816020860160208601612a14565b61244e81612a47565b602085010191505092915050565b6000815460018116600081146124795760018114612499576124da565b607f600283041680865260ff1983166020870152604086019350506124da565b600282048086526020860195506124af85612926565b60005b828110156124d1578154818901526001820191506020810190506124b2565b80880195505050505b505092915050565b60006124ed82612960565b808452612501816020860160208601612a14565b61250a81612a47565b602085010191505092915050565b600081546001811660008114612535576001811461255557612596565b607f600283041680865260ff198316602087015260408601935050612596565b6002820480865260208601955061256b85612938565b60005b8281101561258d5781548189015260018201915060208101905061256e565b80880195505050505b505092915050565b6125a7816129ae565b82525050565b6125b6816129b8565b82525050565b600060208201905081810360008301526125d681846123ad565b905092915050565b60006020820190506125f36000830184612408565b92915050565b600060208201905061260e6000830184612417565b92915050565b60006080820190506126296000830187612417565b6126366020830186612417565b6126436040830185612417565b61265060608301846125ad565b95945050505050565b600060408201905061266e6000830185612417565b61267b602083018461259e565b9392505050565b60006080820190506126976000830187612417565b6126a460208301866125ad565b6126b16040830185612417565b6126be6060830184612417565b95945050505050565b600060208201905081810360008301526126e18184612426565b905092915050565b60006020820190508181036000830152612703818461245c565b905092915050565b6000602082019050818103600083015261272581846124e2565b905092915050565b6000602082019050612742600083018461259e565b92915050565b600060808201905061275d600083018761259e565b818103602083015261276f8186612426565b905061277e6040830185612417565b818103606083015261279081846124e2565b905095945050505050565b60006080820190506127b0600083018761259e565b81810360208301526127c2818661245c565b90506127d16040830185612417565b81810360608301526127e38184612518565b905095945050505050565b600060c082019050612803600083018961259e565b612810602083018861259e565b61281d604083018761239e565b818103606083015261282f8186612426565b905061283e6080830185612417565b81810360a083015261285081846124e2565b9050979650505050505050565b6000606082019050612872600083018661259e565b61287f602083018561259e565b61288c6040830184612417565b949350505050565b6000604051905081810181811067ffffffffffffffff821117156128b757600080fd5b8060405250919050565b600067ffffffffffffffff8211156128d857600080fd5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff82111561290457600080fd5b601f19601f8301169050602081019050919050565b6000602082019050919050565b60008160005260206000209050919050565b60008160005260206000209050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b600060ff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612a32578082015181840152602081019050612a17565b83811115612a41576000848401525b50505050565b6000601f19601f83011690509190505600a265627a7a72305820b11450e49a519aa7f6d9aec4b0d5c1eecc1b4c6b6c268c08dbc07cef58037b896c6578706572696d656e74616cf50037"
}