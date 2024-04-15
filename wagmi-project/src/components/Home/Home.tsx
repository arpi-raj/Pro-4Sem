import "./Home.css";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { useAccount } from "wagmi";


// import { Contract, ethers } from "ethers";
// import abi from "../../../../artifacts/contracts/voterr.sol/voterr.json";

// const contAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const contAbi = abi.abi;

function Home() {
  // const connectToMetaMask = async () => {
  //   if (ethereum) {
  //     try {
  //       const accounts = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });

  //       currentAccount = accounts[0] || "Not Connected";

  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       const signer = await provider.getSigner();
  //       const contract = new ethers.Contract(contAddr, contAbi, signer);
  //       contract1 = contract;

  //       console.log(contract);
  //       state1 = { provider, signer, contract };

  //       console.log(state1);

  //       console.log("Connected account:", currentAccount);

  //       // You can call other functions or perform actions with the account here
  //       // ...

  //       return currentAccount; // Return the current account value
  //     } catch (error) {
  //       console.error("Error connecting to MetaMask:", error);
  //       throw error; // Rethrow the error to be caught elsewhere if needed
  //     }
  //   } else {
  //     console.error(
  //       "Ethereum not available. Please make sure MetaMask is installed."
  //     );
  //     throw new Error("Ethereum not available"); // Throw an error to be caught elsewhere if needed
  //   }
  // };
//   const [addd,setLocation]=useState({addrs:""});
//   const location = useLocation();


//   useEffect(()=>{
// console.log("uselocattion :::: ",location)
// if(location.state){
//   let _state=location.state;
//   setLocation(_state);
// }
//   },[location])
const { address } = useAccount();


  return (
    <div className="body">
      <div className="main">
        <div className="app">
          <h1>Welcome to DeVo</h1>
          <p>A decentralized voting web app for all</p>
        </div>
        <button >{address ? address : "0x000000000000000" }</button>
      </div>
      <script type="module" src="/main.js"></script>
    </div>
  );
}

export default Home;
