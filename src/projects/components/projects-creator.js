import React, {Component} from 'react'
import axios from 'axios'

export default class ProjectsCreator extends Component {
	
	constructor(props) {
		super(props);


		this.state = {
			name: ""
		}
	}

	onSubmit = (event) => {
		event.preventDefault();
		
		axios.post("/projects/store", {
			name: this.state.name
		}).then(function(result) {
			window.location = "/projects" + results.id
		}).catch(function(err) {
			alert("Error occured");			
		})
		
		this.setState({
			name: ""
		})

	}

	render() {
		return (
			<form className="form-horizontal form-creator well bs-component" onSubmit={this.onSubmit}>
				<fieldset>
					<legend>New project</legend>
					<div className="form-group">
						<label className="control-label col-sm-2" for="name">Name:</label>
						<input 
							name="name"
							placeholder="Project name"
							className ="col-sm-10"
							value={this.state.name}
							onChange={event => this.setState({name: event.target.value}) }
							type="text"/>
					</div>
					<div className="form-group" style={{paddingLeft:20 +"px"}}>
						<button type="submit" className="btn btn-primary" >Create</button>
						<button type="button" className="btn btn-default" onClick={this.props.cancel}>Cancel</button>
					</div>
				</fieldset>
			</form>
		)
	}
}