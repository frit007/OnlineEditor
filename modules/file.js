const Group = require('../SocketUser/modules/Group');
const fs = require('fs');

const ServerContent = require('./content/server-content');

module.exports = function(mysqlPool) {
	class File extends Group {
		// expects absolutePath, which means that you have to include 
		// /uploads/projectFolder/YourFile
		constructor(project, absolutePath) {
			super();
			this.filter ={
				file: absolutePath
			}
			this.project = project;
			this.absolutePath = absolutePath;
			bindSocketEvents(this);
		}

		getContent(callback) {
			if (this.content) return callback(null, this.content);
			if(typeof this.absolutePath != "string") {
				callback("path has to be a string");
				return;
			}

			fs.readFile(this.absolutePath, 'utf8', (err, text) => {
				if(err) return callback(err);
				// this.content = content;
				this.content = new ServerContent(text);
				callback(null, this.content);
			})
		}

		emitContent() {
			this.getContent((err, content) => {
				if (err) {
					return this.emit("err", {
						type: "getFileContentError",
						err
					})
				}
				this.emit("updateContent", {
					content: content.text,
					version: content.version
				});
			})
		}

	}
	function bindSocketEvents(file) {
		// file.on("getFile", function(data) {
		// 	this.updateFilters({
		// 		file: file.absolutePath
		// 	})
		// 	file.emitContent();
		// });

		// file.on("", function() {
			
		// });
	}


	return File;
}