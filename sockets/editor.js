module.exports = function(users, socket) {
    var editorNamespace = socket.of('/editor');

    // attach to session
    editorNamespace.use(users.socketSession);
    // require the user is signed in
    editorNamespace.use(users.requireSocketLogin);

    editorNamespace.on('connection', function(client) {
        client.on('log', function(data) {
            console.log("client log", data);
        })
    });

}