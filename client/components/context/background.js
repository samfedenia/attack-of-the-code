import axios from 'axios';
import React, { createContext, useEffect, useReducer, useMemo } from 'react';

export const BackgroundContext = createContext();

export const BACKGROUNDS_ACTIONS = {
    SET_BACKGROUNDS: 'SET_BACKGROUNDS'
}

const initialState = [];

const reducer = (state, action) => {
    switch(action.type) {
        case BACKGROUNDS_ACTIONS.SET_BACKGROUNDS:
            return [...state, ...action.payload]
        default:
            return state;
    }
}


export const BackgroundProvider = ({ children }) => {
    const getBackgrounds = async () => {
        const backgrounds = await axios.get('/api/backgrounds');
        return backgrounds.data;
    };

    const [backgroundsState, backgroundsDispatch] = useReducer(reducer, initialState);

        //FEEDBACK: i believe you have to clean this up, right?
    useEffect(() => {
        getBackgrounds().then(response => backgroundsDispatch(
        {
            type: BACKGROUNDS_ACTIONS.SET_BACKGROUNDS,
            payload: response
        }))
    }, []);

    const backgroundContextValue = useMemo(() => {
        return { backgroundsState, backgroundsDispatch };
    }, [backgroundsState, backgroundsDispatch]);

    return (
        <BackgroundContext.Provider value={backgroundContextValue}>{children}</BackgroundContext.Provider>
    )
}
