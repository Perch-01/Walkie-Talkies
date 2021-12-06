import { useSpring, animated } from 'react-spring';
import React, { useEffect } from 'react';
import styles from './layout.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import { commonvalues } from '../../constants/common';
const Index = ({
    onClick,
    selected,
    isFriend,
    date,
    numberOfUnreadMessages,
    friendRequestSent,
    username,
    latestMessage,
}) => {
    const [size, sizeSpring] = useSpring(() => ({
        minHeight: "80px",
        width: "75%"
    }));
    useEffect(() => {
        if (!isFriend) return;
        if (selected)
            sizeSpring.start({
                minHeight: "100px",
                width: "95%",

            });
        else
            sizeSpring.start({
                minHeight: "80px",
                width: "75%",

            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])
    return (
        <animated.div
            onClick={onClick}
            id={styles.container}
            style={{ ...size, }}>
            <div id={styles.profilePic}>
                {isFriend && <div id={styles.active} />}
                <AiOutlineUser size={30} />
            </div>
            <div id={styles.nameDescription}>
                <p id={styles.name}>{username}</p>
                {isFriend && !selected && <p id={styles.description}>{latestMessage}</p>}
            </div>

            {isFriend ? (
                !selected && 
                <>
                    <p id={styles.date}>{date}</p>
                   { numberOfUnreadMessages !== 0 &&
                    <div className={styles.circle}>
                        <p id={styles.numberOfUnreadMessages}>{numberOfUnreadMessages}</p>
                    </div>}
                </>
            ) : <div className={styles.circle}>
                {friendRequestSent ?
                    <MdDone color={commonvalues.colors.WHITE} size={10} /> :
                    <BsPlusLg color={commonvalues.colors.WHITE} size={10} />}
            </div>}
        </animated.div>
    )
};
export default Index;