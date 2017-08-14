var router = require('express').Router();

module.exports = function(ProjectManager) {

    // Moved to project
	// router.get('/getFiles/:id', function(req, res) {
	// 	ProjectManager.getFiles(function(err, projects) {
	// 		if (err) {
	// 			res.status(500).send(err);
	// 			return;
	// 		}
	// 		res.send(JSON.stringify(projects))
	// 	})
	// });

	return router;
}