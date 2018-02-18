pragma solidity ^0.4.18;

import "./AndreyCoin.sol";

contract AndreyCoinCrowdsale {
    using SafeMath for uint256;

    // The token being sold
    AndreyCoin public coinContract;

    // address where funds are collected
    address public wallet;

    // how many token units a buyer gets per wei
    // current default rate is 1 token per wei
    uint256 public rate;

    // amount of raised money in wei
    uint256 public weiRaised;

    /**
    * event for token purchase logging
    * @param purchaser who bought the tokens
    * @param value weis paid 
    * @param amount amount of purchased tokens
     */
    event TokenPurchase(address indexed purchaser, uint256 value, uint256 amount);

    /**
    * AndreyCoinCrowdsale constructor
    * @param _wallet the wallet to which the raised funds will be transferred
     */
    function AndreyCoinCrowdsale(address _wallet, address _coinContractAddress) public {
        require(_wallet != address (0));
        require(_coinContractAddress != address(0));

        coinContract = AndreyCoin(_coinContractAddress);
        //token = createTokenContract();
        //currently the rate is fixed (1 wei gives 1 AndreyCoin), may be changed in the future
        rate = 1;
        wallet = _wallet;
    }

    // creates the token to be sold
    //function createTokenContract() internal returns (AndreyCoin) {
    //    return new AndreyCoin();
    //}

    // fallback function can be used to buy tokens
    // Doesn't work?
    function () external payable {
        buyTokens();
    }

    function buyTokens() public payable {
        //check that at least some funds were paid
        require(msg.value != 0);
        //don't know whether this is a necessary check, but can't hurt...
        require(msg.sender != address(0));
        
        uint256 weiAmount = msg.value;
        //calculate token amount to be created 
        uint256 newTokens = weiAmount;

        weiRaised = weiRaised.add(weiAmount);
        
        //Call the token contract to mint a new coin
        coinContract.mint(msg.sender,newTokens);

        // send ether to the fund collection wallet
        wallet.transfer(msg.value);

        TokenPurchase(msg.sender,weiAmount,newTokens);
    }

    function balanceOf(address participant) public view returns (uint256) {
        return coinContract.balanceOf(participant);
    }

    // function totalWeiRaised() public view returns (uint256) {
    //     return weiRaised;
    // }


}