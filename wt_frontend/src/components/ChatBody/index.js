import React, { useState, useRef, useEffect } from 'react';
import styles from './layout.module.css';
import ChatInput from '../ChatInputs';
import Chat from '../Chats';
const Index = () => {
    const scrollViewRef = useRef(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    useEffect(() => {
        scrollViewRef.current.scrollIntoView();
    }, [])
    return (
        <div id={styles.container}>
            <div id={styles.chatContainer}

            >
                {chat.map((value, index) => {
                    return <Chat
                        isRecieved={index % 2 === 0}
                        date={'11/12/2021'}
                    />
                })}
                <div style={{ float: "left", clear: "both" }}
                    ref={scrollViewRef}>
                </div>
            </div>
            <ChatInput
                height={"10%"}
                width={"95%"}
                placeholder={"Send your message!"}
                value={message}
                onChange={(value) => { setMessage(value) }}
                isMessage={true}
                attachmentFunction={() => { }}
                sendMessageFunction={() => { }}
            />
            <div style={{ height: "15px" }} />
        </div>
    )
};
export default Index;