// admin.js (or another.js)

import { ethers } from "ethers";
import {
  connectToMetaMask,
  currentAccount,
  contAbi,
  contAddr,
} from "./main.js";

let admin;

//Call the connectToMetaMask function and handle the promise
connectToMetaMask()
  .then((currentAccount) => {
    console.log("Current account:", currentAccount);
    admin = currentAccount;

    updateAdmin();
    // Now you can use the currentAccount value in your admin.js or another.js logic
  })
  .catch((error) => {
    console.error("Error:", error);
    // Handle errors here
  });

async function updateAdmin() {
  let admElm = document.getElementById("admin_html");
  admin = currentAccount;
  admElm.textContent = admin;
}
console.log("Current account:", currentAccount);
const regVoter = async (event, address) => {
  event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.registerVoter(address);

  transaction.wait();
  console.log(transaction);
};

const chAdm = async (event, address) => {
  event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.changeAdmin(address);

  transaction.wait();
  console.log(transaction);
};

const reOpVo = async (event) => {
  event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.reopenVoting();

  transaction.wait();
  console.log(transaction);
};

const clVo = async (event) => {
  event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.closeVoting();

  transaction.wait();
  console.log(transaction);
};

const regCan = async (event, _name, _party) => {
  event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.registerCandidate(_name, _party);

  transaction.wait();
  console.log(transaction);
};

const teri = async (event, address) => {
  //event.preventDefault();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contAddr, contAbi, signer);
  const transaction = await contract.terimakichut(address);

  transaction.wait();
  console.log(transaction);
};

let teriInpElm = document.getElementById("teri");
let teriBtnElm = document.getElementById("teribtn");

teriBtnElm.addEventListener("click", () => {
  let address = teriInpElm.value;
  console.log(address);
  teri(address);
});

/*let inpElm = document.getElementById("voterRegister");

inpElm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log(inpElm.value);
    regVoter(event, inpElm.value);
  }
});*/
