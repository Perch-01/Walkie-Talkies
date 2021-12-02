import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { setTokenData } from '../redux/token/action';

const useToken = () => {
    const dispatch = useDispatch();
    const selectedToken = useSelector(selectToken);

    const setToken = (data) => {
        dispatch(setTokenData(data));
    };

    return {
        token: selectedToken,
        setToken,
    };
};

const selectToken = createSelector(
    (state) => (state).token,
    (token) => token,
);

export default useToken;
