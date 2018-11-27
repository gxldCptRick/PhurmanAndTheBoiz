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
  return r
    .table("lines")
    .changes({ include_initial: true })
    .run(dbConnection)
    .then(cursor => {
      cursor.each((err, pointRow) => {
        client.emit("drawingPointRecieved", pointRow.new_val);
        console.log("object read from database");
      });
    });
}

function sendPoint({ lineId, x, y, dbConnection }) {
  var date = new Date().toLocaleTimeString();
  console.log(`Line id: ${lineId}`);
  return r
    .table("lines")
    .get(`${lineId}`)
    .update({
      points: r.row("points").append({x, y})
    })
    .run(dbConnection, (err, res) => {
      if (err){
        console.log("error");
      }
      else{
        console.log(res);
      }
    })
    .then(() => console.log(`object sent to database`));
}

function generateUUID(dbConnection, client){
  return r.uuid().run(dbConnection, (err, res) => {
      client.send(res);
    })
}

function sendLine({dbConnection, newLine, client}){
  var date = new Date().toLocaleTimeString();
  return r
    .table("lines")
    .insert({
      points: newLine.points,
      timestamp: date
    })
    .run(dbConnection, (err, res) =>{
      client.send(res.generated_keys[0]);
      console.log(res.generated_keys[0]);
    })
    .then(() => console.log("Sent line to DB"));
}

r.connect({
  host: "73.20.98.246",
  // host: "localhost",
  port: 28015,
  db: "test"
}).then(dbConnection => {
   r.table('chat_messages').delete().run(dbConnection);
  //r.table('drawing').delete().run(dbConnection);
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
    client.on("drawingPointSent", ({ lineId, x, y }) => {
      sendPoint({ lineId, x, y, dbConnection });
    });
    client.on("generateUUID", () =>{
      generateUUID(dbConnection, client);
    });
    client.on("sendLine", ({ newLine }) => {
      sendLine({ newLine, dbConnection, client });
    });


  });
});

const port = 5585;
io.listen(port);
console.log(`listening on port ${port}`);
