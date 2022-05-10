require("@nomiclabs/hardhat-waffle");

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
    console.log("balance", ethers.utils.formatEther(balance));
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545",
        // blockNumber: 19172180
      }
    },
  },
  solidity: {
    version: "0.8.13",
    // settings: {
    // optimizer: {
    //   enabled: false,
    //   runs: 200
    // }
    // }
  },
};
