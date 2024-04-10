const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const voterrContractFactory = await hre.ethers.getContractFactory(
    "voterr"
  );
  const voterrContract = await voterrContractFactory.deploy();

  // await counterContract.deployed();

  console.log(`
    Contract :  timestamp ${unlockTime} deployed to ${voterrContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
