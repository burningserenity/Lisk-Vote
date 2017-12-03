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

};
