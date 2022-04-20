const hre = require("hardhat")

async function main () {
  //获取合约拥有者的地址和一个随机地址将其命名为randomPerson
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log("Deploying contracts with account:", deployer.address)
  console.log("Account Balance:", accountBalance.toString())

  const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await WaveContractFactory.deploy()
  await waveContract.deployed()

  console.log("WaveContract deployed to:", waveContract.address)
  console.log("WaveContract deployed by:", deployer.address)
  console.log("-----------------------------------------------------------------------")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
