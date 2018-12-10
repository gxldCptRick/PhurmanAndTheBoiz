/* eslint-disable no-console */
import openSocket from "socket.io-client";
const port = 5585;
const socket = openSocket(`http://73.20.98.246:${port}`);
//const socket = openSocket(`http://localhost:${port}`);
function subscribeToChatMessages(callback) {
  socket.on("chatMessageRecieved", message => callback(message));
  socket.emit("subscribeToChatMessages");
}

function subscribeToPointDraw(callback) {
  socket.on("drawingPointRecieved", point => {callback(point);});
  socket.emit("subscribeToPointDraw");
}

function sendPointToDraw({lineId, x, y}) {
    socket.emit("drawingPointSent", {lineId, x, y});
}
function subscribeToUserDoneTyping(callback) {
  socket.on("doneTyping", user => callback({ user }));
}

function sendMessage({ message, user }) {
  socket.emit("sendMessage", { message, user });
}

function typing({ user }) {
  socket.emit("typing", { user });
}

function subscribeToUserTyping(callback){
    socket.on('userIsTyping', user => callback({ user }));
}

function doneTyping({ user }) {
  socket.emit("doneTyping", { user });

}

function generateUUID (){
   socket.emit("generateUUID");
}

function subscribeToMessageFromServer(callback){
  socket.on("message", message => callback(message));
}

function sendLine({ newLine }){
  socket.emit("sendLine", { newLine });
}

function nukeMap(){
  console.log("Emmited nukMap event");
  socket.emit("nukeMap");
}

function unsubscribeToUserTyping(){
  socket.off("subscribeToUserTyping");
}

function unsubscribeToChatMessages(){
  socket.off("subscribeToChatMessages");
}

function unsubscribeToUserDoneTyping(){
  socket.off("subscribeToUserDoneTyping");
}

function sendGeneratedMapCommands({ commands }){
  socket.emit("sendGeneratedMap", { commands });
}

function subscribeToGeneratedMapCommands(callback){
  socket.on("generatedMapRecieved", generatedMap  => callback(generatedMap));
  socket.emit("subscribeToGeneratedMapCommands");
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
  sendLine,
  nukeMap,
  unsubscribeToUserTyping,
  unsubscribeToChatMessages,
  unsubscribeToUserDoneTyping,
  sendGeneratedMapCommands,
  subscribeToGeneratedMapCommands
};
