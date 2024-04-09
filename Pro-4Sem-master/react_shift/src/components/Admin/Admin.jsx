import "./Admin.css";

export default function Admin() {
  return (
    <div>
      <div id="words">
        <h1>ADMIN CONSOLE</h1>
        <h3>Here we will have all the admin privileges</h3>
        <h3>
          admin: <span id="admin_html"></span>
        </h3>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <input
            className="inp"
            id="regCan"
            placeholder="Register Candidate (Name,Party)"
          />
        </div>
        <div className="grid-item">
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
