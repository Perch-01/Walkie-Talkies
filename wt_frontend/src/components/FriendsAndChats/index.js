import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { commonvalues } from '../../constants/common';
import Friends from '../Friends';
import ChatNameHeader from '../ChatNameHeader';
import ChatBody from '../ChatBody';
import ChatInput from '../ChatInputs';
// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const friends = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <>
            <p id={styles.title}>Friends and Chats</p>
            <div id={styles.boxContainer}>
                <div id={styles.friendsBox}>
                    <ChatInput
                        height={"40px"}
                        width={"75%"}
                        placeholder={"Send for friends"}
                        value={search}
                        onChange={(value) => { setSearch(value) }}
                        isMessage={false}
                    />
                    {friends.map((value, index) => {
                        let isFriend = index < 6;
                        return (<Friends
                            key={index}
                            onClick={() => {
                                setSelected(index);
                            }}
                            date={'21/11/2021'}
                            isFriend={isFriend}
                            selected={selected === index}
                            numberOfUnreadMessages={index % 3}
                            friendRequestSent={index % 2 === 0}
                        />)
                    })}
                </div>
                <div id={styles.chatBox}>
                    <ChatNameHeader username={'my_friends_username'} />
                    <ChatBody />
                </div>
            </div>
        </>
    );
};
export default Index;