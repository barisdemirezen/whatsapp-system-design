import './App.css';
import { Container, Row, Col, FormControl, InputGroup, Image } from 'react-bootstrap';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

function App() {

  const [senderSocket, setSenderSocket] = useState()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  const status = [<BsCheck/>, "Received", "Read"];

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
    if(e.key === 'Enter'){
      sendMsg();
    }
  }

  return (
    <div className="App">
      <Container>
        <Row className="my-4 header">
          <Col xs={3} className="header-profile-col px-4 py-2">
            <Image className="profile-pic" src="https://randomuser.me/api/portraits/men/32.jpg" roundedCircle={true} />
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
                <RiSendPlane2Fill onClick={() => sendMsg()} color={'#8696a0'} size={24} className="cursor-pointer"/>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
