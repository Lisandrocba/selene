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
    users: IUser[]; 
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
    user: IUser[]; 
    setUser: React.Dispatch<React.SetStateAction<IUser[]>>;
};

export const MyContext = React.createContext<AppContextType | undefined>(undefined);

type AppContextProps = {
    children: React.ReactNode;
};

const AppContext = ({children}: AppContextProps) => {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [user, setUser] = React.useState<IUser[]>([]);

    const values: AppContextType = {
        userName, 
        setUserName,
        users, 
        setUsers,
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