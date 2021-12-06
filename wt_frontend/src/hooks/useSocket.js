import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useToken from './useToken';
import useUser from './useUser';
import endpoints from '../constants/endpoints';
const socket = io(endpoints.MAIN_URL, {
    extraHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`
    }
});
const useSocketIO = () => {
    const { user } = useUser();
    const { token } = useToken();
    const [activeUsers, setActiveUsers] = useState([])
    const [recentMessageData, setRecentMessageData] = useState(null)

    useEffect(() => {
        if (!user || Object.keys(user).length === 0) return;

        socket.emit('login', {
            userId: user?._id,
            username: user?.username
        });
        socket.on('updatedActiveUsers', data => {
            setActiveUsers(data);
        });
        socket.on('recieveMessageSocketIO', data => {
            setRecentMessageData(data);
        });
        return () => {
            socket.emit('logout', { userId: user?._id });
        }
    }, [user, token]);

    const sendMessageSocketIO = (latestMessage, friendId, userId) => {
        socket.emit('sendMessageSocketIO', {
            latestMessage: latestMessage,
            friendId: friendId,
            userId: userId,
            date: new Date().getTime(),
        });
    }
    return {
        activeUsers,
        sendMessageSocketIO,
        recentMessageData,
    };
};

export default useSocketIO;