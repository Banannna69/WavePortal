import React, { useEffect, useState } from "react"
import "./App.css"

const connectWallet = async (currentAccount, setCurrentAccount) => {
  try {
    const { ethereum } = window

    if (!ethereum) {
      alert("Get MetaMask!")
      return
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    console.log("Connected", accounts[0])
    setCurrentAccount(accounts[0])
  } catch (error) {
    console.log(error)
  }
}



export default connectWallet