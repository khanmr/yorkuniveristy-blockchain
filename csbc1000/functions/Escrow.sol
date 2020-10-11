// SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

/*
 * @title Escrow
 * @dev Base escrow contract, holds funds designated for a payee until they
 * withdraw them.
 *
 * This contract which is derived from OpenZeppelin at
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/payment/escrow/Escrow.sol
 * has been modified for use by members of CSBC1000 in Fall 2020.
 */
contract Escrow {
    address private _owner;

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    mapping(address => uint256) private _deposits;

    /*
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /*
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() public {
        _owner = msg.sender;
    }

    function depositsOf(address payee) public view returns (uint256) {
        return _deposits[payee];
    }

    /*
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param payee The destination address of the funds.
     */
    function deposit(address payee) public payable onlyOwner {
        uint256 amount = msg.value;

        uint256 newAmount = _deposits[payee] + amount;

        require(newAmount >= _deposits[payee], "SafeMath: addition overflow");

        _deposits[payee] = newAmount;

        emit Deposited(payee, amount);
    }

    /*
     * @dev Withdraw accumulated balance for a payee, forwarding all gas to the
     * recipient.
     * @param payee The address whose funds will be withdrawn and transferred to.
     */
    function withdraw(address payable payee) public onlyOwner {
        uint256 payment = _deposits[payee];

        require(
            address(_owner).balance >= payment,
            "Address: insufficient balance"
        );

        _deposits[payee] = 0;

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = payee.call{value: payment}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );

        emit Withdrawn(payee, payment);
    }
}
