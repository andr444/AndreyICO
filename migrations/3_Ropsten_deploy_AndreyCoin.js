const AndreyCoin = artifacts.require("./AndreyCoin.sol")
const AndreyCoinCrowdsale = artifacts.require("./AndreyCoinCrowdsale.sol")

module.exports = function(deployer, network, accounts) {
  //const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  //const endTime = startTime + (86400 * 20) // 20 days
  //const rate = new web3.BigNumber(1000)
  const wallet = accounts[0]


  //deployer.deploy(AndreyCoin, wallet)
  //deployer.deploy(AndreyCoinCrowdsale, wallet)

  //according to 
  // https://github.com/trufflesuite/truffle/issues/650#issuecomment-342751957
  // http://truffleframework.com/docs/getting_started/migrations
  deployer.deploy(AndreyCoin)
  //console.log(AndreyCoin.address)
  //console.log(AndreyCoinCrowdsale.address)
};