const r = require("rethinkdb");
const io = require("socket.io")();

function subscribeToChatMessages({ dbConnection, client }) {
  console.log("subscribeToChatMessages");
  return r
    .table("chat_messages")
    .changes({ include_initial: true })
    .run(dbConnection)
    .then(cursor => {
      cursor.each((err, messageRow) =>
        client.emit("chatMessageRecieved", messageRow.new_val)
      );
    });
}

function sendMessage({ dbConnection, message }) {
  var date = new Date().toLocaleTimeString();
  console.log(`${message} sent!`);

  return r
    .table("chat_messages")
    .insert({
      message,
      timestamp: date
    })
    .run(dbConnection)
    .then(() => console.log(`${message} sent to database`));
}

function typing({ user, client }) {
  console.log(`socket server user broadcasting: ${user}`);
  client.broadcast.emit("userIsTyping", user);
}

function doneTyping({ user, client }) {
  client.broadcast.emit("doneTyping", { user });
}

function subscribeToDrawingPoint(dbConnection, client) {
  var date = new Date().toLocaleTimeString();
  console.log(date);
  return r
    .table("drawing")
    .changes({ include_initial: true })
    .run(dbConnection)
    .then(cursor => {
      cursor.each((err, pointRow) => {
        client.broadcast.emit("drawingPointRecieved", pointRow.new_val);
        console.log("object read from database");
      });
    });
}

function sendPoint({ point, dbConnection }) {
  var date = new Date().toLocaleTimeString();
  return r
    .table("drawing")
    .insert({
      ...point,
      timestamp: date
    })
    .run(dbConnection)
    .then(() => console.log(`object sent to database`));
}

r.connect({
  host: "73.20.98.246",
  port: 28015,
  db: "test"
}).then(dbConnection => {
  // r.table('chat_messages').delete().run(dbConnection);
  io.on("connection", client => {
    client.on("subscribeToChatMessages", () => {
      subscribeToChatMessages({ client, dbConnection });
    });
    client.on("sendMessage", ({ message }) => {
      sendMessage({ message, dbConnection });
    });
    client.on("typing", ({ user }) => {
      typing({ client, user });
    });
    client.on("doneTyping", ({ user }) => {
      doneTyping({ client, user });
    });
    client.on("subscribeToPointDraw", _ => {
      subscribeToDrawingPoint(dbConnection, client);
    });
    client.on("drawingPointSent", point => {
      //console.log(point);
      sendPoint({ point, dbConnection });
    });
  });
});

const port = 5585;
io.listen(port);
console.log(`listening on port ${port}`);
