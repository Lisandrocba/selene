import React from "react";

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
}

type AppContextType = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    user: string; 
    setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const MyContext = React.createContext<AppContextType>({
    userName: '',
    setUserName: () => {},
    user: '',
    setUser: () => {}
});

type AppContextProps = {
    children: React.ReactNode;
};

const AppContext = ({children}: AppContextProps) => {
    const [userName, setUserName] = React.useState<string >('');
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