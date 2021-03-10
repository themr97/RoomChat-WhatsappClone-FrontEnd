import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import Pusher from 'pusher-js';
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })


  }, [])

  useEffect(() => {
    const pusher = new Pusher('3d287fb03da1b3551df6', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
