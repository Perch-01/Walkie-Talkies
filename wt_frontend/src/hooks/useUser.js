import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserData } from '../redux/user/action';
import useAxios from './useAxios';

const useUser = () => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(selectUser);


    const setUser = (data) => {
        dispatch(setUserData(data));
    };

    return {
        user: selectedUser,
        setUser,
    };
};

const selectUser = createSelector(
    (state) => (state).user,
    (user) => user,
);

export default useUser;
