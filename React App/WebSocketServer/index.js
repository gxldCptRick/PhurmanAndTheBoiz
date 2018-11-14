const r = require('rethinkdb');
const io = require('socket.io')();

function subscribeToChatMessages({ dbConnection, client }){
    console.log("subscribeToChatMessages");
    return r.table('chat_messages')
        .changes({ include_initial: true })
        .run(dbConnection)
        .then((cursor) => {
            cursor.each((err, messageRow) => client.emit('chatMessageRecieved', messageRow.new_val));
        })
}

function sendMessage({ dbConnection, message }){
    var date = new Date().toLocaleTimeString();
    console.log(`${message} sent!`);

    return r.table('chat_messages')
        .insert({ 
            message,
            timestamp: date
        })
        .run(dbConnection)
        .then(() => console.log(`${message} sent to database`));
}

r.connect({
    host: '73.20.98.246',
    port: 28015,
    db: 'test'
}).then((dbConnection) =>{
    io.on('connection', (client) => {
        console.log("client connection");
        client.on('subscribeToChatMessages', () =>{
            subscribeToChatMessages({ client, dbConnection });
        })

        client.on('sendMessage', ({ message }) => {
            sendMessage({ message, dbConnection });
        })
    });
});


const port = 5585;
io.listen(port);
console.log(`listening on port ${port}`);