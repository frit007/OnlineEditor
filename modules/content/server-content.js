const Content = require('./content');


class ServerContent extends Content {
	constructor(text) {
		super(text);

		this.version = 1;
	}

	performUpdate(update) {
		if(update.mode == REPLACE_MODE) {

			this.text = this.replace(this.text,
				update.index,
				update.oldText,
				update.text)
		} else {
			throw "perform update only supports replace mode";
		}
	}
}

module.exports = ServerContent;
