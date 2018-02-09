// Specifically request an abstraction for AndreyCoinCrowdsale
var AndreyCoinCrowdsale = artifacts.require("AndreyCoinCrowdsale");

contract('AndreyCoinCrowdsale', function(accounts) {
  it("1should put 2 AndreyCoin in the first account", function() {
    return AndreyCoinCrowdsale.deployed().then(function(instance) {
      return instance.token.balanceOf(accounts[1]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 2, "2 wasn't in the first account");
    });
  });
});