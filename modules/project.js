var Group = require("../SocketUser/modules/Group");

var directoryTree = require('directory-tree');
const UPLOADS = "uploads/"

module.exports = function(mysqlPool) {
    var File = require('./file')(mysqlPool);

    class Project extends Group {
        constructor ({id, name, rootFolder, owner}) {
            super()
            this.filter = { project: id }
            this.name = name;
            this.id = id;
            this.rootFolder = rootFolder;
            this.relativeFoler = UPLOADS+rootFolder + "/"
            this.owner = owner

            // absoulute file path as key and then the file as value
            this.files = {};
        }

        getInfo() {
            return {
                id: this.id,
                name: this.name,
                rootFolder: this.rootFolder,
                owner: this.owner.getInfo()
            }
        }

        getFileStructure(callback) {
            var directory = directoryTree(this.relativeFoler);
            callback(null, directory);
        }

        // uses callbacks to allow for asynchronous error checking
        // TODO error checking
        getFile(absoulutePath, callback) {
            if(this.files[absoulutePath]) {
                return callback(null, this.files[absoulutePath]);
            }

            let file = new File(this, absoulutePath);
            this.files[absoulutePath] = file;
            return callback(null, file);
        }
    }

    return Project;
}