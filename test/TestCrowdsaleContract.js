const AndreyCoin = artifacts.require("AndreyCoin");
const AndreyCoinCrowdsale = artifacts.require("AndreyCoinCrowdsale");
// tests style inspired by: 
// https://github.com/gnosis/gnosis-safe-contracts/blob/master/test/gnosisSafe.js

contract('AndreyCoinCrowdsale', function(accounts) {
    console.log("AndreyCoinCrowdsale tests started")
    let andreyCoin
    let andreyCoinCrowdsale
    // Wallet to receive funds (= accounts[2] on Ganache)
    let walletToReceiveFunds = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
    // Buyer of AndreyCoin (= accounts[4] on Ganache)
    let buyerAddress = "0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2"

    beforeEach(async function () {
        // Create AndreyCoin
        andreyCoin = await AndreyCoin.new()
        // Create AndreyCoinCrowdsale
        andreyCoinCrowdsale = await AndreyCoinCrowdsale.new(walletToReceiveFunds,andreyCoin.address)
        // transfer ownership to the ICO contract
        await andreyCoin.changeContractOwner(andreyCoinCrowdsale.address)
    })

    // it('tests AndreyCoinCrowdsale creation and operation', async () => {
    //     // Current rate is 1 wei = 1 coin, so this is also the wei sum to pay
    //     let initialCoinsToBuy = 3000000000000000000;

    //     let oldICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
    //     let startFundsRaised = await andreyCoinCrowdsale.weiRaised()
    //     assert.equal(startFundsRaised,0)
    //     console.log("ICO wallet balance prior transaction =", oldICOwalletBalance,
    //                 "Start funds raised = ", startFundsRaised.toNumber())
    //     //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoinCrowdsale.address, value: web3.toWei(3, 'ether')})
    //     //Buy tokens
    //     await andreyCoinCrowdsale.buyTokens({from: buyerAddress, value: web3.toWei(initialCoinsToBuy, 'wei')})
    //     let newICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
    //     let newFundsRaised = await andreyCoinCrowdsale.weiRaised()
    //     console.log("ICO wallet balance after transaction -", newICOwalletBalance,
    //                 "Current funds raised -",newFundsRaised.toNumber())
    //     //Check that funds were properly moved to the ICO wallet
    //     let expectedICOWalletBalance = initialCoinsToBuy + oldICOwalletBalance 
    //     assert.equal(newICOwalletBalance, expectedICOWalletBalance)
        
    //     let coinBalanceOfTestAddress = await andreyCoinCrowdsale.balanceOf(buyerAddress)
    //     console.log("checking balance of",buyerAddress,"-",coinBalanceOfTestAddress)
        
    //     assert.equal(coinBalanceOfTestAddress,initialCoinsToBuy,"mismatch beween purchased and received coins")

    //     // Buy some more coins and see that the total is correct
    //     let moreCoinsToBuy = 5000000000000;
    //     await andreyCoinCrowdsale.buyTokens({from: buyerAddress, value: web3.toWei(moreCoinsToBuy, 'wei')})
    //     let newCoinBalanceOfTestAddress = await andreyCoinCrowdsale.balanceOf(buyerAddress)
    //     console.log("new balance of",buyerAddress,"-",newCoinBalanceOfTestAddress)
        
    //     let totalExpectedCoins = initialCoinsToBuy + moreCoinsToBuy
    //     assert.equal(newCoinBalanceOfTestAddress,totalExpectedCoins)
    // })

    // it('')
})