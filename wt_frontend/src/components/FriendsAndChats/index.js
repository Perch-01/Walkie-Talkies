import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { commonvalues } from '../../constants/common';
import Friends from '../Friends';
import ChatNameHeader from '../ChatNameHeader';
import ChatBody from '../ChatBody';
import ChatInput from '../ChatInputs';
import useUser from '../../hooks/useUser';
import _ from 'lodash'
import useFriends from '../../hooks/useFriends';
import Loader from "react-loader-spinner";
import useChat from '../../hooks/useChat';
import useSocketIO from '../../hooks/useSocket';

// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const { user } = useUser();
    const [friends, setFriends] = useState([]);
    const [chats, setChat] = useState([]);
    const { activeUsers, sendMessageSocketIO, recentMessageData } = useSocketIO();
    const {
        friends: userFriends,
    } = useFriends();

    const {
        clearChatNumber,
        getChats,
        getChatData,
        sendChat,
        getChatLoading,
    } = useChat();

    useEffect(() => {
        if (!getChatData) return;
        setChat(getChatData);
    }, [getChatData]);

    useEffect(() => {
        if (!recentMessageData) return;
        const { userId, latestMessage, date } = recentMessageData;
        let newFriends = [...userFriends];
        for (let i = 0; i < newFriends.length; i++)
            if (newFriends[i].friendId == userId && date != newFriends[i].mostRecentEditTime) {
                let currentObject = newFriends[i];
                currentObject.unreadMessages = currentObject.unreadMessages + 1;
                currentObject.latestMessage = latestMessage;
                currentObject.mostRecentEditTime = date;
                newFriends[i] = { ...currentObject };
                setFriends(newFriends);
                break;
            }
    }, [recentMessageData]);
    const clearChatNumber_ = (id) => {
        let newFriends = [...userFriends];
        for (let i = 0; i < newFriends.length; i++)
            if (newFriends[i].friendId == id) {
                let currentObject = newFriends[i];
                currentObject.unreadMessages = 0;
                newFriends[i] = { ...currentObject };
                setFriends(newFriends);
                break;
            }
    }
    const {
        searchForFriends,
        friendSearchData,
        friendSearchLoading,
        sendFriendRequest,
        friendRequestLoading,
        listOfFriendsFunction,
    } = useFriends();
    useEffect(() => {
        if (search.length >= 2) {
            const suggestions = () => {
                searchForFriends(search);
            }
            const toCall = _.debounce(suggestions, 1000);
            toCall();
        }
    }, [search]);
    useEffect(() => {
        if (!friendRequestLoading) {
            if (search.length >= 2)
                searchForFriends(search);
            listOfFriendsFunction();
        }
    }, [friendRequestLoading])
    useEffect(() => {
        if (!friendSearchData) return;
        setFriends(friendSearchData);
    }, [friendSearchData])
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
        <>
            <p id={styles.title}>{`Friends and Chats`}</p>
            <div id={styles.boxContainer}>
                <div id={styles.friendsBox}>
                    <ChatInput
                        height={"40px"}
                        width={"75%"}
                        placeholder={"Search for friends"}
                        value={search}
                        onChange={(value) => { setSearch(value) }}
                        isMessage={false}
                    />
                    {friendSearchLoading ?
                        <div style={{ marginTop: "50px" }}>
                            <Loader
                                type="TailSpin"
                                color={commonvalues.colors.DEEPPURPLE}
                                height={'35px'}
                                width={'35px'}

                            />
                        </div> :
                        search.length <= 2 ?
                            (userFriends ?
                                userFriends?.sort((a, b) => {
                                    const d1 = a?.mostRecentEditTime ? a.mostRecentEditTime : 0;
                                    const d2 = b?.mostRecentEditTime ? b.mostRecentEditTime : 0;
                                    return d1 > d2 ? -1 : 1;
                                }).map((value, index) => {
                                    const {
                                        username, chatLineId,
                                        latestMessage,
                                        mostRecentEditTime, unreadMessages, friendId
                                    } = value;
                                    const isFriend = true;
                                    return (
                                        <Friends
                                            username={username}
                                            latestMessage={latestMessage ? latestMessage : ''}
                                            key={index}
                                            isActive={activeUsers.includes(friendId)}
                                            onClick={() => {
                                                setSelected({
                                                    username: username,
                                                    index: index,
                                                    chatLineId: chatLineId,
                                                    _id: friendId
                                                });

                                                getChats(chatLineId);
                                                clearChatNumber(user?._id, friendId)
                                                clearChatNumber_(friendId);
                                            }}
                                            date={mostRecentEditTime ? formatDate(mostRecentEditTime) : ''}
                                            isFriend={isFriend}
                                            selected={selected?.index === index}
                                            numberOfUnreadMessages={unreadMessages ? unreadMessages : 0}
                                            friendRequestSent={false}
                                        />
                                    );
                                }) : <></>)
                            :
                            friends ?
                                friends.map((value, index) => {
                                    const {
                                        isFriend,
                                        username,
                                        friendRequestSent,
                                        chatLineId,
                                        friendObject,
                                        _id
                                    } = value;
                                    const {
                                        latestMessage = null,
                                        mostRecentEditTime = null,
                                        unreadMessages = null
                                    } = friendObject
                                    return (
                                        <Friends
                                            username={username}
                                            key={index}
                                            isActive={activeUsers.includes(_id)}
                                            latestMessage={latestMessage ? latestMessage : ''}
                                            onClick={() => {
                                                if (isFriend) {
                                                    setSelected({
                                                        username: username,
                                                        index: index,
                                                        chatLineId: chatLineId,
                                                        _id: _id
                                                    });
                                                    getChats(chatLineId);
                                                    clearChatNumber(user?._id, _id);
                                                    clearChatNumber_(_id);
                                                }
                                                else if (!friendRequestSent) {
                                                    setSelected(null);
                                                    sendFriendRequest(user.username, user._id, value._id);
                                                    let newValue = { ...value };
                                                    newValue.friendRequestSent = true;
                                                    let newFriends = [...friends];
                                                    newFriends[index] = newValue;
                                                    setFriends(newFriends);
                                                }
                                            }}
                                            date={mostRecentEditTime ? formatDate(mostRecentEditTime) : ''}
                                            isFriend={isFriend}
                                            selected={isFriend ? selected?.index === index : false}
                                            numberOfUnreadMessages={unreadMessages ? unreadMessages : 0}
                                            friendRequestSent={friendRequestSent}
                                        />
                                    );
                                }) : <></>}
                </div>
                {(selected !== null) && <div id={styles.chatBox}>
                    <ChatNameHeader username={selected?.username} />
                    <ChatBody
                        userId={user?._id}
                        loading={getChatLoading}
                        mainChats={chats}
                        friendId={selected?._id}
                        senderId={user?._id}
                        sendChat={(value) => {
                            sendMessageSocketIO(value, selected?._id, user?._id);
                            sendChat(user?._id, selected?._id, selected?.chatLineId, value)
                        }}
                    />
                </div>}
            </div>
        </>
    );
};
export default Index;