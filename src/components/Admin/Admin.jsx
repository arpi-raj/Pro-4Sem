import { useState } from "react";
import "./Admin.css";

export default function Admin() {
  const [admin, setAdmin] = useState({
    candidate_name: "",
    candidate_party: "",
    register_address: "",
    admin_address: "",
    teri: "",
  });

  const handleInput = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setAdmin({ ...admin, [name]: value });
  };

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
          <button>Register Candidate</button>
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
          <button>Register Voter</button>
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
          <button>Change Admin</button>
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
    </div>
  );
}
