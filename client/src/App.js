import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom';
import OpenVotes from './pages/OpenVotes/OpenVotes';
import RegisteredVotes from './pages/OpenVotes/RegisteredVotes';
import LiskVote from './pages/LiskVote/LiskVote';
import NewUser from './pages/NewUser/NewUser';
import AddBallot from './pages/AddBallot/AddBallot';
import VoterRegistration from './pages/VoterRegistration/VoterRegistration';
import VoteResults from './pages/VoteResults/VoteResults';
import CastVote from './pages/CastVote/CastVote';
import NavBar from "./components/Nav";


class App extends Component {
	constructor() {
		super();

		this.state = {
			voter_firstName: "voter_firstName",
			voter_lastName: "voter_lastName",
			voter_email: "voter_email",
			voter_passphrase: "voter_passphrase",
		}
	}

	test() {
		console.log(this.props);
	}

	render() {
		return(
			<div>
				<NavBar />
				<Switch>
					<Route exact path="/" component={LiskVote} />

						<Route exact path="/newuser" component={NewUser} />

                        <Route exact path="/Addballot" component={AddBallot} />

                        <Route exact path="/openvotes" component={OpenVotes} />

                        <Route exact path="/voterregistration/:voter?" component={VoterRegistration} />

                        <Route exact path="/registeredvotes/:voter?" component={RegisteredVotes} />

					    <Route exact path="/registeredvotes/:id/:voter" component={CastVote} />

					<Route exact path="/voteresults/:ballot_id?" component={VoteResults} />
				</Switch>


			</div>
		);
	}
}

export default App;
