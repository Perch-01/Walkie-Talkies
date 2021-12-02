import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { setReduxExampleState } from '../redux/reduxExample/action';

const useReduxExample = () => {
    const dispatch = useDispatch();
    const selectedReduxExample = useSelector(selectReduxExample);

    const setReduxExample = (data) => {
        dispatch(setReduxExampleState(data));
    };

    return {
        reduxExample: selectedReduxExample,
        setReduxExample,
    };
};

const selectReduxExample = createSelector(
    (state) => (state).reduxExample,
    (reduxExample) => reduxExample,
);

export default useReduxExample;
