const { expect } = require("chai");

describe("Token contract", function () {
  // describe("<contract_name> contract",<function>)

  // Now add test here
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    // getSigners() is a object through which we can access account, balance of that account

    console.log("Signers: ", owner);

    // Create instance of contract
    const Token = await ethers.getContractFactory("Token");

    // Deploy instance of this contract
    const hardhatToken = await Token.deploy();

    // Now accessing the contract function
    // checking balance of given address
    const ownerBalance = await hardhatToken.checkBalance(owner.address);
    console.log("Owner Address: ", owner.address);
    console.log("Owner Balance: ", ownerBalance);

    // Now we will use chai library through which we can access expect
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
