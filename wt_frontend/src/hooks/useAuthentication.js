import React, { useEffect } from 'react';
import useAxios from './useAxios';
import useUser from './useUser';
import useToken from './useToken';
import useFriends from './useFriends';

const useAuthentication = () => {
    const { setUser } = useUser();
    const { setToken, token } = useToken();
    const { setFriends } = useFriends();
    const {
        data: loginData,
        loading: loginLoading,
        postData: postLogin,
        error: loginError,
    } = useAxios(`/auth/signIn`);

    const {
        data: signupData,
        loading: signupLoading,
        postData: postSignUp,
        error: signupError,
    } = useAxios(`/auth/signUp`);

    const {
        data: tokenIsValiddata,
        getData: getTokenIsValid,
        error: tokenIsValidError,
    } = useAxios(`/auth/checkIfTokenIsValid`);
    useEffect(() => {
        if (tokenIsValidError) {
           console.log('tokenIsValidError',tokenIsValidError);
           setUser({});
           setFriends([]);
           setToken('');
        }
    }, [tokenIsValidError])
    const checkIfTokenIsValid = () => {
        const reqBody = {
            token: token,
        }
        getTokenIsValid({ params: reqBody });
    }
    useEffect(() => {
        if (!token || token == '') return;
        checkIfTokenIsValid();
    }, [token]);
    const login = (username, password) => {
        const reqBody = {
            username: username,
            password: password,
        };
        postLogin({ params: reqBody });
    };

    const signup = (username, password, email) => {
        const reqBody = {
            username: username,
            password: password,
            email: email,
        };
        postSignUp({ params: reqBody });
    };

    useEffect(() => {
        if (!signupData && !loginData) return;

        if (signupData) {
            setUser(signupData);
            setToken(signupData?.accessToken);

        }
        else if (loginData) {
            setUser(loginData);
            setToken(loginData?.accessToken);
        }

    }, [signupData, loginData]);

    return {
        signup,
        login,
        signupLoading,
        loginLoading,
        signupError,
        loginError,
    };
};


export default useAuthentication;
