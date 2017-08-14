var router = require('express').Router();

module.exports = function(ProjectManager) {

	router.use(ProjectManager.getProjectMiddleware)

	router.get('/all', function(req, res) {
		ProjectManager.all(function(err, projects) {
			if (err) {
				res.status(500).send(err);
				return;
			}
			res.send(JSON.stringify(projects))
		})
	});

	/**
	 * Get all projects the user is a part of
	 * 
	 * @param user_id
	 */
	router.get('/by_user/:user_id', function(req, res) {
		ProjectManager.getProjectsByUser(req.params.user_id,function(err, projects) {
			if (err) {
				res.status(500).send(err);
				return;
			}
			res.send(JSON.stringify(projects))
		})
	})

	router.post('/get_files', function(req, res) {
		req.project.getFileStructure(function(err, structure) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(JSON.stringify(structure));
			}
		})
	});

	return router;
}