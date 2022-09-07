async function main() {
  const [deployer] = await ethers.getSigners();
  // Getting Deployer or first Signers and it's address

  // create Contract Instance
  const Token = await ethers.getContractFactory("Token");

  // deploying Contract Instance
  const token = await Token.deploy();

  console.log("Token address: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
