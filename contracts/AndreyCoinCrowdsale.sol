pragma solidity ^0.4.18;

import "./AndreyCoin.sol";

contract AndreyCoinCrowdsale {

    // The token being sold
    AndreyCoin public token;

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

    function AndreyCoinCrowdsale(address _wallet) public {
        require(_wallet != address (0));
        
        token = createTokenContract();
        rate = 1;
        wallet = _wallet;
    }

    // fallback function can be used to buy tokens
    function () external payable {
        buyTokens();
    }

    // creates the token to be sold
    function createTokenContract() internal returns (AndreyCoin) {
        return new AndreyCoin();
    }

    function buyTokens() public payable {
        //check that at least some funds were paid
        require(msg.value != 0);
        //don't know whether this is a necessary check, but can't hurt...
        require(msg.sender != address(0));
        
        uint256 weiAmount = msg.value;
        //calculate token amount to be created 
        uint256 tokens = weiAmount;

        //make this safe later by using SafeMath
        weiRaised = weiRaised + weiAmount;
        token.mint(msg.sender,tokens);
        TokenPurchase(msg.sender,weiAmount,tokens);
        forwardFunds();
    }

    // send ether to the fund collection wallet
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }
}