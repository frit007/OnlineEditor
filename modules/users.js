module.exports = function(mysqlPool, sessionMiddleware, config) {

	var SocketUsers =  require('../SocketUser/modules/socket-users')(mysqlPool, sessionMiddleware, config);
	
	class Users extends SocketUsers.constructor {
		constructor() {
			super()
		}
	}

	return new Users();
}



