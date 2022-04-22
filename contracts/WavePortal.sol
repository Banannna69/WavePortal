//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint256 private seed;

  event NewWave(address indexed from, uint256 timestamp, string message);
  
  struct Wave {
    address waver; //发起 wave 用户的地址
    string message; //发送的 message
    uint256 timestamp;
  }

  //用一个结构数组来存储 wave 的数据
  Wave[] waves;

  //使用映射来存储最后一次发送 wave 的用户地址
  mapping(address => uint256) public lastWavedAt;
  //存储最后一个获奖用户地址
  mapping(address => uint256) public lastWonAt;

  //构造函数
  constructor() payable{
    console.log("The contract has been constructed.");
    //随机数种子
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory _message) public{
    //确保每个人间隔15分钟获得一次奖励
    require(lastWonAt[msg.sender] + 15 minutes < block.timestamp,"Wait 15m");
    require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
    lastWavedAt[msg.sender] = block.timestamp;

    totalWaves += 1;
    console.log("%s waved a message %s", msg.sender, _message);
    
    //将 wave 的数据存入结构数组中
    waves.push(Wave(msg.sender, _message, block.timestamp));

    //生成随机数 0-99
    seed = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);

    //控制获奖概率为 50%
    if(seed <= 50){
      console.log("%s won!!!", msg.sender);
      uint prizeAmount =  0.0001 ether;
      lastWonAt[msg.sender] = block.timestamp;

      //确保合约中存有一定的ether
      require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contrat has");

      //向发送 wave 的用户发送 0。001 ether
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract");
      }

    //当有人获奖后触发事件
    emit NewWave(msg.sender, block.timestamp, _message);
    
  }

  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
}
  function getTotalWaves() public view returns(uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}