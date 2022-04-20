var abi = require("ethereumjs-abi")
var BN = require("bn.js")
var parameterTypes = ['address', 'uint256']    //  （这里的两个参数，是因为部署合约的时候，合约的构造函数中有这两个                                                                               //参数）
var parameterValues = ["0x7a6d7a.....", 100000]    //（这里的value，是create合约代码时候构造函数中传入的参数）

var encoded = abi.rawEncode(parameterTypes, parameterValues)