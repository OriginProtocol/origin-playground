module.exports = {
    "abi": [
        {
            "constant": false,
            "inputs": [],
            "name": "registerUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "clearUser",
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
            "name": "users",
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_address",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_identity",
                    "type": "address"
                }
            ],
            "name": "NewUser",
            "type": "event"
        }
    ],
    "data": "608060405234801561001057600080fd5b5061016c806100206000396000f30060806040526004361061003d5763ffffffff60e060020a6000350416634d3820eb811461004257806376b1658814610059578063a87430ba1461006e575b600080fd5b34801561004e57600080fd5b506100576100ab565b005b34801561006557600080fd5b50610057610106565b34801561007a57600080fd5b5061008f600160a060020a0360043516610125565b60408051600160a060020a039092168252519081900360200190f35b32600081815260208181526040918290208054600160a060020a0319163390811790915582519384529083015280517fff3eabe1067b08ba8af3e8d3191eebeae9b35de7a7aeee40f2ad1ceb6a8876079281900390910190a1565b3360009081526020819052604090208054600160a060020a0319169055565b600060208190529081526040902054600160a060020a0316815600a165627a7a7230582059aa81fa386005c11335bc7cd34008772784bcaa896088cecba65553c16319f30029"
}