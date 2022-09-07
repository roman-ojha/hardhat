const { expect } = require("chai");

describe("Token Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let address1;
  let address2;
  let addresses;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, address1, address2, ...addresses] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.checkBalance(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmountToAddress1 = 10;
      await hardhatToken.transfer(address1.address, transferAmountToAddress1);
      expect(await hardhatToken.checkBalance(address1.address)).to.equal(
        transferAmountToAddress1
      );
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
      await expect(
        hardhatToken.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");
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
