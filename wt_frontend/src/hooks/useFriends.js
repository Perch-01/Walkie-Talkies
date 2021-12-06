import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { setFriendsData } from '../redux/friends/action';
import useAxios from './useAxios';
import useUser from './useUser';
const useFriends = () => {
    const dispatch = useDispatch();
    const selectedFriends = useSelector(selectFriends);
    const { user } = useUser();

    const {
        data: listOfFriends,
        getData: getListOfFriends,
    } = useAxios(`/friends/listOfFriends`);

    const listOfFriendsFunction = () => {
        const reqBody = {
            userId: user._id,
        };
        getListOfFriends({ params: reqBody })
    };
    useEffect(() => {
        if (!listOfFriends) return;
        setFriends(listOfFriends);
    }, [listOfFriends]);
    const setFriends = (data) => {
        dispatch(setFriendsData(data));
    };

    const {
        data: friendSearchData,
        loading: friendSearchLoading,
        getData: getFriendSearch,
        error: friendSearchError,
    } = useAxios(`/friends/search`);

    const searchForFriends = (searchValue) => {
        const reqBody = {
            searchValue: searchValue,
            userId: user._id,
        };
        getFriendSearch({ params: reqBody });
    }
    useEffect(() => {
        if (!user) return;
        listOfFriendsFunction()
    }, [user,])
    const {
        data: currentfriendRequestData,
        postData: postSendFriendRequest,
        loading: friendRequestLoading,
    } = useAxios(`/friends/sendFriendRequest`);
    const sendFriendRequest = (username, id, recieverId) => {
        const reqBody = {
            username: username,
            id: id,
            recieverId: recieverId,
        };
        postSendFriendRequest({ params: reqBody })
    }
    useEffect(() => {
        if (!currentfriendRequestData) return;
        listOfFriendsFunction()
    }, [currentfriendRequestData,]);

    const {
        data: friendRequestData,
        getData: getListFriendRequest,
        loading: listOfFriendRequestLoading
    } = useAxios(`/friends/getFriendRequests`);
    const getListOfFriendRequest = (id) => {
        const reqBody = {
            id: id,
        };
        getListFriendRequest({ params: reqBody })
    }

    const {
        data: acceptOrDeclineFriendRequestData,
        postData: postAcceptOrDeclineFriendRequest,
    } = useAxios(`/friends/acceptOrDeclineFriendRequest`);
    const acceptOrDeclineFriendRequest = (id, isAccept, friendRequestId, friendUsername) => {
        const reqBody = {
            userId: user._id,
            friendId: id,
            acceptFriendRequest: isAccept,
            friendRequestId: friendRequestId,
            username: user.username,
            friendUsername: friendUsername,
        };
        postAcceptOrDeclineFriendRequest({ params: reqBody })
    };
    useEffect(() => {
        if (!acceptOrDeclineFriendRequestData) return;
        listOfFriendsFunction()
    }, [acceptOrDeclineFriendRequestData,])


    return {
        friends: selectedFriends,
        setFriends,
        friendSearchData,
        searchForFriends,
        friendSearchLoading,
        sendFriendRequest,
        getListOfFriendRequest,
        friendRequestData,
        listOfFriendRequestLoading,
        acceptOrDeclineFriendRequest,
        currentfriendRequestData,
        listOfFriendsFunction,
        friendRequestLoading
    };
};

const selectFriends = createSelector(
    (state) => (state).friends,
    (friends) => friends,
);

export default useFriends;
