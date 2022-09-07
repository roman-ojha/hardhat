const { expect } = require("chai");

describe("Token contract", function () {
  // describe("<contract_name> contract",<function>)

  // Now add test here
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    // getSigners() is a object through which we can access account, balance of that account
    // 'owner' contain the address through which we will deploy the smart contract

    // console.log("Signers: ", owner);

    // Create instance of contract
    const Token = await ethers.getContractFactory("Token");

    // Deploy instance of this contract
    const hardhatToken = await Token.deploy();

    // Now accessing the contract function
    // checking balance of given address
    const ownerBalance = await hardhatToken.checkBalance(owner.address);
    // console.log("Owner Address: ", owner.address);
    // console.log("Owner Balance: ", ownerBalance);

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

// In above described test we have repeated code multiple times in different test which is not a good thing to do so we will use Hooks which is provided by Mocha framework

describe("Token Contract Using Hooks", function () {
  // now here we will create the multiple variable that we will use in test
  let Token;
  let hardhatToken;
  let owner;
  let address1;
  let address2;
  let addresses;

  beforeEach(async function () {
    // beforeEach will run every time when each test run
    Token = await ethers.getContractFactory("Token");
    [owner, address1, address2, ...addresses] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    // we will add test here for Deployment
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.checkBalance(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    // Write test for Transaction
    it("Should transfer tokens between accounts", async function () {
      // Transfer 10 token from owner to address1
      const transferAmountToAddress1 = 10;
      await hardhatToken.transfer(address1.address, transferAmountToAddress1);
      expect(await hardhatToken.checkBalance(address1.address)).to.equal(
        transferAmountToAddress1
      );

      // Transfer 5 token from address1 to address2
      const transferAmountToAddress2 = 5;
      await hardhatToken
        .connect(address1)
        .transfer(address2.address, transferAmountToAddress2);
      expect(await hardhatToken.checkBalance(address2.address)).to.equal(
        transferAmountToAddress2
      );
      expect(await hardhatToken.checkBalance(owner.address)).to.equal(
        10000 - transferAmountToAddress1
      );
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.checkBalance(
        owner.address
      );
      // now here while transferring token from address1 to owner contract should revert back with String "Not enough tokens"
      // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html#revert-with-message
      await expect(
        hardhatToken.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // now we will check does the balance of owner is equal to initial balance of owner
      expect(await hardhatToken.checkBalance(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balance after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.checkBalance(
        owner.address
      );
      await hardhatToken.transfer(address1.address, 5);
      await hardhatToken.transfer(address2.address, 10);

      const finalOwnerBalance = await hardhatToken.checkBalance(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 5 - 10);

      const addr1Balance = await hardhatToken.checkBalance(address1.address);
      expect(addr1Balance).to.equal(5);

      const addr2Balance = await hardhatToken.checkBalance(address2.address);
      expect(addr2Balance).to.equal(10);
    });
  });
});
