import { Contract, ethers } from "ethers";
import abi from "../artifacts/contracts/voterr.sol/voterr.json";

const contAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contAbi = abi.abi;

let contract1 = {
  provider: null,
  signer: null,
  contract: null,
};

let state1 = {
  provider: null,
  signer: null,
  contract: null,
};

let currentAccount;

const btElm = document.getElementById("connect");

const connectToMetaMask = async () => {
  if (ethereum) {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      currentAccount = accounts[0] || "Not Connected";

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contAddr, contAbi, signer);
      contract1 = contract;

      console.log(contract);
      state1 = { provider, signer, contract };

      console.log(state1);

      console.log("Connected account:", currentAccount);

      // You can call other functions or perform actions with the account here
      // ...

      return currentAccount; // Return the current account value
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw error; // Rethrow the error to be caught elsewhere if needed
    }
  } else {
    console.error(
      "Ethereum not available. Please make sure MetaMask is installed."
    );
    throw new Error("Ethereum not available"); // Throw an error to be caught elsewhere if needed
  }
};

function nextpg() {
  window.open("./pages/admin.html", "_blank");
}

if (btElm) {
  btElm.addEventListener("click", connectToMetaMask);
  btElm.addEventListener("click", nextpg);
} else {
  console.error("Element with ID 'connect' not found");
}

export {
  contAddr,
  contAbi,
  contract1,
  state1,
  currentAccount,
  connectToMetaMask,
};
