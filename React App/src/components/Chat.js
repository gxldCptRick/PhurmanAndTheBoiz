import React,{Component} from 'react';
import '../index.css';
import { sendMessage, subscribeToChatMessages,
         typing, subscribeToUserTyping,
         doneTyping, subscribeToUserDoneTyping} from '../rethinkAPI';
import * as ReactDOM from 'react-dom';

var typingTimer;
var listOfNames = ["Adalberto", "Leeanna", "Rico", "Barbar", "Claudette", "Tanja", "Kelly", "Gerry", "Kerri", "Chau"];
var doneTypingInterval = 1000;
export default class Chat extends React.Component{
    state = {
        user: listOfNames[Math.floor(Math.random()*listOfNames.length)],
        chatMessages: [],
        message: '',
        usersThatAreTyping: []
    };

    constructor(props){
        super(props);

        subscribeToChatMessages((chatMessage) => {
            console.log(`${chatMessage} recieved`);
            this.setState(prevState => ({
                chatMessages: prevState.chatMessages.concat([chatMessage])
            }));
        })

        subscribeToUserTyping(({ user }) => {
            this.setState(prevState => ({
                usersThatAreTyping: prevState.userThatIsTyping.concat([user])
            }))
        })

        subscribeToUserDoneTyping(({ user }) => {
            var index = this.state.usersThatAreTyping.indexOf(user);
            if (index !== -1){
                this.state.usersThatAreTyping.splice(index, 1);
            }
        })
    }

    handleSendMessage = () =>{
        var userMessage  = this.state.message.replace(/^\s+/, '').replace(/\s+$/, '');
        
        if (userMessage !== ''){
            sendMessage({ message: this.state.message });
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
            console.log("In if statement");
            domMessage_container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    handleKeyPress = (event) => {
        clearTimeout(typingTimer);
        typing({ user: this.state.user });
        this.somebodyIsTyping = true;
        if (event.key === 'Enter'){
            this.handleSendMessage();
        }
    }

    handleKeyUp = (event) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping({ user: this.state.user}), doneTypingInterval);
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    render(){
        let chatMessages = this.state.chatMessages.map(chatMessage =>(
            <div className="message" ref="chat_message">
                {chatMessage.message}
            </div>
        ));

        let typingUser = (<p></p>);

        if (this.state.usersThatAreTyping.length > 1){
            typingUser = (
                <p>Many users are typing...</p>
            );
        }

        else if (this.state.usersThatAreTyping.length == 1){
            typingUser = (
                <p>{this.state.usersThatAreTyping[0]} is typing...</p>
            );
        }

        return (
        <div className="chat-box">
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