import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { setChatData } from '../redux/chat/action';
import useAxios from './useAxios';
const useChat = () => {
    const dispatch = useDispatch();
    const selectedChat = useSelector(selectChat);

    const setChat = (data) => {
        dispatch(setChatData(data));
    };
    const {
        data: sendChatData,
        postData: postSendChat,
        error: sendChatError,
    } = useAxios(`/chat/sendChat`);
    const {
        data: getChatData,
        getData: getChat,
        loading: getChatLoading,
        error: getChatError,
    } = useAxios(`/chat/getChat`);
    const {
        data: clearChats,
        postData: postClearChats,
        error: clearChatError,
    } = useAxios(`/chat/setChatNumberToZero`);


    const sendChat = (userId, recieverId, chatLineId, message) => {
        const reqBody = {
            userId: userId,
            recieverId: recieverId,
            chatLineId: chatLineId,
            message: message,
        };
        postSendChat({ params: reqBody });
    };
    const getChats = (chatLineId) => {
        const reqBody = {
            chatLineId: chatLineId,
        };
        getChat({ params: reqBody });
    };
    const clearChatNumber = (userId, recieverId) => {
        const reqBody = {
            userId: userId,
            recieverId: recieverId,
        };
        postClearChats({ params: reqBody });
    };
    return {
        chat: selectedChat,
        setChat,
        //////////////////
        sendChat,
        getChats,
        getChatData,
        getChatLoading,
        clearChatNumber,
    };

};

const selectChat = createSelector(
    (state) => (state).chat,
    (chat) => chat,
);

export default useChat;
