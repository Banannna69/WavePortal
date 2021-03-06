import React, { useEffect, useState } from "react"
import "./App.css"



const checkIfWalletIsConnected = async (currentAccount, setCurrentAccount) => {
  try {
    const { ethereum } = window

    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    //Check if we're authorized to access the user's wallet

    const accounts = await ethereum.request({ method: "eth_accounts" })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log("Found an authorized account:", account)
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error)
  }
}





export default checkIfWalletIsConnected