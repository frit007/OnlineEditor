var express = require('express');
var router = express.Router();


module.exports = function(users,ProjectManager) {
    
   router.use(users.requireLogin);
    
	// Since it is not possible to apply middleware to the root route without affecting every other route redirect to remote
	router.get('/', function(req, res, next) {
		// console.log()
		// res.send("!!!!");
		res.render('projects', {title: "Projects"})
		// res.send('remote');
	});

	router.post('/store', function(req, res, next) {
		ProjectManager.create(req.body.name, req.user, function(err, project) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(JSON.stringify(project))
			}
		})
	})


	return router;
}


