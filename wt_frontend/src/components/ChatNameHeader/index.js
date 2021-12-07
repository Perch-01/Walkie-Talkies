import { useSpring, animated } from 'react-spring';
import React, { useEffect } from 'react';
import styles from './layout.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import { commonvalues } from '../../constants/common';
const Index = ({
    username
}) => {

    return (
        <div
            id={styles.container}>
            <div id={styles.profilePic}>
                <AiOutlineUser size={30} />
            </div>
            <div id={styles.nameDescription}>
                <p id={styles.name}>{username}</p>
            </div>
        </div>
    )
};
export default Index;