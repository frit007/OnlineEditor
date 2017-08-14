const Group = require('../SocketUser/modules/Group');
const fs = require('fs');
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
			if (this.content) return callback(this.content);

			fs.readFile(this.absolutePath, (err, content) => {
				if(err) return callback(err);
				
				this.content = content;
				callback(content);
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
				this.emit("updateContent", content);
			})
		}

	}
	function bindSocketEvents(file) {
		file.on("getFile", function(data) {
			file.emitContent();
		})
	}


	return File;
}