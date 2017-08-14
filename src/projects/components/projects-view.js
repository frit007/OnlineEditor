import React from 'react';

export default function ProjectsView(props) {
	
	window.projects = props.projects;

	var sortedProjects = [];

	// sort the projects by owner
	props.projects.map(function(project) {
		console.warn("project", project);
		if (!sortedProjects[project.owner_id]) {
			sortedProjects[project.owner_id] = [];
		}
		sortedProjects[project.owner_id].push(project);
	})

	function renderProjects(projects) {
		return projects.map(function(project) {
			return (
				<div 
				key={project.project_id}
				className="col-sm-3">
					<div
					onClick={() => {window.location = "/editor/" + project.project_id}}
					className="project-view"
					>
						{project.project_name}
					</div>
				</div>
			)
		});
	}

	function renderOwners(owners) {
		console.warn(owners);
		return owners.map(function(owner) {
			// used to get the owner name
			const firstProject = owner[0];
			return (
				<div
					key={firstProject.owner_id}>
					<div >
						<span className="owner-divider">
							{firstProject.owner_name}
						</span>
					</div>
					{renderProjects(owner)}
				</div>
			)
		})
	}


	
	return(
		<div className="projects-viewer">
			<div className="action-bar">
				<span className="create-action" onClick={props.createClicked}>
                    <i class="fa fa-plus fa-2x center primary-text" aria-hidden="true"></i>
				</span>
			</div>
			<div>
				{renderOwners(sortedProjects)}
			</div>
		</div>
	)
}

console.log(ProjectsView)