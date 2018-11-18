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

function subscribeToUserTyping(callback){
    socket.on('userIsTyping', user => callback(user));
}

function subscribeToUserDoneTyping(callback){
    socket.on('doneTyping', user => callback(user));
}

function sendMessage({ message }){
    socket.emit('sendMessage', { message });
}

function typing({ user }){
    socket.emit('typing', { user })
}

function doneTyping({ user }){
    socket.emit('doneTyping', { user })
}

export {
    subscribeToChatMessages,
    sendMessage,
    subscribeToUserTyping,
    typing,
    doneTyping,
    subscribeToUserDoneTyping
}
>>>>>>> Stashed changes
