// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosResponse } from 'axios';
import {createContext, useState} from 'react';

import {signIn, signUp, SignInData, SignUpData, me }  from '../services/resources/user';

interface UserDto{
    id: string;
    firstName: string;
    lastName: string;
    accountNumber: number;
    accountDigit: number;
    wallet: number;
    email: string;
}


interface ContextData {
    user: UserDto;
    userSignIn : (userData: SignInData) => Promise<UserDto>;
    userSignUp : (userData: SignUpData) => Promise<UserDto>;
    getCurrentUser: ()=> Promise<UserDto>;
}

export const AuthContext  = createContext<ContextData>({

} as ContextData)

export const ProviderContext: React.FC = ({children}) => {

    const[user, setUser] = useState<UserDto>(()=>{

        const user = localStorage.getItem('@Inter:User');

        if (user){
            return JSON.parse(user);
        }
    return {} as UserDto
    });

    const userSignIn = async (userData: SignInData) => {
        const {data} = await signIn(userData);

        if(data?.status === 'error'){
            return data;
        }

        if(data.accessToken){
        localStorage.setItem('@Inter:Token', data.accessToken)
        }

       return  getCurrentUser();

       
    }

    const getCurrentUser = async() => {

        const {data} = await me();

        setUser(data);

        return data;
    }

    const userSignUp = async (userData: SignUpData) => {
        const {data} = await signUp(userData);

        localStorage.setItem('@Inter:Token', data.accessToken)

        return await getCurrentUser();

    }


    return(
        <AuthContext.Provider value= {{user, userSignIn, userSignUp, getCurrentUser}}>
            {children}

        </AuthContext.Provider>
    )

}