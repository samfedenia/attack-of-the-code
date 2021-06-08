import React, { createContext, useReducer, useMemo } from 'react';

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
    const [backgroundsState, backgroundsDispatch] = useReducer(reducer, initialState);
    console.log('backgroundsState in reducer', backgroundsState)

    const backgroundContextValue = useMemo(() => {
        return { backgroundsState, backgroundsDispatch };
    }, [backgroundsState, backgroundsDispatch]);

    return (
        <BackgroundContext.Provider value={backgroundContextValue}>{children}</BackgroundContext.Provider>
    )
}