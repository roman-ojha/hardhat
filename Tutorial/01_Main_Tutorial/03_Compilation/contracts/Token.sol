// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Token {
    // token name
    string public name = "HardHat Token";
    // symbol of toke like ether have ETH
    string public symbol = "HHT";
    // total supply of token
    uint256 public totalSupply = 10000;
    // address of owner
    address public owner;

    // store the balance own by specific address
    mapping(address => uint256) balances;

    constructor() {
        // we are supplying all the token for the user/address who deploy this contract
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        // in this function we will transfer amount of token to given address
        require(msg.sender == owner, "You are not the owner of the contract");
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function checkBalance(address account) external view returns (uint256) {
        // checking balance of the given user
        return balances[account];
    }
}
