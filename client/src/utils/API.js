import axios from "axios";

export default {

	getBallots: function() {
		return axios.get("/api/ballots");
	},
	getBallot: function(id) {
		return axios.get("/api/ballots" + id);
    },
    getRegisteredBallots: function(id) {
        return axios.get("/api/ballots/registered/" + id)
    }
};
