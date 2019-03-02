let connections = [];
let messages = [];

module.exports.ioChat = socket => {
  connections.push(socket);

  // socket.on("register", user => {
  //   socket.broadcast.emit("userJoined", user.username + " joined the chatRoom");
  // });

  socket.on("message", message => {
    for (connection of connections) {
      connection.emit("message", message);
    }
  });

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });
};
