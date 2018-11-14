import React,{Component} from 'react';
import '../index.css';
import { sendMessage, subscribeToChatMessages } from '../rethinkAPI';

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
    }

    handleTextChange = (event) => {
        event.persist();
        this.setState({
            message: event.target.value            
        });
    }

    render(){
        const chatMessages = this.state.chatMessages.map(chatMessage =>(
            <div>
                {chatMessage.message}
            </div>
        ));
        return (
        <div className="chat-box">
            <div className="messages-container">
                {chatMessages}
            </div>

            <input 
                type="text"
                placeholder="Enter message"
                onChange={this.handleTextChange}
            />
            <input type="button" onClick={this.handleSendMessage} value="Send"/>
        </div>

        )
    }
}