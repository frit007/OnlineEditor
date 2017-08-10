var fs = require('fs');

const FOLDER = "/uploads/"
var randomstring = require("randomstring");
module.exports = function(mysqlPool) {
	class FileManager {
		getPath(name) {
			return FOLDER+name
		}

		generateFolderName(name, callback) {
			mysqlPool.query("SELECT * from projects where root_folder = ?" , [name], (err, rows) => {
				if (err) {
					callback(err);
				}

				if (rows.length == 0) {
					callback(null, name);
				} else {
					this.generateFolderName(randomstring.generate({
						length: 12,
						charset: 'alphabetic'
						}), callback)
				}
			})
		}
	}

	return new FileManager();
}