const r = require("rethinkdb");
const io = require("socket.io")();

function subscribeToChatMessages({ dbConnection, client }) {
  console.log("subscribeToChatMessages");
  return r
    .table("chat_messages")
    .changes({ include_initial: true })
    .run(dbConnection)
    .then(cursor => {
      cursor.each((err, messageRow) =>{
        client.emit("chatMessageRecieved", messageRow.new_val)
        console.log(messageRow.new_val)
      }
      );
    });
}

function sendMessage({ dbConnection, message, user }) {
  var date = new Date();
  console.log(date);
  console.log(`${message} sent from ${user}!`);

  return r
    .table("chat_messages")
    .insert({
      message,
      user,
      timestamp: date
    })
    .run(dbConnection)
    .then(() => console.log(`${message} from ${user} sent to database`));
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
    .getAll(`${lineId}`, { index: "lineId" })
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
  console.log(newLine);
  return r
    .table("lines")
    .insert({
      lineId: newLine.id,
      points: newLine.points,
      timestamp: date
    })
    .run(dbConnection, (err, res) =>{
      //client.send(res.generated_keys[0]);
      console.log(res.generated_keys[0]);
    })
    .then(() => console.log("Sent line to DB"));
}

function nukeMap({ dbConnection, client }){
  console.log("NUKED RETHINK DB LINES");
  console.log("NUKED RETHINK GENERATED MAP");
  
  return r.do(
    r.table("lines").delete(),
    r.table("generated_maps").delete() 
  ).run(dbConnection);
}

function sendGeneratedMap({dbConnection, client, commands}) {
  var date = new Date();
  return r.table("generated_maps")
  .insert({
    generatedMap: commands,
    timestamp: date    
  })
  .run(dbConnection);  
}


function subscribeToGeneratedMapsCommands({ dbConnection, client }) {  
  return r.table("generated_maps")
  .changes({ include_initial: true })
  .run(dbConnection)
  .then(cursor => {
    cursor.each((err, generatedMap) => {
      console.log("Emitting generated map");
      client.emit("generatedMapRecieved", generatedMap.new_val);
    })
  })
}

r.connect({
  host: "73.20.98.246",
  //host: "localhost",
  port: 28015,
  db: "test"
}).then(dbConnection => {
  //  r.table('chat_messages').delete().run(dbConnection);
  //r.table('drawing').delete().run(dbConnection);
  io.on("connection", client => {
    console.log("Client connected");
    client.on("subscribeToChatMessages", () => {
      subscribeToChatMessages({ client, dbConnection });
    });
    client.on("sendMessage", ({ message, user }) => {
      sendMessage({ message, user, dbConnection });
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

    client.on("nukeMap", () => {
      nukeMap({ dbConnection, client });
    });

    client.on("sendGeneratedMap", ({ commands }) => {
      sendGeneratedMap({dbConnection, client, commands})
    });

    client.on("subscribeToGeneratedMapCommands", () => {
      subscribeToGeneratedMapsCommands({ dbConnection, client });
    });
  });
});

const port = 5585;
io.listen(port);
console.log(`listening on port ${port}`);
