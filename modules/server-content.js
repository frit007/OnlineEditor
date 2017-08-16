const Content = require('./content');

class ServerContent extends Content {
	constructor(text) {
		super(text);


		this.version = 0;
	}

	
}

module.exports = ServerContent;

