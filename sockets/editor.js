module.exports = function(users, ProjectManager, socket) {
    var editorNamespace = socket.of('/editor');

    // attach to session
    editorNamespace.use(users.socketSession);
    // require the user is signed in
    editorNamespace.use(users.requireSocketLogin);


    editorNamespace.on('connection', function(client) {
        function emitError(type, err) {
            client.emit("err", {
                type,
                err
            })
        }
        
        console.log("Client connected!")
        
        client.on('log', function(data) {
            console.log("client log", data);
        })

        /**
         * param data {filepath, project_id}
         */
        client.on('openFile', function({path, project_id}) {
            ProjectManager.getProject(project_id, (err, project) => {
                if(err) {
                    return emitError("GetProjectError", err);
                }
                project.getFile(path, function(err, file) {
                    if (err) {
                        return emitError("GetFileError", err);
                    }
                    const user = client.user;

                    project.addUser(user);
                    file.addUser(user);

                    client.updateFilter({
                        file: path,
                        project: project_id
                    })

                    file.emitContent();
                })
            })
        })
    });

}