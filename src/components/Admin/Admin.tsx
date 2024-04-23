import { useState } from "react";
import "./Admin.css";
import { sepolia } from "wagmi/chains";
import React from "react";
import fs from "fs";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useWatchContractEvent,
} from "wagmi";
import voterabi from "../../../hardhat/artifacts/contracts/voterr.sol/voterr.json";
import voterrrAddress from "../../smartContractAddress.json";

export default function Admin() {
  const [admin, setAdmin] = useState({
    candidate_name: "",
    candidate_party: "",
    register_address: "",
    admin_address: "",
    teri: "",
  });

  const handleInput = async (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setAdmin({ ...admin, [name]: value });
  };

  const { writeContract } = useWriteContract();
  const abi = voterabi.abi;
  const { address } = useAccount();
  let result: any;

  // (async()=>{
  result = useReadContract({
    abi,
    address: voterrrAddress.smartContractAddress as `0x${string}`,
    functionName: "getCandidatesInfo",
    account: address,
    chainId: sepolia.id,
  });
  const a = result.data;
  if(a==undefined){
    console.log("noooo")
  }else{
     a.forEach((item:any) => {
    console.log(`candidateId: ${item.candidateId}, name: ${item.name}, party: ${item.party}`);
  });
  }
  // a.forEach((item:any) => {
  //   console.log(`candidateId: ${item.candidateId}, name: ${item.name}, party: ${item.party}`);
  // });
  console.log(`dattttttttttttttta : ${JSON.stringify(result.data)}`)
  // })();

  useWatchContractEvent({
    address: voterrrAddress.smartContractAddress as `0x${string}`,
    abi,
    chainId: sepolia.id,
    eventName: "CandidateRegistered",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  let num = 1;

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
            onClick={(): any => {
              writeContract({
                abi,
                address: voterrrAddress.smartContractAddress as `0x${string}`,
                functionName: "registerCandidate",
                args: [admin.candidate_name, admin.candidate_party],
              });

              //   try {
              //    num++;
              //   // let arr=JSON.parse(data);
              //  data.candidate.push({
              //     id:num,
              //     name:admin.candidate_name,
              //     party:admin.candidate_party
              // });
              //     fs.writeFileSync(
              //       json_file,
              //       JSON.stringify( data )
              //     );
              //   } catch (error) {
              //     console.error(error);

              //     throw error;
              //   }
            }}
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

        {/* <div className="grid-item2">
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
        </div> */}
      </div>
      <div className="additional-buttons">
        <button
          onClick={() =>
            writeContract({
              abi,
              address: voterrrAddress.smartContractAddress as `0x${string}`,
              functionName: "closeVoting",
            })
          }
        >
          Close Voting
        </button>
        <button
          onClick={() =>
            writeContract({
              abi,
              address: voterrrAddress.smartContractAddress as `0x${string}`,
              functionName: "reopenVoting",
            })
          }
        >
          Re-Open Voting
        </button>
        <button
          onClick={() =>
            writeContract({
              abi,
              address: voterrrAddress.smartContractAddress as `0x${string}`,
              functionName: "declareResult",
            })
          }
        >
          Declare Result
        </button>
      </div>

      <div>
        Data :{" "}
        {a &&
          a.map((item: any) => (

            <div key={item.candidateId}>
              <div>
                candidateId:{" "}
                {Number(
                  JSON.parse(
                    JSON.stringify(item.candidateId, (key, value) => {
                      return typeof value === "bigint"
                        ? value.toString()
                        : value;
                    })
                  )
                )}
              </div>
              <div>name: {item.name}</div>
              <div>party: {item.party}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
