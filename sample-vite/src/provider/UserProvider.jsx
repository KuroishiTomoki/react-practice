import { createContext, useState } from "react";


export const UserContent = createContext({});

export const UserProvider = (props) => {

    const { children } = props;

    const [userInfo, setUserInfo] = useState(null);

    return(
        <UserContent.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContent.Provider>
    )
}