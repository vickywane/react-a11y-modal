import React, { useReducer } from "react";

export const initialState = {
    isModalOpen: true,
    email: "",
    name: "",
    hasSubmittedDetails: false,

    handleModalVisibility: () => { },
    handleUserSubscriptionData: () => { },
    dispatch: () => { }
};

const AppContext = React.createContext(initialState);
export default AppContext;

const reducer = (state, action) => {
    switch (action.type) {
        case "setVisibility":
            return {
                ...state,
                isModalOpen: action.payload,
            };
        case "setSubscriptionDetails":
            return {
                ...state,
                name: action.payload,
                email: action.payload,
            }
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleModalVisibility = (visibility) => {
        dispatch({ type: "setVisibility", payload: visibility });
    };

    const handleUserSubscriptionData = ({ name, email }) => {
        dispatch({ type: "setSubscriptionDetails", payload: { name, email } })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                handleModalVisibility,
                handleUserSubscriptionData,
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
