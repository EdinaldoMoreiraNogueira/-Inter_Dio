/* eslint-disable react-hooks/rules-of-hooks */
import {useContext} from 'react';

import {AuthContext} from '../context/AuthContext';

const userAuth = () => {

    
    const context = useContext(AuthContext);

    if(!context){
        throw new Error ('Nenhum contexto encontrado')
    }

    return context;

}

export default userAuth;