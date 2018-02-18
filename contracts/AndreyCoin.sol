pragma solidity ^0.4.18;

import "./SafeMath.sol";

//based on https://github.com/OpenZeppelin/zeppelin-solidity/tree/master/contracts/token/ERC20

contract AndreyCoin {
    using SafeMath for uint256;

    mapping(address => uint256) balances;
    uint256 totalSupply_;
    address public owner;

    string public constant NAME = "Andrey Crowdsale Token";
    string public constant SYMBOL = "AND";
    uint8 public constant DECIMALS = 18;

    event Mint(address indexed to, uint256 amount);
    event ChangedContractOwner(address newOwner);
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Set the original `owner` of the contract to the sender account.
    */
    function AndreyCoin() public {
        owner = msg.sender;
    }

    /**
    * @dev Set a new `owner` of the contract - this is used to enable minting by the ICO contract
    * @param _newOwner the new owner (should be the ICO contract address)
    */
    function changeContractOwner(address _newOwner) onlyOwner public {
        require(_newOwner != address(0));
        owner = _newOwner;
        ChangedContractOwner(owner);
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens
     * @param _amount The amount of tokens to mint
     * @return A boolean that indicates whether the operation is successful
     */
    function mint(address _to, uint256 _amount) onlyOwner public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to,_amount);
        return true;
    }

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[msg.sender]);

        // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
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
