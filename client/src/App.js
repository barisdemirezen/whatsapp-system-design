import './App.css';
import { Container, Row, Col, FormControl, InputGroup, Image } from 'react-bootstrap';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import UserItem from './components/UserItem';

function App() {

  const [senderSocket, setSenderSocket] = useState()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  const status = [<BsCheck />, "Received", "Read"];

  useEffect(() => {
    const ioSender = io(`${process.env.REACT_APP_WS_SENDER_BASEURL}`);
    setSenderSocket(ioSender);

    const ioReceiver = io(`${process.env.REACT_APP_WS_RECEIVER_BASEURL}`);

    ioReceiver.on('message', textx => {
      setMessages(prev => [...prev, textx])
    })

  }, [])

  const sendMsg = () => {
    console.log(text)
    senderSocket.emit('message', text);
    setText("");
  }

  const inputEnter = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  const openChat = () => {
    console.log("pressed")
  }

  return (
    <div className="App">
      <div className="container mt-3">
        <div className="row">
          <div className="col-3 bg-white">
            <div className="row wa-navbar">
              <div className="col-12">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 wa-contatos">
                <div className='input-group flex-nowrap'>
                  <input
                    className="form-control wa-input"
                    placeholder="Search in your contacts"
                  />
                  <span className='m-auto cursor-pointer'><i className='fa fa-search'></i></span>
                </div>
              </div>
            </div>
            <UserItem openChat={openChat} />
            <div className="row wa-item-chat py-2 cursor-pointer" onClick={() => openChat()}>
              <div className="col-2 p-0">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle img-fluid" />
              </div>
              <div className="col-8">
                <b>John Doe</b>
                <br />
                <p className="wa-preview-message">Hey dont you see my...</p>
              </div>
              <div className="col-2" style={{ textAlign: "right" }}>
                <span>16:24</span>
                <span className="badge badge-pill wa-badge">81</span>
              </div>
            </div>
            <hr />
            <div className="row wa-item-chat py-2 cursor-pointer" onClick={() => openChat()}>
              <div className="col-2 p-0">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle img-fluid" />
              </div>
              <div className="col-8">
                <b>John Doe</b>
                <br />
                <p className="wa-preview-message">Hey dont you see my...</p>
              </div>
              <div className="col-2" style={{ textAlign: "right" }}>
                <span>16:24</span>
                <span className="badge badge-pill wa-badge">54</span>
              </div>
            </div>
            <hr />
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
                      <span style={{ fontSize: 12 }}>John Doe</span>
                      <br />
                      <span style={{ fontSize: 12 }}>+55 00 0000-0000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wa-chat">
              <div>
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
                <div className="row">
                  <div className="offset-6 col-5">
                    <div className="card wa-card-chat wa-card-green">
                      Hey, how you doing?
                      <div style={{ textAlign: "right" }}>
                        <span>11:00</span>
                        <i className="large material-icons wa-icon wa-chat-icon fa fa-check-double ms-1">
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <div className="card wa-card-chat wa-card-default">
                      Great, what about you?
                      <div style={{ textAlign: "right" }}>
                        <span>11:10</span>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="offset-6 col-5">
                    <div className="card wa-card-chat wa-card-green">
                      Well.
                      <div style={{ textAlign: "right" }}>
                        <span>14:02</span>
                        <i className="large material-icons wa-icon wa-chat-icon fa fa-check-double ms-1">
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wa-panel-texto">
                <div style={{ textAlign: "center" }}>
                  <div className="row">
                    <div className="col-11">
                      <input
                        className="form-control wa-input"
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
