import React, { useEffect } from "react";
import { useDispatch } from 'redux-react-hook';
import actionTypes from '../common/constants/actionTypes';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actionTypes.HOME_LOADED_ACTION });
    }, [])
    return (
        <div>
            <h1>Patronage 2020 - JavaScript</h1>
        </div>
    )
}