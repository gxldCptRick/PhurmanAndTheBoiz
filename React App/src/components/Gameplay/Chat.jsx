import React from 'react';
import '../../index.css';
import { sendMessage, subscribeToChatMessages,
         typing, subscribeToUserTyping,
         doneTyping, subscribeToUserDoneTyping,
         unsubscribeToUserTyping, unsubscribeToChatMessages,
         unsubscribeToUserDoneTyping} from '../../rethinkAPI';
import * as ReactDOM from 'react-dom';

var typingTimer;
var doneTypingInterval = 500;
var emmitedCurrentlyTypingEvent = false;
var dateFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
var currentUser = JSON.parse(localStorage.getItem("user"));
export default class Chat extends React.Component{
    state = {
        user: currentUser.user.username,
        chatMessages: [],
        message: '',
        usersThatAreTyping: []
    };

    handleSendMessage = () =>{
        var userMessage  = this.state.message.replace(/^\s+/, '').replace(/\s+$/, '');
        
        if (userMessage !== ''){
            sendMessage({ message: this.state.message, user: this.state.user });
        }

        this.setState({
            message: ''
        })
    }

    handleTextChange = (event) => {
        event.persist();
        this.setState({
            message: event.target.value            
        });
    }

    scrollToBottom = () =>{
        const { message_container, chat_message } = this.refs;
        const scrollHeight = message_container.scrollHeight;
        const height = message_container.clientHeight;
        const maxScrollTop = scrollHeight - height;

        var domMessage_container = ReactDOM.findDOMNode(message_container);

        var chatMessageBoxHeight = typeof(chat_message) === 'undefined' ? 30 : chat_message.clientHeight + 10;

        if (domMessage_container.scrollTop >= (maxScrollTop - chatMessageBoxHeight)){
            domMessage_container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    handleKeyPress = (event) => {
        clearTimeout(typingTimer);

        if (!emmitedCurrentlyTypingEvent){
            typing({ user: this.state.user });
            emmitedCurrentlyTypingEvent = true;
        }

        if (event.key === 'Enter'){
            this.handleSendMessage();
        }
    }

    handleKeyUp = (event) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            doneTyping({ user: this.state.user})
            emmitedCurrentlyTypingEvent = false;
        }, doneTypingInterval);
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    componentDidMount(){
        subscribeToUserTyping(({ user }) => {
            console.log(this.state.usersThatAreTyping);
            console.log(`user that is typing: ${user}`);
            this.setState(prevState => ({
                usersThatAreTyping: prevState.usersThatAreTyping.concat([user])
            }))
        })
        
        subscribeToChatMessages((chatMessage) => {
            console.log(`${chatMessage} recieved`);
            this.setState(prevState => ({
                chatMessages: prevState.chatMessages.concat([chatMessage])
            }));
            console.log(this.state.chatMessages);
            
            this.setState(prevState => ({
                chatMessages: prevState.chatMessages.sort(function(a, b){
                    console.log(a);
                    console.log(b);
                    return new Date(a.timestamp) - new Date(b.timestamp);
                })
            }));
            console.log(this.state.chatMessages);
        })      

        subscribeToUserDoneTyping(({ user }) => {
            var nameOfUserDoneTyping = user.user;
            this.setState({
                usersThatAreTyping: this.state.usersThatAreTyping.filter((userName) =>{
                    return userName !== nameOfUserDoneTyping
                })
            });
        })
    }

    componentWillUnmount(){
        unsubscribeToUserTyping();
        unsubscribeToChatMessages();
        unsubscribeToUserDoneTyping();
    }

    render(){
        let chatMessages = this.state.chatMessages.map(chatMessage =>(
            <div key={chatMessage.id} className="message" ref="chat_message">
                {chatMessage.message}

                <div className="flex-space-between">
                    <div className="message-small">
                        {chatMessage.user}
                    </div>
                    <div className="message-small">
                        {new Date(chatMessage.timestamp).toLocaleString('en-US', dateFormatOptions)}
                    </div>
                </div>
                
                
            </div>
        ));

        let typingUser = (<p>  </p>);

        if (this.state.usersThatAreTyping.length > 1){
            typingUser = (
                <p>Many users are typing...</p>
            );
        }

        else if (this.state.usersThatAreTyping.length === 1){
            typingUser = (
                <p>{this.state.usersThatAreTyping[0]} is typing...</p>
            );
        }

        return (
        <div className="navItems">
            <div 
                ref="message_container"
                className="messages-container"
                onScroll={this.onScroll}
            >
                {chatMessages}
            </div>
            <div className="user-typing">
                {typingUser}
            </div>

            <input 
                type="text"
                placeholder="Enter message"
                value={this.state.message}
                onChange={this.handleTextChange}
                onKeyPress={this.handleKeyPress}
                onKeyUp={this.handleKeyUp}
            />
            <input type="button" onClick={this.handleSendMessage} value="Send"/>
        </div>
        )
    }
}