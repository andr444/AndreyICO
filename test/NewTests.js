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
        let buyerAddress = "0x0001"
        assert.equal(await web3.eth.getBalance(andreyCoin.address), 0)
        //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoin.address, value: web3.toWei(1, 'ether')})
        //assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
        let totalSupply = await andreyCoin.totalSupply()
        assert.equal(totalSupply,0)
        //mint 4 coins to buyerAddress
        await andreyCoin.mint(buyerAddress,4)
        let newTotalSupply = await andreyCoin.totalSupply()
        //Check whether the new total supply is 4
        console.log("checking total supply - ",newTotalSupply)
        assert.equal(newTotalSupply,4)
        
        let balanceOfTestAddress = await andreyCoin.balanceOf(buyerAddress)
        console.log("checking balance of ",buyerAddress," - ",balanceOfTestAddress)
        assert.equal(balanceOfTestAddress,4)
    })
})

contract('AndreyCoinCrowdsale', function(accounts) {
    console.log("AndreyCoinCrowdsale tests started")
    let andreyCoinCrowdsale
    // Wallet to receive funds (= accounts[2] on Ganache)
    let walletToReceiveFunds = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
    beforeEach(async function () {
        // Create AndreyCoinCrowdsale
        andreyCoinCrowdsale = await AndreyCoinCrowdsale.new(walletToReceiveFunds)
    })

    it('tests AndreyCoinCrowdsale creation and operation', async () => {
        assert.equal(await web3.eth.getBalance(andreyCoinCrowdsale.address), 0)
        let ICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
        console.log("ICOwaleltBalance start - ", ICOwalletBalance)

        let startFundsRaised = await andreyCoinCrowdsale.totalWeiRaised()
        //assert.equal(startFundsRaised,0)
        console.log("startFundsRaised - ",startFundsRaised)
        //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoinCrowdsale.address, value: web3.toWei(3, 'ether')})
        await andreyCoinCrowdsale.buyTokens({from: accounts[0], value: web3.toWei(3, 'ether')})
        let newFundsRaised = await andreyCoinCrowdsale.totalWeiRaised()
        console.log("newFundsRaised - ",newFundsRaised)
        
        ICOwalletBalance = await web3.eth.getBalance(walletToReceiveFunds).toNumber()
        console.log("ICOwaleltBalance second - ", ICOwalletBalance)
        //assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
        // let totalSupply = await andreyCoin.totalSupply()
        // assert.equal(totalSupply,0)
        // //mint 4 coins to 0x000000001
        // await andreyCoin.mint(0x000000001,4)
        // let newTotalSupply = await andreyCoin.totalSupply()
        // //Check whether the new total supply is 4
        // console.log("checking total supply")
        // assert.equal(newTotalSupply,4)
        // console.log("checking balance of 0x000000001")
        // let balanceOfTestAddress = await andreyCoin.balanceOf(0x000000001)
        // assert.equal(balanceOfTestAddress,4)
    })
})