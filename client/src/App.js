import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import OpenVotes from './pages/OpenVotes/OpenVotes';
import LiskVote from './pages/LiskVote/LiskVote';
import PropTypes from 'prop-types';
import NewUser from './pages/NewUser/NewUser';
// import VoteResults from './pages/VoteResults';

class App extends Component {
	constructor() {
		super();

		this.state = {
			voter_firstName: "voter_firstName",
			voter_lastName: "voter_lastName",
			voter_email: "voter_email",
			voter_passphrase: "voter_passphrase"
		}
	}

	test() {
		console.log(this.props);
	}

	render() {
		return(
			<div>
				{/*<Nav />*/}
				{/*<NavLink to="/test">To LiskVote</NavLink>
								<button onClick={this.test.bind(this)}>Get Router</button>*/}
				<Switch>
					<Route exact path="/" component={LiskVote} />

						<Route exact path="/newuser" component={NewUser} />

					<Route exact path="/openvotes" component={OpenVotes} />
						{/*
					<Route exact path="/voteresults" component={VoteResults} />
				*/}
				</Switch>
			</div>
		)
	}
}



export default App;
