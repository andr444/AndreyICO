pragma solidity ^0.4.18;

import "./SafeMath.sol";

//based on https://github.com/OpenZeppelin/zeppelin-solidity/tree/master/contracts/token/ERC20
//TODO:
//Add SafeMath

contract AndreyCoin {
    using SafeMath for uint256;

    mapping(address => uint256) balances;
    uint256 totalSupply_;
    address public owner;

    string public constant name = "Andrey Crowdsale Token";
    string public constant symbol = "AND";
    uint8 public constant decimals = 18;

    event Mint(address indexed to, uint256 amount);

    /**
    * @dev Set the original `owner` of the contract to the sender
    * account.
    */
    function AndreyCoin() public {
        owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens
     * @param _amount The amount of tokens to mint
     * @return A boolean that indicates whether the operation is successful
     */
    function mint(address _to, uint256 _amount) onlyOwner public returns (bool) {
        //totalSupply_ = totalSupply_ + _amount;
        //balances[_to] = balances[_to] + _amount;
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to,_amount);
        return true;
    }

    /**
     * @dev total number of tokens in existence
     */
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
}
