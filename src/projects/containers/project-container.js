import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import {fetchProjects, fetchUser} from '../actions';

import ProjectsView from '../components/projects-view';
console.log(ProjectsView);
import ProjectCreator from '../components/projects-creator';


import "../css/projects.scss";

const VIEW = 1,
	CREATOR = 2

class ProjectContainer extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			view: CREATOR
		}
	}

	componentWillMount() {
		this.props.fetchProjects()
		this.props.fetchUser();

	}

	cancelCreation = () => {
		this.setState({
			view: VIEW
		})
	}

	render() {
		if (this.state.view == VIEW) {
			return (<ProjectsView />)
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
	return bindActionCreators({fetchProjects, fetchUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)
