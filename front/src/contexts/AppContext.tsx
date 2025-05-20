import React from "react";

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
}

type AppContextType = {
    userName: string | undefined;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
    user: string; 
    setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const MyContext = React.createContext<AppContextType | undefined>(undefined);

type AppContextProps = {
    children: React.ReactNode;
};

const AppContext = ({children}: AppContextProps) => {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    const [user, setUser] = React.useState<string>('');

    const values: AppContextType = {
        userName, 
        setUserName,
        user, 
        setUser
    };

    return(
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};

export default AppContext