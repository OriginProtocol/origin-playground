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
    "data": "608060405234801561001057600080fd5b50610302806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634d3820eb1461005c57806376b1658814610073578063a87430ba1461008a575b600080fd5b34801561006857600080fd5b5061007161010d565b005b34801561007f57600080fd5b50610088610223565b005b34801561009657600080fd5b506100cb600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102a3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b336000803273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fff3eabe1067b08ba8af3e8d3191eebeae9b35de7a7aeee40f2ad1ceb6a8876073233604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820502d2674b86eedc3f83836607d60ed731565158b5fcc6d60ec30b96b7f65e5af0029"
}