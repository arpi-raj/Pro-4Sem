// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract voterr {
    address public admin;
    mapping(address => bool) public isRegisteredVoter;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    
    bool public votingOpen;
    uint256 public totalCandidates;

    struct Candidate {
        uint256 candidateId;
        string name;
        string party;
        uint256 votes;
        bool exists;
    }

    struct VoteResult {
        uint256 candidateId;
        string name;
        string party;
        uint256 votesCount;
    }

    struct CandidateInfo {
        uint256 candidateId;
        string name;
        string party;
        // Exclude votesCount for candidates info
    }

    event VoterRegistered(address indexed voter);
    event CandidateRegistered(uint256 indexed candidateId, string name, string party);
    event Voted(address indexed voter, uint256 indexed candidateId);
    event VotingClosed();
    event VotingReopened();
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    event ResultDeclared(uint256 indexed winnerId, string name, string party, uint256 votesCount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(votingOpen, "Voting is not allowed at this time");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(isRegisteredVoter[msg.sender], "Only registered voters can vote");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor() {
        admin = msg.sender;
        votingOpen = true;
        totalCandidates = 0;
    }

    function registerVoter(address voter) external onlyAdmin {
        require(!isRegisteredVoter[voter], "Voter is already registered");
        isRegisteredVoter[voter] = true;
        emit VoterRegistered(voter);
    }

    function registerCandidate(string memory name, string memory party) external onlyAdmin {
        totalCandidates++;
        candidates[totalCandidates] = Candidate(totalCandidates, name, party, 0, true);
        emit CandidateRegistered(totalCandidates, name, party);
    }

    function vote(uint256 candidateId) external onlyRegisteredVoter onlyDuringVotingPeriod hasNotVoted {
        require(candidates[candidateId].exists, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateId].votes++;

        emit Voted(msg.sender, candidateId);
    }

    function getVotesCount(uint256 candidateId) external view returns (uint256) {
        require(candidates[candidateId].exists, "Invalid candidate");
        return candidates[candidateId].votes;
    }

    function getVotesForAllCandidates() external view returns (VoteResult[] memory) {
        VoteResult[] memory results = new VoteResult[](totalCandidates);

        for (uint256 i = 1; i <= totalCandidates; i++) {
            results[i - 1] = VoteResult(i, candidates[i].name, candidates[i].party, candidates[i].votes);
        }

        return results;
    }

    function getCandidatesInfo() external view returns (CandidateInfo[] memory) {
        CandidateInfo[] memory candidatesInfo = new CandidateInfo[](totalCandidates);

        for (uint256 i = 1; i <= totalCandidates; i++) {
            candidatesInfo[i - 1] = CandidateInfo(i, candidates[i].name, candidates[i].party);
        }

        return candidatesInfo;
    }

    function closeVoting() external onlyAdmin {
        require(votingOpen, "Voting is already closed");
        votingOpen = false;
        emit VotingClosed();
    }

    function reopenVoting() external onlyAdmin {
        require(!votingOpen, "Voting is already open");
        votingOpen = true;
        emit VotingReopened();
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin address cannot be zero");
        emit AdminChanged(admin, newAdmin);
        admin = newAdmin;
    }

     function declareResult() external onlyAdmin returns (VoteResult memory) {
        require(!votingOpen, "Voting must be closed to declare the result");

        uint256 winnerId;
        uint256 maxVotes = 0;

        for (uint256 i = 1; i <= totalCandidates; i++) {
            if (candidates[i].votes > maxVotes) {
                maxVotes = candidates[i].votes;
                winnerId = i;
            }
        }

        require(winnerId != 0, "No valid winner found");

        VoteResult memory winnerInfo = VoteResult(
            winnerId,
            candidates[winnerId].name,
            candidates[winnerId].party,
            candidates[winnerId].votes
        );

        emit ResultDeclared(winnerInfo.candidateId, winnerInfo.name, winnerInfo.party, winnerInfo.votesCount);

        return winnerInfo;
    }
}