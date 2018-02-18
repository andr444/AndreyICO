const AndreyCoin = artifacts.require("AndreyCoin");

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
        let numberOfCoinsToMint = 500000000000;
        assert.equal(await web3.eth.getBalance(andreyCoin.address), 0)
        //await web3.eth.sendTransaction({from: accounts[0], to: andreyCoin.address, value: web3.toWei(1, 'ether')})
        //assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
        let totalSupply = await andreyCoin.totalSupply()
        console.log("start total supply -",totalSupply.toNumber())
        assert.equal(totalSupply,0)
        //mint numberOfCoinsToMint coins to buyerAddress
        await andreyCoin.mint(buyerAddress,numberOfCoinsToMint)
        let newTotalSupply = await andreyCoin.totalSupply()
        //Check whether the new total supply is 4
        console.log("checking total supply -",newTotalSupply.toNumber())
        assert.equal(newTotalSupply,numberOfCoinsToMint)
        
        let balanceOfTestAddress = await andreyCoin.balanceOf(buyerAddress)
        console.log("checking balance of",buyerAddress,"-",balanceOfTestAddress.toNumber())
        assert.equal(balanceOfTestAddress,numberOfCoinsToMint)
    })

    it('tests minting without ownership', async () => {

    })

    it('tests changing owner then minting', async () => {

    })

    it('tests token transfer', async () => {

    })
    
    it('tests excessive token transfer (more than on ballance)', async () => {

    })
})
