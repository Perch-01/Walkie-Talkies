import React, { useState, useRef, useEffect } from 'react';
import styles from './layout.module.css';
import ChatInput from '../ChatInputs';
import Chat from '../Chats';
import Loader from "react-loader-spinner";
import { commonvalues } from '../../constants/common';

const Index = ({
    loading,
    mainChats,
    sendChat,
    senderId,
    userId,
}) => {
    const scrollViewRef = useRef(null);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        scrollViewRef.current.scrollIntoView();
    }, []);

    useEffect(() => {
        if (!mainChats) return;
        setChats(mainChats);
    }, [mainChats]);

    const sendMessage = () => {
        let newChat = [...chats];
        newChat.push({
            senderId: senderId,
            message: message,
            date: new Date().getTime(),
        })
        setChats(newChat);
        setMessage('');
        scrollViewRef.current.scrollIntoView();
    };
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const formatDate = (mostRecentEditTime) => {
        const date = new Date(mostRecentEditTime);
        return `${formatAMPM(date).toUpperCase()}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    };

    return (
        <div id={styles.container}>
            <div id={styles.chatContainer}

            >
                {loading ?
                    <div id={styles.loaderContainer}>
                        <Loader
                            type="TailSpin"
                            color={commonvalues.colors.DEEPPURPLE}
                            height={'35px'}
                            width={'35px'}

                        />
                    </div>
                    :
                    chats.map((value, index) => {
                        const { senderId, message, date } = value;
                        return <Chat
                            key={index}
                            message={message}
                            isRecieved={senderId !== userId}
                            date={formatDate(date)}
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
                sendMessageFunction={() => {
                    sendChat(message);
                    sendMessage();
                }}
            />
            <div style={{ height: "15px" }} />
        </div>
    )
};
export default Index;