/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// this will help to connect to ethereum node
// https://www.alchemy.com/
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
// private key of Goerli test network, you can get it from metamask
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      // we can get that account from metamask
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
  paths: {
    // artifacts: "./src/backend/artifacts",
    // sources: "./src/backend/contracts",
    // cache: "./src/backend/cache",
    // tests: "./src/backend/test",
  },
};
