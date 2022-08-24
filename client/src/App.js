import './App.css';
import { Container, Row, Col, FormControl, InputGroup, Image } from 'react-bootstrap';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import UserItem from './components/UserItem';
import MessageBox from './components/MessageBox';
function App() {

  const [senderSocket, setSenderSocket] = useState()
  const [selectedMessages, setSelectedMessages] = useState([])
  const [messages, setMessages] = useState([
    {
      userid: '1',
      name: 'John Doe',
      imageUrl : 'https://randomuser.me/api/portraits/men/4.jpg',
      lastMessageTime: '19:10',
      messages: [
        {
          message: "Hey whatsup",
          time: `19:10`,
          type: 'OUTGOING',
          status: 'READ',
        },
        {
          message: "Whats",
          time: `19.11`,
          type: 'INCOMING',
          status: 'READ',
        },
      ]
    },
    {
      userid: '2',
      name: 'John Doe',
      imageUrl : 'https://randomuser.me/api/portraits/women/1.jpg',
      lastMessageTime: '19:10',
      messages: [
        {
          message: "Hey whatsup 2",
          time: `19:10`,
          type: 'OUTGOING',
          status: 'READ',
        },
        {
          message: "Whats 2",
          time: `19.11`,
          type: 'INCOMING',
          status: 'READ',
        },
      ]
    },
    {
      userid: '3',
      name: 'John Doe',
      imageUrl : 'https://randomuser.me/api/portraits/men/3.jpg',
      lastMessageTime: '19:10',
      messages: [
        {
          message: "Hey whatsup 3",
          time: `19:10`,
          type: 'OUTGOING',
          status: 'READ',
        },
        {
          message: "Whats 3",
          time: `19.11`,
          type: 'INCOMING',
          status: 'READ',
        },
      ]
    }
  ])
  const [text, setText] = useState("")
  const [targetUserId, setTargetUserId] = useState();

  const status = [<BsCheck />, "Received", "Read"];

  useEffect(() => {
    const ioSender = io(`${process.env.REACT_APP_WS_SENDER_BASEURL}`);
    setSenderSocket(ioSender);

    const ioReceiver = io(`${process.env.REACT_APP_WS_RECEIVER_BASEURL}`);

    // ioReceiver.on('message', textx => {
    //   setMessages(prev => [...prev, textx])
    // })

  }, [])

  const sendMsg = () => {
    senderSocket.emit('message', text);

    let time = new Date;
    let newMessage = {
      message: text,
      time: `${time.getHours()}:${time.getMinutes()}`,
      type: 'OUTGOING',
      status: 'READ'
    }

    messages.find(e => e.userid == targetUserId).messages.push(newMessage);
    
    setText("");
    console.log(messages)
  }

  const inputEnter = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  const openChat = (userId) => {
    setTargetUserId(userId);
    setSelectedMessages(messages.find(e => e.userid === userId).messages)
  }

  return (
    <div className="App">
      <div className="container mt-3">
        <div className="row">
          <div className="col-3 bg-darker seperator-right">
            <div className="row wa-navbar">
              <div className="col-12">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 wa-contatos">
                <div className='input-group flex-nowrap my-2'>
                  <input
                    className="form-control wa-input search-user-input"
                    placeholder="Search in your contacts"
                  />
                </div>
              </div>
            </div>
            {
              messages.map(e => (<UserItem key={e.userid} data={e} openChat={openChat} />))
            }
          </div>
          <div className="col-9">
            <div className="wa-navbar">
              <div className="container">
                <div className="row">
                  <div className="col-1 m-auto">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle" />
                  </div>
                  <div className="col-11">
                    <div className='mt-1'>
                      <span className='fw-bold'>John Doe</span>
                      <br />
                      <span style={{ fontSize: 12 }}>+55 00 0000-0000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wa-chat">
              <div className='scrollable-chat'>
                <br />
                <br />
                <div className="row">
                  <div className="offset-2 col-8">
                    <div style={{ textAlign: "center" }}>
                      <div className="card wa-card-chat wa-card-yellow">
                        The messages you send and the calls you make in this conversation are protected with end-to-end encryption. Click for more information.
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {
                  selectedMessages.map((e, index) => <MessageBox key={index} data={e} />)
                }
              </div>

            <div className="wa-panel-texto">
              <div style={{ textAlign: "center" }}>
                <div className="row">
                  <div className="col-11">
                    <input
                      className="form-control wa-input wa-message-input"
                      placeholder="Enter your message"
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => inputEnter(e)}
                      value={text}
                    />
                  </div>
                  <div className="col-1 m-auto cursor-pointer">
                    <i className="large wa-icon m-auto fa fa-paper-plane fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
