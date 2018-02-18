const AndreyCoin = artifacts.require("AndreyCoin");
const AndreyCoinCrowdsale = artifacts.require("AndreyCoinCrowdsale");
// tests style inspired by: 
// https://github.com/gnosis/gnosis-safe-contracts/blob/master/test/gnosisSafe.js

contract('AndreyCoin', function(accounts) {
    console.log("AndreyCoin tests started")
    let andreyCoin
    beforeEach(async function () {
        // Create AndreyCoin
        andreyCoin = await AndreyCoin.new()
    })

    it('tests AndreyCoin creation and minting operations', async () => {
        // Buyer of AndreyCoin (= accounts[3] on Ganache)
        let buyerAddress = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544"
        let numberOfCoinsToMint = 5;
        assert.equal(await web3.eth.getBalance(andreyCoin.address), 0)
        //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoin.address, value: web3.toWei(1, 'ether')})
        //assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
        let totalSupply = await andreyCoin.totalSupply()
        assert.equal(totalSupply,0)
        //mint 4 coins to buyerAddress
        await andreyCoin.mint(buyerAddress,numberOfCoinsToMint)
        let newTotalSupply = await andreyCoin.totalSupply()
        //Check whether the new total supply is 4
        console.log("checking total supply -",newTotalSupply.toNumber())
        assert.equal(newTotalSupply,numberOfCoinsToMint)
        
        let balanceOfTestAddress = await andreyCoin.balanceOf(buyerAddress)
        console.log("checking balance of",buyerAddress,"-",balanceOfTestAddress.toNumber())
        assert.equal(balanceOfTestAddress,numberOfCoinsToMint)
    })
})

contract('AndreyCoinCrowdsale', function(accounts) {
    console.log("AndreyCoinCrowdsale tests started")
    let andreyCoinCrowdsale
    // Wallet to receive funds (= accounts[2] on Ganache)
    let walletToReceiveFunds = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
    // Buyer of AndreyCoin (= accounts[4] on Ganache)
    let buyerAddress = "0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2"

    beforeEach(async function () {
        // Create AndreyCoinCrowdsale
        andreyCoinCrowdsale = await AndreyCoinCrowdsale.new(walletToReceiveFunds)
    })

    it('tests AndreyCoinCrowdsale creation and operation', async () => {
        // Current rate is 1 wei = 1 coin, so this is also the wei sum to pay
        let initialCoinsToBuy = 3000000000000;

        let oldICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
        let startFundsRaised = await andreyCoinCrowdsale.totalWeiRaised()
        assert.equal(startFundsRaised,0)
        console.log("ICO wallet balance prior transaction =", oldICOwalletBalance,
                    "Start funds raised = ", startFundsRaised.toNumber())
        //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoinCrowdsale.address, value: web3.toWei(3, 'ether')})
        //Buy tokens
        await andreyCoinCrowdsale.buyTokens({from: buyerAddress, value: web3.toWei(initialCoinsToBuy, 'wei')})
        let newICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
        let newFundsRaised = await andreyCoinCrowdsale.totalWeiRaised()
        console.log("ICO wallet balance after transaction -", newICOwalletBalance,
                    "Currenty funds raised -",newFundsRaised.toNumber())
        //Check that funds were properly moved to the ICO wallet
        let expectedICOWalletBalance = initialCoinsToBuy + oldICOwalletBalance 
        assert.equal(newICOwalletBalance, expectedICOWalletBalance)
        
        let coinBalanceOfTestAddress = await andreyCoinCrowdsale.balanceOf(buyerAddress)
        console.log("checking balance of",buyerAddress,"-",coinBalanceOfTestAddress)
        
        assert.equal(coinBalanceOfTestAddress,initialCoinsToBuy,"mismatch beween purchased and received coins")

        // Buy some more coins and see that the total is correct
        let moreCoinsToBuy = 5000000000000;
        await andreyCoinCrowdsale.buyTokens({from: buyerAddress, value: web3.toWei(moreCoinsToBuy, 'wei')})
        let newCoinBalanceOfTestAddress = await andreyCoinCrowdsale.balanceOf(buyerAddress)
        console.log("new balance of",buyerAddress,"-",newCoinBalanceOfTestAddress)
        
        let totalExpectedCoins = initialCoinsToBuy + moreCoinsToBuy
        assert.equal(newCoinBalanceOfTestAddress,totalExpectedCoins)
    })
})