// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 10000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function checkBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
