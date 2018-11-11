import io from "socket.io";
let socketServer = io();

socketServer.on("connection", socket => {
  console.log("socket connection found", socket.id);
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});

socketServer.listen(8000);
console.log("listening on 8000");
