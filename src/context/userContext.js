import React, { useContext, createContext, useState } from "react";

const UserContext = createContext({});


export const UserContextProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [currency_id, setCurrencyId] = useState('');
    const [action_type, setActionType] = useState('')
    const [sendSummary, setSendSummary] = useState({type: '', amount: '', address: ''})

    const value = {
        email,
        setEmail,
        sendSummary,
        setSendSummary,
        currency_id,
        setCurrencyId,
        setActionType,
        action_type
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


export const useUser = () => useContext(UserContext);