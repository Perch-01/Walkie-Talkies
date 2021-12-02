import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './layout.module.css';

import SignUp from '../Signup';
import FriendsAndChats from '../FriendsAndChats';
import FriendRequests from '../FriendRequests';
// eslint-disable-next-line no-empty-pattern
const Index = ({
    selected,
}) => {

    const [position, positionString] = useSpring(() => ({
        right: '-85vw',
        //right: '0vw',
    }));
    const animatePosition = () => {
        positionString.start({
            right: '0vw',
            config: {
                duration: 1000,
            }
        });
    };
    useEffect(() => {
        animatePosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <animated.div
            id={styles.container}
            style={{
                //...position
                ...position,
            }}>
            {selected === 'auth' ?
                <SignUp /> :
                selected === 'friendsAndChats' ?
                    <FriendsAndChats /> :
                    <FriendRequests />}
        </animated.div>
    )
};
export default Index;