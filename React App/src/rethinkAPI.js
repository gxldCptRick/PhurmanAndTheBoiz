//@flow
import openSocket from "socket.io-client";
//import Rx from "rxjs/Rx";
const port = 5585;
//const socket = openSocket(`http://73.20.98.246:${port}`);
const socket = openSocket(`http://localhost:${port}`)

function subscribeToChatMessages(callback) {
  // const messagesStream = Rx.Observable.fromEventPattern(
  //     h => socket.on('messageSent', h),
  //     h => socket.off('messageSent', h)
  // );

  // const bufferedTimeStream = messagesStream
  //     .bufferTime(200)
  //     .map(messages => ( {messages}));

  // bufferedTimeStream.subscribe(messagesEvent => callback(messagesEvent));
  socket.on("chatMessageRecieved", message => callback(message));
  socket.emit("subscribeToChatMessages");
}

function subscribeToPointDraw(callback) {
  //console.log(callback);
  socket.on("drawingPointRecieved", point => {callback(point); /*console.log(point)*/});
  socket.emit("subscribeToPointDraw");
}

function sendPointToDraw({lineId, x, y}) {
    socket.emit("drawingPointSent", {lineId, x, y});
}
function subscribeToUserDoneTyping(callback) {
  socket.on("doneTyping", user => callback({ user }));
}

function sendMessage({ message }) {
  socket.emit("sendMessage", { message });
}

function typing({ user }: { user: string }) {
  socket.emit("typing", { user });
}

function subscribeToUserTyping(callback){
    socket.on('userIsTyping', user => callback(user));
}

function doneTyping({ user }: { user: string }) {
  socket.emit("doneTyping", { user });

}

function generateUUID (callback){
   socket.emit("generateUUID");
}

function subscribeToMessageFromServer(callback){
  socket.on("message", message => callback(message));
}

function sendLine({ newLine }){
  socket.emit("sendLine", { newLine });
}
export {
  subscribeToChatMessages,
  sendMessage,
  subscribeToUserTyping,
  typing,
  doneTyping,
  subscribeToUserDoneTyping,
  subscribeToPointDraw,
  sendPointToDraw,
  generateUUID,
  subscribeToMessageFromServer,
  sendLine
};
