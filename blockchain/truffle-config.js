const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "tape empty keen wait pledge promote gather adult spend meat govern select"

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/ca6abbc599d54c1aa7e9a836902aa1e9")
      },
      network_id: 3
    }   
  }
};