import React, { } from 'react';
import styles from './layout.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import Button from '../Button';
import { commonvalues } from '../../constants/common';
const Index = ({
    username,
    onAccept,
    onDecline,
}) => {
    return (
        <div id={styles.container}>
            <div id={styles.profilePic}>
                <AiOutlineUser size={30} />
            </div>
            <div id={styles.nameDescription}>
                <p id={styles.name}>{username}</p>
            </div>
            <Button
                text={"Accept"}
                onClick={onAccept}
                backgroundColor={commonvalues.colors.DEEPPURPLE}
                textColor={commonvalues.colors.WHITE}
                width={"90px"}
                height={"35px"}
                fontSize={"90%"}
                borderRadius={"40px"}
            />
            <Button
                text={"Decline"}
                onClick={onDecline}
                backgroundColor={commonvalues.colors.WHITE}
                textColor={commonvalues.colors.DEEPPURPLE}
                width={"90px"}
                height={"35px"}
                fontSize={"90%"}
                borderRadius={"40px"}
            />
        </div>
    )
};
export default Index;