import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { commonvalues } from '../../constants/common';
import FriendRequestItem from '../FriendRequestItem';
// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [friendRequests, setFriendRequests] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    return (
        <>
            <p id={styles.title}>Friend Requests</p>
            <div id={styles.boxContainer}>
                <div id={styles.friendsBox}>
                    {friendRequests.map((value, index) => {
                        return (<FriendRequestItem username={'new_buddy'} />)
                    })}
                </div>

            </div>
        </>
    );
};
export default Index;