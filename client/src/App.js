import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OpenVotes from './pages/OpenVotes';
import LiskVote from './pages/LiskVote';
import NewUser from './pages/NewUser';
import VoteResults from './pages/VoteResults';

const App = () =>
	<Router>
		<div>
			<Nav />
			<Switch>
				<Route exact path="/" component={LiskVote} />
				<Route exact path="/liskvote" component={LiskVote} />
				<Route exact path="/newuser" component={NewUser} />
				<Route exact path="/openvotes" component={OpenVotes} />
				<Route exact path="/voteresults" component={VoteResults} />
			</Switch>
		</div>
	</Router>;

export default App;
