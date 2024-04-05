const hre = require("hardhat");

async function main() {
  // Ensure a network is connected
  await hre.network.provider.ready;

  // Get the contract factory
  const Vote = await hre.ethers.getContractFactory("voterr");

  // Deploy the contract
  const vote = await Vote.deploy();

  // Wait for the contract to be mined
  await vote.waitForDeployment();

  // Log the deployed contract address
  console.log(`Voting contract deployed to address: ${vote.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
