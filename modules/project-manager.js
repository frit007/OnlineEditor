


module.exports = function(mysqlPool) {
	const fileManager = require('./file-manager')(mysqlPool);

	class ProjectManager {
		all(callback) {
			mysqlPool.query("select * from projects", function(err, data) {
				console.log("data", data);
				callback(err, data);
			})
		}



		create(name, user, callback) {
			var connection, projectId, root_folder;
			mysqlPool.getConnection()
			.then(con => {
				connection = con;
				return connection.query("START TRANSACTION");
			})
			.then(() => {
				return new Promise( function(accept, reject) {
					fileManager.generateFolderName(name, function(err, folderName) {
						root_folder = folderName;
						if (err) {
							reject(err);
						}
						accept(connection.query("INSERT INTO projects(name, root_folder, owner) VALUES (?, ?, ?)", [name, folderName, user.id]));
					}
				)})
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
					root_folder,
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
	}

	return new ProjectManager()
}