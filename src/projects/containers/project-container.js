import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import {fetchProjects, updateUser} from '../actions';

import ProjectsView from '../components/projects-view';
console.log(ProjectsView);
import ProjectCreator from '../components/projects-creator';
import axios from 'axios';

import "../css/projects.scss";

const VIEW = 1,
	CREATOR = 2

class ProjectContainer extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			view: VIEW
		}
	}

	componentWillMount() {
		var user;
		axios.get('/users/whoami')
		.then((response) => {
			user = response.data;
			this.props.updateUser(user);
			this.props.fetchProjects(user.id);
		})

	}

	cancelCreation = () => {
		this.setState({
			view: VIEW
		})
	}

	createClicked = () => {
		this.setState({
			view: CREATOR
		})
	}

	render() {
		if (this.state.view == VIEW) {
			return (<ProjectsView 
			projects={this.props.projects} 
			createClicked={this.createClicked}/>)
		} else {
			return (<ProjectCreator cancel={this.cancelCreation}/>)
		}
		// if (!this.props.user) {
		// 	return (<div>Loading...</div>)
		// }

		// return (


		// 	<div>{this.props.user.name}</div>
		// )
	}
}


function mapStateToProps({user, projects}) {
	// Pass information from state to props
	return {user, projects}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({fetchProjects, updateUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)
