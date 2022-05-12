
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const { types } = require("hardhat/config");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("a", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const account = await ethers.getSigner(taskArgs.a);
    const balance = await account.getBalance();

    console.log("address", account.address);
    console.log("balance", ethers.utils.formatEther(balance), "ETH");
  });

task("deploy", "Deploy the contract")
  .addParam("name", "The contract's name")
  .addOptionalParam("params", "The contract's name", [], types.json)
  .addOptionalParam("verify", "Verify the contract's deployment", false, types.boolean)
  .setAction(async (taskArgs, hre) => {
    const contract = await hre.ethers.getContractFactory(taskArgs.name);
    const IContract = await contract.deploy(...taskArgs.params);

    await IContract.deployed();
    console.log(taskArgs.name, "Contract deployed to:", IContract.address);

    if (taskArgs.verify == true) {
      await hre.run("verify:verify", {
        address: IContract.address,
        constructorArguments: taskArgs.params,
      })
    }

    return IContract;
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
let APIKEY = "";
let PK = "";
let FORKBLOCK = 0;
let RPCURL = "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: RPCURL,
        blockNumber: FORKBLOCK
      }
    },
    bsctest: {
      url: RPCURL,
      accounts: [PK]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    apiKey: APIKEY,
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
