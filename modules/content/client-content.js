const Content = require("./content.js");

class ClientContent extends Content {
	constructor(text, joinedOnUpdate, onUpdate) {
		super(text);

		this.joinedOnUpdate = joinedOnUpdate;
		this.onUpdate = onUpdate || (() => {});
		this.onUpdate(text);
	}

	performUpdate(update){
		super.performUpdate(update);
		this.onUpdate(this.text);
	}

}

module.exports = ClientContent;

