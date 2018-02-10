const AndreyCoin = artifacts.require("AndreyCoin");
const AndreyCoinCrowdsale = artifacts.require("AndreyCoinCrowdsale");
// tests style inspired by: 
// https://github.com/gnosis/gnosis-safe-contracts/blob/master/test/gnosisSafe.js

contract('AndreyCoin', function(accounts) {
    console.log("Tests started")
    let andreyCoin
    beforeEach(async function () {
        // Create Gnosis Safe
        andreyCoin = await AndreyCoin.new()
    })

    it('tests AndreyCoin creation and minting operations', async () => {
        assert.equal(await web3.eth.getBalance(andreyCoin.address), 0)
        await web3.eth.sendTransaction({from: accounts[0], to: andreyCoin.address, value: web3.toWei(1, 'ether')})
        //assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
        let totalSupply = await andreyCoin.totalSupply()
        assert.equal(totalSupply,0)
        //mint 4 coins to 0x000000001
        await andreyCoin.mint(0x000000001,4)
        let newTotalSupply = await andreyCoin.totalSupply()
        //Check whether the new total supply is 4
        console.log("checking total supply")
        assert.equal(newTotalSupply,4)
        console.log("checking balance of 0x000000001")
        let balanceOfTestAddress = await andreyCoin.balanceOf(0x000000001)
        assert.equal(balanceOfTestAddress,4)
    })
})