const contract = require("../blockchain/build/contracts/Twibber.json")

const contractAbi = contract.abi
const contractAddress = contract.networks["3"].address

const twibberContractInstance = web3.eth.contract(contractAbi).at(contractAddress)

const setUserAddress = (address) => {
    document.querySelector("#user-address > a").href = `https://ropsten.etherscan.io/address/${address}`
    document.querySelector("#user-address > a").innerHTML = `${address.slice(0,7)}...`
}

const setUserName = (name) => {
  console.log("setUsername called")
  document.querySelector("#user-name").innerHTML = `${name}`
}

const getMsgCount = () => {
  twibberContractInstance.getMsgCount({},(err, count) => {
    if (err) console.log(err)
    document.querySelector("#post-count").innerHTML = `${count.toNumber()}`
  })
}

const getMessages = () => {
  const events = twibberContractInstance.allEvents({
    "fromBlock" : 0,
    "toBlock" : "latest",
  })

  events.get(function(err, logs) {
      if (err) {
          console.log(err)
          return
      }
      console.log("Received logs")

      // clear previous messages
      const postHolderElement = document.querySelector(".post-holder")
      while (postHolderElement.firstChild) {
        postHolderElement.removeChild(postHolderElement.firstChild);
      }

      logs.forEach(function(elem, index) {
        console.log(elem)
        const message = elem.args.message
        const user = elem.args.user
        //const timestamp = Date(web3.eth.getBlock(elem.blockNumber).timestamp * 1000)    
        var el = document.createElement('div');
        const messageRowString = 
        `<div class="post-preview">
          <h3 class="post-subtitle">
            ${message}
          </h3>
          <p class="post-meta">Posted by
            <a href="https://ropsten.etherscan.io/address/${user}">${user.slice(0,7)}...</a>
          </p>
        </div>
        <hr>`
        el.innerHTML =  messageRowString;  
        postHolderElement.appendChild(el.firstChild)
      })
  })
  // easy way to update message count
  getMsgCount()
}


window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (typeof window.ethereum !== "undefined") {
        window.web3 = new Web3(ethereum);

        // get messages from logs
        //every 5 seconds check for messages
        setInterval(getMessages, 5000)

        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.getAccounts((err, accounts) =>{
                const userAccount = accounts[0]
                
                setUserAddress(userAccount)
                getMsgCount()

            })
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed

        // get messages from logs
        //every 5 seconds check for messages
        setInterval(getMessages, 5000)
        web3.eth.getAccounts((err, accounts) =>{
          const userAccount = accounts[0]
                
          setUserAddress(userAccount)
          getMsgCount()
        })
    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const sendMessage = async (event) => {
  event.preventDefault()
  console.log("sending message...")
  const message = document.querySelector("#message").value
  console.log(message)
  try {
    // Request account access if needed
    if (typeof window.ethereum !== "undefined") { 
      await ethereum.enable();
    }
    // Acccounts now exposed
    web3.eth.getAccounts((err, accounts) =>{
      twibberContractInstance.sendMessage(message, (err, result) => {
        if (err) console.log(err)
        console.log("message sent.")
        console.log(result)

      })
    })
  } catch(err) {
    console.log(err)
  }
}

document.querySelector("#sendMessageButton").addEventListener("click", sendMessage)