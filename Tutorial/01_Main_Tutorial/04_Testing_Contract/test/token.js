const { expect } = require("chai");

describe("Token contract", function () {
  // describe("<contract_name> contract",<function>)

  // Now add test here
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    // getSigners() is a object through which we can access account, balance of that account
    // 'owner' contain the address through which we will deploy the smart contract

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

  it("Should transfer tokens between accounts", async function () {
    const [owner, address1, address2] = await ethers.getSigners();
    // now get the owner address who deploy the contract and other signer object as well to transfer token to those address

    // Create instance of contract
    const Token = await ethers.getContractFactory("Token");

    // Deploy instance of this contract
    const hardhatToken = await Token.deploy();

    // Transfer 10 token from owner to address1
    const transferAmountToAddress1 = 10;
    await hardhatToken.transfer(address1.address, transferAmountToAddress1);
    // now expecting to get balance for address1 to be 10 which checking balance
    expect(await hardhatToken.checkBalance(address1.address)).to.equal(
      transferAmountToAddress1
    );

    // Transfer 5 token from address1 to address2
    const transferAmountToAddress2 = 5;
    // firstly we have to connect to address1 after that we can transfer to address2
    await hardhatToken
      .connect(address1)
      .transfer(address2.address, transferAmountToAddress2);
    expect(await hardhatToken.checkBalance(address2.address)).to.equal(
      transferAmountToAddress2
    );

    // check the balance of owner
    expect(await hardhatToken.checkBalance(owner.address)).to.equal(
      10000 - transferAmountToAddress1
    );
  });
});
