var express = require('express');
var router = express.Router();

module.exports = function(users, ProjectManager) {
    
    router.use(users.requireLogin);
    
	// Since it is not possible to apply middleware to the root route without affecting every other route redirect to remote
	router.get('/:project_id', function(req, res, next) {
		// console.log()
		ProjectManager.getProject(req.params.project_id, function(err, project) {
			if(err) {
				res.status(500).send(err);
				return;
			}

			res.render('editor', {
				layout: false, 
				project: JSON.stringify(project.getInfo())
			})
		})
		// res.send('remote');
	});

	return router;
}


