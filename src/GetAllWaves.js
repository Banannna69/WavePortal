import React, { useEffect, useState } from "react"
import "./App.css"
import { ethers } from "ethers"
import contractABI from './contractAbi.json'
import contractAddress from './Config.json'

//const [allWaves, setAllWaves] = useState([])
const getAllWaves = async (currentAccount, setCurrentAccount, allWaves, setAllWaves) => {
  try {
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new ethers.Contract(contractAddress.addr, contractABI.abi, signer)
      //调用合约中的getAllWaves方法
      const waves = await wavePortalContract.getAllWaves()

      //筛选出 address,timestamp,message 在前端中显示
      let wavesInit = []
      waves.forEach(wave => {
        wavesInit.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message
        })
      })


      setAllWaves(wavesInit)

      wavePortalContract.on("NewWave", (from, timestamp, message) => {
        console.log("NewWave", from, timestamp, message)

        setAllWaves(prevState => [...prevState, {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message
        }])
      })
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error)
  }
}

export default getAllWaves