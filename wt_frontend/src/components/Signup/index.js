import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import InputField from '../InputField';
import Button from '../Button';
import { commonvalues } from '../../constants/common';
import useAuthentication from '../../hooks/useAuthentication';
import axios from 'axios';
import endpoints from '../../constants/endpoints';
// eslint-disable-next-line no-empty-pattern
const Index = ({ }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const { signup, login, signupError, loginError } = useAuthentication();

    useEffect(() => {
        if (!signupError) return;
        setLoading(false);
        const { data } = signupError;
        setErrorMessage(data?.message || data);
    }, [signupError]);

    useEffect(() => {
        if (!loginError) return;
        const { data } = loginError;
        setLoading(false);
        setErrorMessage(data?.message || data);
    }, [loginError]);

    useEffect(() => {
        setErrorMessage('')
    }, [isSignIn])

    return (
        <>
            <div id={styles.layer1}>
                <p id={styles.layer1Text} style={{ marginRight: "10px" }}>
                    {isSignIn ?
                        "Don't have an account?" :
                        "Already have an account?"
                    }
                </p>
                <Button
                    text={isSignIn ? "Sign Up" : "Sign In"}
                    onClick={() => {
                        const x = !isSignIn;
                        setIsSignIn(x);
                    }}
                    backgroundColor={commonvalues.colors.GREY}
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
                    isEmail
                    onChange={(value) => { setEmail(value) }} />}
                <InputField
                    text={'Password'}
                    placeholder={'my_top_secret_password'}
                    value={password}
                    isPassword={true}
                    onChange={(value) => { setPassword(value) }} />
                <Button
                    text={isSignIn ? "Sign into Walkie Talkie" : "Sign up for Walkie Talkie"}
                    onClick={() => {
                        if (username.length == 0)
                            setErrorMessage('Enter a username')
                        else if (password.length == 0)
                            setErrorMessage('Enter a password')
                        else if (isSignIn) {
                            login(username, password);
                        }
                        else {
                            if (email.length == 0)
                                setErrorMessage('Enter an email (It can be a random email, this is just a test)')
                            else
                                signup(username, password, email);
                        }
                    }}
                    backgroundColor={commonvalues.colors.PURPLE}
                    textColor={commonvalues.colors.GREY}
                    loading={loading}
                    height={'50px'}
                    marginTop={"20px"}
                />
                <p id={styles.error}>{errorMessage}</p>
            </div>
        </>
    )
};
export default Index;