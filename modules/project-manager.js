const fs = require('fs');
const UPLOADS = "uploads/"
const es6bind = require('es6bindall');


module.exports = function(mysqlPool, userManager) {
	const Project = require('./project')(mysqlPool);
	const fileManager = require('./file-manager')(mysqlPool);
	class ProjectManager {
		constructor() {
			this.projects = [];
			es6bind(this, "getProjectMiddleware")
		}

		all(callback) {
			mysqlPool.query("select * from projects", function(err, data) {
				console.log("data", data);
				callback(err, data);
			})
		}

		getProjectsByUser(userId, callback) {
			mysqlPool.query("select p.id as project_id, p.name as project_name, owner.id as owner_id, owner.name as owner_name from projects as p " +
			"left join user_projects as up on up.project_id = p.id " +
			"left join users as owner on owner.id = p.owner " + 
			"left join users as u on u.id = up.user_id " +
			"where u.id = ? ",[userId], function(err, result) {
				callback(err, result);
			})
		}

		getProject(projectId, callback) {
			if(this.projects[projectId]) {
				return callback(null,this.projects[projectId]);
			}

			mysqlPool.query("select p.id, p.root_folder, p.name, owner.id as owner_id from projects as p " +
				"left join users as owner on owner.id = p.owner " + 
				"where p.id = ? ", [projectId], (err, projectRows) => {
					if(err) {
						return callback(err);
					}
					var projectRow = projectRows[0];
					if(!projectRow) {
						return callback("No project with that id(" + projectId + ")");
					}
					userManager.getUser(projectRow.owner_id, (err, user) => {
						if (err) {
							return callback(err);
						}
						var project = new Project({
							owner: user,
							id: projectRow.id,
							name: projectRow.name,
							rootFolder: projectRow.root_folder
						})
						this.projects[project.id] = project;
						callback(null, project);
					})
				
			});
		}

		create(name, user, callback) {
			var connection, projectId, rootFolder;
			mysqlPool.getConnection()
			.then(con => {
				connection = con;
				return connection.query("START TRANSACTION");
			})
			.then(() => {
				return new Promise( function(resolve, reject) {
					fileManager.generateFolderName(name, function(err, folderName) {
						rootFolder = folderName;
						if (err) {
							reject(err);
						}
						resolve();
					}
				)})
			})
			.then(() => {
				return new Promise((resolve, reject) => {
					fs.mkdir(UPLOADS + rootFolder, (err) => {
						// ignore the error if it says that file already exists
						// we already have the database to control for those collisions
						if(err && err.errno != -17) {
							reject(err);
						} else {
							resolve();
						}		
					})
				})
			})
			.then(() => {
				return connection.query("INSERT INTO projects(name, root_folder, owner) VALUES (?, ?, ?)",
				[name, rootFolder, user.id])
			})
			.then((result) => {
				projectId = result.insertId;
					return connection.query("INSERT INTO user_projects(user_id, project_id) VALUES (?, ?)", [user.id, projectId]);
			})
			.then(result => {
				return connection.query("COMMIT");
			})
			.then(() => {
				mysqlPool.releaseConnection(connection)
			})
			.then(() => {
				callback(null, {
					rootFolder,
					id: projectId,
					name
				})
			})
			.catch(err => {
				connection.query("ROLLBACK")
				.then(() => {
					mysqlPool.releaseConnection(connection);
					callback(err);
				})
			}) 
		}
		getProjectMiddleware(req, res, next) {
			if(req.body.project_id) {
				this.getProject(req.body.project_id, function(err, project) {
					if(err) {
						res.status(500).send(err);
					} else {
						req.project = project;
						next();
					}
				})
			}else {
				next();
			}
		}



		

	}


	return new ProjectManager()
}