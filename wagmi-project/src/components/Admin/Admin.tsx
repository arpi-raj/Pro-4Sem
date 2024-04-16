import { useState } from "react";
import "./Admin.css";
import { sepolia } from "wagmi/chains";

import { useWriteContract,useReadContract,useAccount,useWatchContractEvent } from "wagmi";
import voterabi from "../../../../react_shift/hardhat/artifacts/contracts/voterr.sol/voterr.json";
import voterrrAddress from "../../smartContractAddress.json";

export default function Admin() {
  const [admin, setAdmin] = useState({
    candidate_name: "",
    candidate_party: "",
    register_address: "",
    admin_address: "",
    teri: "",
  });

  const handleInput = async (event:any) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setAdmin({ ...admin, [name]: value });
  };

  const { writeContract } = useWriteContract();
  const abi = voterabi.abi;
  const { address } = useAccount();

  try{
    (async()=>{
      const result = await useReadContract({
        abi,
        address: voterrrAddress.smartContractAddress as `0x${string}`,
        functionName: 'getCandidatesInfo',
        account: address,
        chainId: sepolia.id,
      })
      console.log(`dattttttttttttttta : ${JSON.stringify(result.data)}`)
    })();
   
  }catch(e){
    console.log(`Erorrrr : ${e}`)
  }

  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })

  
  return (
    <div className="admin-page">
      <div id="words">
        <h1>ADMIN CONSOLE</h1>
        <h3>Here we will have all the admin privileges</h3>
        <h3>
          admin: <span id="admin_html"></span>
        </h3>
      </div>

      <div className="grid-container">
        <div className="grid-item2">
          <input
            className="inp"
            id="candidate_name"
            name="candidate_name"
            value={admin.candidate_name}
            onChange={handleInput}
            type="text"
            placeholder="Register Candidate (Name)"
            style={{ width: "40%" }}
          />
          <input
            className="inp"
            id="candidate_party"
            name="candidate_party"
            value={admin.candidate_party}
            onChange={handleInput}
            type="text"
            placeholder="Register Candidate (Party)"
            style={{ width: "40%" }}
          />
        </div>
        <div className="grid-item">
          <button
            onClick={() =>
              writeContract({
                abi,
                address: voterrrAddress.smartContractAddress as `0x${string}`,
                functionName: "registerCandidate",
                args: [admin.candidate_name, admin.candidate_party],
              })
            }
          >
            Register Candidate
          </button>
        </div>

        <div className="grid-item2">
          <input
            className="inp"
            id="register_address"
            name="register_address"
            value={admin.register_address}
            onChange={handleInput}
            type="text"
            placeholder="Register Voter (Address)"
          />
        </div>
        <div className="grid-item">
          <button
            onClick={() =>
              writeContract({
                abi,
                address: voterrrAddress.smartContractAddress as `0x${string}`,
                functionName: "registerVoter",
                args: [admin.register_address],
              })
            }
          >
            Register Voter
          </button>
        </div>
        <div className="grid-item2">
          <input
            className="inp"
            id="admin_address"
            name="admin_address"
            value={admin.admin_address}
            onChange={handleInput}
            type="text"
            placeholder="Change Admin (Address)"
          />
        </div>
        <div className="grid-item">
          <button
            onClick={() =>
              writeContract({
                abi,
                address: voterrrAddress.smartContractAddress as `0x${string}`,
                functionName: "changeAdmin",
                args: [admin.admin_address],
              })
            }
          >
            Change Admin
          </button>
        </div>

        <div className="grid-item2">
          <input
            className="inp"
            id="teri"
            name="teri"
            value={admin.teri}
            onChange={handleInput}
            type="text"
            placeholder="Thaari M (Name)"
          />
        </div>
        <div className="grid-item">
          <button id="teribtn">Teri Ki</button>
        </div>
      </div>
      <div className="additional-buttons">
        <button>Close Voting</button>
        <button>Re-Open Voting</button>
        <button>Declare Result</button>
      </div>

      <>Data : {result}</>
    </div>
  );
}

