import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { commonvalues } from '../../constants/common';
import FriendRequestItem from '../FriendRequestItem';
import useFriends from '../../hooks/useFriends';
import useUser from '../../hooks/useUser';
import Loader from "react-loader-spinner";

// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const {
        getListOfFriendRequest,
        friendRequestData,
        listOfFriendRequestLoading,
        acceptOrDeclineFriendRequest
    } = useFriends();
    const { user } = useUser();
    useEffect(() => {
        if (!user) return;
        getListOfFriendRequest(user?._id);
    }, [user])
    useEffect(() => {
        if (!friendRequestData) return;
        setFriendRequests(friendRequestData);
    }, [friendRequestData]);
    const acceptOrDecline = (isAccept, index, friendRequestId, friendUsername) => {
        acceptOrDeclineFriendRequest(friendRequests[index]?.userId, isAccept, friendRequestId, friendUsername)
        let newfriendRequests = [...friendRequests];
        newfriendRequests.splice(index, 1);
        setFriendRequests(newfriendRequests);
    }
    return (
        <>
            <p id={styles.title}>Friend Requests</p>
            <div id={styles.boxContainer}>
                <div id={styles.friendsBox}>
                    {
                        listOfFriendRequestLoading ?
                            <div style={{ marginTop: "50px" }}>
                                <Loader
                                    type="TailSpin"
                                    color={commonvalues.colors.DEEPPURPLE}
                                    height={'35px'}
                                    width={'35px'}

                                />
                            </div> :
                            friendRequests.map((value, index) => {
                                const { username, _id } = value;
                                return (
                                    <FriendRequestItem
                                        key={index}
                                        username={username}
                                        onAccept={() => {
                                            acceptOrDecline(true, index, _id, username);
                                        }}
                                        onDecline={() => {
                                            acceptOrDecline(false, index, _id, username);
                                        }}
                                    />
                                )
                            })}
                </div>

            </div>
        </>
    );
};
export default Index;