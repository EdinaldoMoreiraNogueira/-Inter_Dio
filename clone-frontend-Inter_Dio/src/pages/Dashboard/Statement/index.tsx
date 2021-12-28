import {useEffect, useState} from 'react';
import {StatementItemContainer, StatementItemImage, StatementItemInfo, StatementContainer} from './styles';
import {FiDollarSign} from 'react-icons/fi'
import {format} from 'date-fns';
import {transactions} from '../../../services/resources/pix';

interface StatementItem {
    user: {
        firstName: string,
        lastName: string
    },
    value: number,
    type: 'pay' | 'received',
    updatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const StatementItem = ({user, value, type, updatedAt}: StatementItem) => {
    return (
        <StatementItemContainer>
            <StatementItemImage type={type}>
                <FiDollarSign size={24}/>
            </StatementItemImage>
            <StatementItemInfo>
                <p className="primary-color">
                    {value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </p>
                <p className="">{type === 'pay' ? `Pago a `: `Recebido de`} <strong>{user.firstName} {user.lastName}</strong></p>
                <p className="">{format (new Date(updatedAt), "dd/MM/yyyy 'às' HH:mm'h'")}</p>
            </StatementItemInfo>
        </StatementItemContainer>
    )
}

const Statement = () => {

    const [transactionsData, setTransactionsData] = useState<StatementItem[]>([]);

    const getAllTransactions = async () => {
        const {data }= await transactions();

        setTransactionsData(data.transactions);
    }

    useEffect(()=>{
        getAllTransactions();
    },[])
    
    return (
        <StatementContainer>
            {transactionsData && transactionsData.map(statement => <StatementItem {...statement}/>)}
        </StatementContainer>
    )
}

export default Statement;