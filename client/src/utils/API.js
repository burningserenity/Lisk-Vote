import axios from "axios";

export default {

	getBallots: function() {
		return axios.get("/api/ballots");
	},
	getBallot: function(id) {
		return axios.get("/api/ballots/" + id);
    },
    getRegisteredBallots: function(id) {
        return axios.get("/api/ballots/registered/" + id);
    },
    getVoters: function() {
        return axios.get("/api/voters/all");
    },    
     postVotersBallots: function(data) {
        console.log(data);
        return axios.put("/api/ballots/register/:id" + data);
    },
    createBallot: function(ballot) {
        console.log(ballot);
        return axios({
            method: "post",
            url: "/api/ballots",
            data: {
                ballot_name: ballot.ballot_name,
                ballot_start: ballot.ballot_start,
                ballot_expiration: ballot.ballot_expiration
            }
        });
    },
    castVote: function(ballot, voter, position) {
        console.log(ballot);
        console.log(voter);
        console.log(position);
        return axios({
            method: "put",
            url: ballot,
            data: {
                voter_id: voter,
                position: position
            }
        });
    }

};
