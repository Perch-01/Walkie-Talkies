import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { useSpring, animated } from 'react-spring';
import InputField from '../InputField';
import Button from '../Button';
import { commonvalues } from '../../constants/common';
// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);

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
            <div id={styles.layer1}>
                <p id={styles.layer1Text} style={{ marginRight: "10px" }}>
                    {isSignIn ?
                        "Don't have an account?" :
                        "Already have an account?"
                    }
                </p>
                <Button
                    text={isSignIn ? "Sign In" : "Sign Up"}
                    onClick={() => {
                        const x = !isSignIn;
                        setIsSignIn(x);
                    }}
                    backgroundColor={commonvalues.colors.WHITE}
                    textColor={commonvalues.colors.PURPLE}
                    height={'40px'}
                    borderColor={commonvalues.colors.PURPLE}
                    borderWidth={"2px"}
                    borderRadius={20}
                    width={"100px"}
                />
            </div>
            <div id={styles.layer2}>
                <p id={styles.layer2Text_1}>Walkie Talkies</p>
                <p id={styles.layer2Text_2}>Sign into your account</p>
                <InputField
                    text={'Username'}
                    placeholder={'my_walkie_talkie_username'}
                    value={username}
                    onChange={(value) => { setUsername(value) }} />
                {!isSignIn && <InputField
                    text={'Email'}
                    placeholder={'my_cool_email'}
                    value={email}
                    onChange={(value) => { setEmail(value) }} />}
                <InputField
                    text={'Password'}
                    placeholder={'my_top_secret_password'}
                    value={password}
                    isPassword={true}
                    onChange={(value) => { setPassword(value) }} />
                <Button
                    text={isSignIn ? "Sign into Walkie Talkie" : "Sign up for Walkie Talkie"}
                    onClick={() => { }}
                    backgroundColor={commonvalues.colors.PURPLE}
                    textColor={commonvalues.colors.WHITE}
                    height={'50px'}
                    marginTop={"20px"}
                />
            </div>
        </animated.div>
    )
};
export default Index;