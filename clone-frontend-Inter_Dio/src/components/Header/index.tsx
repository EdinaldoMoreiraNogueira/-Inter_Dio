/* eslint-disable jsx-a11y/anchor-is-valid */
import {HeaderContainer, HeaderWrapper, UserInfo} from './styles';
import UserCircle from '../UserCircle';

import logoInter from '../../assets/images/Inter-orange.png';
import { useNavigate } from 'react-router-dom';

import userAuth from '../../hooks/userAuth';

const Header = () => {
   
    const navigate = useNavigate();
    const {user} = userAuth();

  //  const initiais = user.firstName.slice(0,1) + user.lastName.slice(0,1)

    const handleLogoff = () => {
        navigate('/signin')
    }
    return (
        <HeaderContainer>
            <HeaderWrapper>
                   <img src={logoInter} width={172} height={61} alt="logo inter" />
                <UserInfo>
                  <UserCircle initials= "EMN"/>
                  <div>
                      <p>Olá, <span className="primary-color font-bold">{user.firstName} {user.lastName}</span></p>
                      <strong>{user.accountNumber}-{user.accountDigit}</strong><br/>
                      <a href="#" onClick={handleLogoff}>Sair</a>
                  </div>
                </UserInfo>
            </HeaderWrapper>
        </HeaderContainer>
    )
}

export default Header