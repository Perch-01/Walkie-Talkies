import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import Panel from '../../components/Panel';
import { useSpring, animated } from 'react-spring';
import { RiChatHeartLine } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { commonvalues } from '../../constants/common';
import Button from "../../components/Button";
import useUser from '../../hooks/useUser';
import useFriends from '../../hooks/useFriends';
import useToken from '../../hooks/useToken';
import useAuthentication from '../../hooks/useAuthentication';
const Index = () => {
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [selected, setSelected] = useState(null);//friendsAndChats or friendRequests or auth
    const { user, setUser } = useUser();
    const { setFriends } = useFriends();
    const { setToken } = useToken()
    const { } = useAuthentication();
    useEffect(() => {
        if (!user) return;
        if (Object.keys(user).length === 0)
            setSelected('auth');
        else
            setSelected('friendsAndChats');
    }, [user]);

    useEffect(() => {
        if (!selected)
            return;
        else if (loading)
            setLoading(false);
    }, [selected]);

    const [logo, logoSpring] = useSpring(() => ({
        height: '30%',
        left: '41%',
        top: '25%',
        // height: '15%',
        // left: '3%',
        // top: '10%',
    }));
    const animateLogo = () => {
        logoSpring.start({
            height: '15%',
            left: '3%',
            top: '10%',
            config: {
                duration: 1000,
            }
        });
    };

    useEffect(() => {
        if (!loading)
            animateLogo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <div id={styles.container}>
            <animated.img
                draggable={"false"}
                src={'./logo.svg'}
                id={styles.logo}
                style={{
                    ...logo,
                }}
            />
            {!loading && <Panel
                setShowMenu={setShowMenu}
                selected={selected} />}
            {user && showMenu ?
                Object.keys(user).length !== 0 ?
                    <div id={styles.layer1}>
                        <div
                            id={styles.layer1_item}
                            onClick={() => {
                                setSelected('friendsAndChats');
                            }}
                            style={{
                                backgroundColor: selected === 'friendsAndChats' ?
                                    'rgba(201,189,242,0.5)' : 'initial'
                            }}>
                            <RiChatHeartLine color={commonvalues.colors.WHITE} size={20} />
                            <p id={styles.layer1_text}>Friends and Chats</p>
                        </div>
                        <div
                            id={styles.layer1_item}
                            onClick={() => { setSelected('friendRequests') }}
                            style={{
                                backgroundColor: selected === 'friendRequests' ?
                                    'rgba(201,189,242,0.5)' : 'initial'
                            }}>
                            <FaUserFriends color={commonvalues.colors.WHITE} size={20} />
                            <p id={styles.layer1_text}>New Friend Requests</p>
                        </div>
                        <Button
                            text={"Sign out"}
                            onClick={() => {
                                setUser({});
                                setFriends([]);
                                setToken('');
                            }}
                            //loading={}
                            backgroundColor={commonvalues.colors.WHITE}
                            textColor={commonvalues.colors.PURPLE}
                            fontWeight={200}
                            width={"80%"}
                            height={"40px"}
                            marginTop={"100px"}
                        />
                    </div> : <></>
                : <></>}
        </div>
    )
};
export default Index;