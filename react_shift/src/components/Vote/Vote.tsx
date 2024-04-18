import { useState } from "react";
import "./Vote.css";
import React from "react";

export default function Vote() {
  const [dummy, setDummy] = useState([
    { name: "ashu", party: "bjp" },
    { name: "arpit", party: "congress" },
  ]);

  return (
    <div className="admin-page1">
      <div id="words">
        <h1>VOTE</h1>
      </div>

      <div className="grid-container1">
        <div className="grid-item1">
          {dummy.map((val, id) => {
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
          })}
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
