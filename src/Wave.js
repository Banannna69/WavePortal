import React, { useEffect, useState } from "react"
import "./App.css"
import { ethers } from "ethers"
import contractABI from './contractAbi.json'
import contractAddress from './Config.json'
import './Config'


const wave = async (currentAccount, setCurrentAccount, message) => {
  try {
    //ethereum是提供前端与合约交互的库
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new ethers.Contract(contractAddress.addr, contractABI.abi, signer)

      let count = await wavePortalContract.getTotalWaves()
      console.log("Retrieved total wave count...", count.toNumber())

      //const waveTxn = await wavePortalContract.wave("this is a message")
      const waveTxn = await wavePortalContract.wave(message, { gasLimit: 3000000 })
      console.log("Mining...", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined  --", waveTxn.hash)

      count = await wavePortalContract.getTotalWaves()
      console.log("Retrieved total wave count...", count.toNumber())

    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error)
  }
}

export default wave