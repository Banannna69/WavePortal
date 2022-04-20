import { Contract, ethers } from "ethers"
import './App.css'
import contractABI from "./contractAbi.json"
import React, { useEffect, useState } from "react"



const App = () => {
  const [currentAccount, setCurrentAccount] = useState("")
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"


  const wave = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        //ether 是一个帮助前端与合约交互的库
        //provider 与以太坊节点交互
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)


        let count = await wavePortalContract.getTotalWaves()
        console.log("Rereieved total wave count...", count.toNumber())

        const waveTxn = await wavePortalContract.wave()
        console.log("Minging...", waveTxn.hash)

        await waveTxn.wait()
        console.log("Mined --", waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  class Wave extends React.Component {
    render () {
      return (
        <div className="PositionMiddle">
          <button className="waveButton" onClick={wave}>
            Wave at Me
          </button>
        </div>
      )
    }
  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>
        <div className="bio" >
          That's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        <Wave />
      </div>
    </div>
  )
}

export default App