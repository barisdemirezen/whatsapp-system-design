import './App.css';
import { Container, Row, Col, FormControl, InputGroup, Image } from 'react-bootstrap';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

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
    senderSocket.emit('message', text);
    setText("");
  }

  const inputEnter = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  const openChat = () => {

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


      {/* <Container>
        <Row className="my-4 header">
          <Col xs={3} className="header-profile-col p-0">
            <div className='d-flex gap-3 align-items-center px-4 py-2'>
              <Image className="profile-pic" src="https://randomuser.me/api/portraits/men/32.jpg" roundedCircle={true} />
              <div className='text-white'>Barış</div>
            </div>
            <div className='profile-col-dark row gap-2'>
              <Col xs={2}>
                <Image className="img-fluid" src="https://randomuser.me/api/portraits/men/32.jpg" roundedCircle={true} />
              </Col>
              <Col xs={8}>Bar Dem</Col>
              <Col xs={2}>18:20</Col>
            </div>
          </Col>
          <Col xs={9} className="">
            <Row className="py-2">
              <Col xs={1} className="receiver-col">
                <Image className="profile-pic" src="https://randomuser.me/api/portraits/women/11.jpg" roundedCircle={true} />
              </Col>
              <Col xs={11} className="d-flex align-middle ps-0">
                <div className="receiver-name d-flex align-items-center">Gamze</div>
              </Col>
            </Row>

            <Row className="chat-area overflow-scroll-y pt-4 pb-1 px-3">
              <Col>
                {
                  messages.map((e, index) => <div className="message my-2 py-1 px-3 rounded d-flex align-items-end justify-content-between" key={index}><div className='text-wrap text-break'>{e.Message}</div><div>{status[e.MessageStatusType]}</div></div>)
                }
              </Col>
            </Row>

            <Row className="input-row py-3">
              <Col xs={1}></Col>
              <Col>
                <InputGroup className="">
                  <FormControl
                    placeholder="Write a message"
                    className="text-area py-2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => inputEnter(e)}
                  />
                </InputGroup>
              </Col>
              <Col xs={1} className="d-flex align-items-center">
                <RiSendPlane2Fill onClick={() => sendMsg()} color={'#8696a0'} size={24} className="cursor-pointer" />
              </Col>
            </Row>

          </Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default App;
