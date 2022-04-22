import React, { useEffect, useState } from "react"
import "./App.css"
import checkIfWalletIsConnected from './checkIf'
import connectWallet from './ConnectWallet'
import "./GetAllWaves"
import wave from './Wave'
import getAllWaves from "./GetAllWaves"





function App () {
  //Just a state variable we use to store our user's public wallet.
  const [currentAccount, setCurrentAccount] = useState("")
  const [allWaves, setAllWaves] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    checkIfWalletIsConnected(currentAccount, setCurrentAccount)
  }, [])





  return (
    <>
      <div>
      </div>
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">
            👋 Wave there!
          </div>

          <div className="bio">
            That's pretty cool right? Connect your Ethereum wallet and wave at me!
          </div>



          {/* //连接钱包 */}
          {!currentAccount && (
            <button className="waveButton" onClick={() => connectWallet(currentAccount, setCurrentAccount)}>
              Connect Wallet
            </button>) || (<button className="waveButton" onClick={null}>Connected</button>)}

          {/* //输入 message */}
          {currentAccount ?
            (<textarea name="message box" className="waveButton"
              placeholder="Send me message~~~" type="text" id="_message" value={message}
              onChange={e => setMessage(e.target.value)}>
            </textarea>) : null}

          <button className="waveButton" id="wave" onClick={() => wave(currentAccount, setCurrentAccount, message)}>
            Send wave
          </button>
          {/* 遍历显示waves */}
          <button className="waveButton" onClick={() => getAllWaves(currentAccount, setCurrentAccount, allWaves, setAllWaves)}>
            GetAllWaves
          </button>

          {allWaves.map((wave, index) => {
            return (
              <div key={index} style={{ backgroundColor: "oldlace", marginTop: "16px", padding: "16px" }}>
                <div>Address: {wave.address}</div>
                <div>Time: {wave.timestamp.toString()}</div>
                <div>Message: {wave.message}</div>
              </div>)
          })}



        </div>
      </div>
    </>
  )
}
export default App