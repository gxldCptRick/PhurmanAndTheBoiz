import openSocket from "socket.io-client";
import Rx from "rxjs/Rx";

const port = 5585;
const socket = openSocket(`http://73.131.209.95:${port}`);

function subscribeToChatMessages(callback) {
  // const messagesStream = Rx.Observable.fromEventPattern(
  //     h => socket.on('messageSent', h),
  //     h => socket.off('messageSent', h)
  // );

  // const bufferedTimeStream = messagesStream
  //     .bufferTime(2000)
  //     .map(messages => ( {messages}));

  // bufferedTimeStream.subscribe(messagesEvent => callback(messagesEvent));
  socket.on("chatMessageRecieved", message => callback(message));
  socket.emit("subscribeToChatMessages");
}

function sendMessage({ message }) {
  socket.emit("sendMessage", { message });
}

export { subscribeToChatMessages, sendMessage };
