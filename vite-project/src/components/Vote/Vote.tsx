import { useState } from "react";
import "./Vote.css";
import React from "react";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useWatchContractEvent,
} from "wagmi";
import voterabi from "../../../../react_shift/hardhat/artifacts/contracts/voterr.sol/voterr.json";
import voterrrAddress from "../../smartContractAddress.json";
import { sepolia } from "wagmi/chains";


export default function Vote() {
  const [dummy, setDummy] = useState([
    { name: "ashu", party: "bjp" },
    { name: "arpit", party: "congress" },
  ]);
  const { writeContract } = useWriteContract();
  const abi = voterabi.abi;
  const { address } = useAccount();
  let result = useReadContract({
    abi,
    address: voterrrAddress.smartContractAddress as `0x${string}`,
    functionName: "getCandidatesInfo",
    account: address,
    chainId: sepolia.id,
  });
  const a = result.data;
  return (
    <div className="admin-page1">
      <div id="words">
        <h1>VOTE</h1>
      </div>

      <div className="grid-container1">
        <div className="grid-item1">
        <div>
       
        {a &&
          a.map((item: any) => (
            <div className="block1" key={item.candidateId}>
              <div  className="party1">
              <h1>
              {item.name}
              </h1>
              <h1>{item.party}</h1>
                </div>
             
              <button>  {Number(
                  JSON.parse(
                    JSON.stringify(item.candidateId, (key, value) => {
                      return typeof value === "bigint"
                        ? value.toString()
                        : value;
                    })
                  )
                )}</button>
            </div>
          ))}
      </div>
          {/* {dummy.map((val, id) => {
            return (
              <div className="block1">
                <div className="party1">
                <div>
                  <h1>{val.name}</h1>
                </div>
                <h1>ho</h1>
                </div>
                <button>yooo</button>
              </div>
            );
          })} */}
        </div>
        {/* <div className="grid-item">
          <button>Register Candidate</button>
        </div>

        <div className="grid-item">
          <input
            className="inp"
            id="regVoter"
            placeholder="Register Voter (Address)"
          />
        </div>
        <div className="grid-item">
          <button>Register Voter</button>
        </div>

        <div className="grid-item">
          <input
            className="inp"
            id="chAdm"
            placeholder="Change Admin (Address)"
          />
        </div>
        <div className="grid-item">
          <button>Change Admin</button>
        </div>

        <div className="grid-item">
          <input className="inp" id="teri" placeholder="Thaari M (Name)" />
        </div>
        <div className="grid-item">
          <button id="teribtn">Teri Ki</button>
        </div> */}
      </div>
    </div>
  );
}
