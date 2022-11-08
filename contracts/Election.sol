// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {
    //Model a candidate
    struct Party {
        uint   id;
        string partyName;
        uint   voteCount;
    }

    // Store accounts which have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Party) public parties; //uint represents candidateId
    // Store Candidate Count
    uint public partiesCount;    
    
    // voted event
    event votedEvent (
        uint indexed _partyId
        );

    // Constructor
    
    constructor() {
        addParty("Parti Cap Ayam");
        addParty("Parti Bintang");
        addParty("Parti Merdeka");
    }
    

    function addParty(string memory _partyName) private {
        partiesCount++;
        parties[partiesCount] = Party(partiesCount,_partyName, 0);
    }

    function vote (uint _partyId) public {
        // require that address hasn't voted before
        //require(!voters[msg.sender], "You have voted before!");

        // require vote only for valid candidate
        //require(_partyId > 0 && _partyId <= partiesCount, "You must be a valid candidate");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote count
        parties[_partyId].voteCount++;

        // trigger vote event
        emit votedEvent(_partyId);
    }

    function getVote (uint _partyId) public view returns (uint256) {

        return parties[_partyId].voteCount;

    }
}