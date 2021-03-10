import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react'
import "./Chat.css"
import axios from "../axios";

const Chat = ({messages}) => {

    const [input, setInput] = useState("")

    const sendMessage = async (e) =>{
        e.preventDefault();

        await axios.post("/messages/new",{
            message: input,
            name: "DEMO APP",
            timestamp: "Just Now!",
            received: false,
        });
    
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat___body">
                {messages.map(message => (
                    <p className={`chat__message ${message.received && "chat__reciver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} 
                    onChange={(e)=> setInput(e.target.value)}
                    palceholder="Type your message"
                        type="text" />
                    <button onClick={sendMessage} type="submit"> Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
