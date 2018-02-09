const AndreyCoin = artifacts.require("AndreyCoin");
const AndreyCoinCrowdsale = artifacts.require("AndreyCoinCrowdsale");

contract('AndreyCoin', function(accounts) {
    console.log("Tests started")
    let andreyCoin
    beforeEach(async function () {
        // Create Gnosis Safe
        andreyCoin = await AndreyCoin.new()
    })

    it('tests AndreyCoin creation', async () => {
        assert.equal(await web3.eth.getBalance(andreyCoin.address), 0)
        await web3.eth.sendTransaction({from: accounts[0], to: andreyCoin.address, value: web3.toWei(1, 'ether')})
        assert.equal(await web3.eth.getBalance(andreyCoin.address).toNumber(), web3.toWei(1, 'ether'))
    })
})