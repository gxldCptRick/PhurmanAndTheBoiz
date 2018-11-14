import React,{Component} from 'react';
import '../index.css';
import { sendMessage, subscribeToChatMessages } from '../rethinkAPI';
import * as ReactDOM from 'react-dom';

export default class Chat extends React.Component{
    state = {
        chatMessages: [],
        message: '',
    };

    constructor(props){
        super(props);

        subscribeToChatMessages((chatMessage) => {
            console.log(`${chatMessage} recieved`);
            this.setState(prevState => ({
                chatMessages: prevState.chatMessages.concat([chatMessage])
            }));
        })
    }

    handleSendMessage = () =>{
        sendMessage({ 
            message: this.state.message
        });

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
        if (event.key === 'Enter'){
            this.handleSendMessage();
        }
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    render(){
        const chatMessages = this.state.chatMessages.map(chatMessage =>(
            <div className="message" ref="chat_message">
                {chatMessage.message}
            </div>
        ));
        return (
        <div className="chat-box">
            <div 
                ref="message_container"
                className="messages-container"
                onScroll={this.onScroll}
            >
                {chatMessages}
            </div>

            <input 
                type="text"
                placeholder="Enter message"
                value={this.state.message}
                onChange={this.handleTextChange}
                onKeyPress={this.handleKeyPress}
            />
            <input type="button" onClick={this.handleSendMessage} value="Send"/>
        </div>

        )
    }
}