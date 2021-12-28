import {DashboardBackground, BodyContainer, InlineContainer, InlineTitle} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import userAuth from '../../hooks/userAuth';
import {pay, request} from '../../services/resources/pix'

import Statement from './Statement';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [key, setKey] = useState('');
    const [generatorKey, setGeneatorKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleNewPayament = async() => {
       const {data} = await request(Number(value))  
       
       if(data.copyPasteKey){
           setGeneatorKey(data.copyPasteKey)  
       }
    }

    const handleReceiverPix = async() => {
        try{
            const{data} = await pay(key)

            if(data.msg){
                alert(data.msg)
                return
            }

            alert('Não foi possível realizar o pagamento')

        }catch(e){
            console.log(e)
            alert('Não é possível receber Pix do mesmo usuario')

        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {user, getCurrentUser} = userAuth();

    const wallet = user?.wallet || 0;


    useEffect(()=>{
        getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                   <Card noShadow width="90%">
                       <InlineTitle>
                        <h2 className="h2">Saldo Atual</h2>
                       </InlineTitle>
                       <InlineContainer>
                            <h3 className="wallet">
                                {wallet.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                            </h3>
                        </InlineContainer>
                   </Card>
                   <Card noShadow width="90%">
                       <InlineTitle>
                        <h2 className="h2">Receber PIX</h2>
                       </InlineTitle>
                        <InlineContainer>
                            <Input style={{flex:1}} value={newValue} onChange={e => setNewValue( e.target.value)}/>
                            <Button onClick={handleNewPayament}>Gerar código</Button>
                        </InlineContainer>
                        
                        {generatorKey && (
                            <><p className="primary-color">Pix copia e cola:</p><p className="primary-color">{generatorKey}</p></>
                        )}
                   </Card>
                   <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                        <Input style={{flex:1}} value={key} onChange={e=> setKey(e.target.value)}/>
                        <Button onClick={handleReceiverPix}>Pagar PIX</Button>
                        </InlineContainer>
                   </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                      <InlineTitle>
                      <h2 className="h2">Extrato da conta</h2>
                      </InlineTitle>
                      <Statement />
                   </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    )
}

export default Dashboard

function value(value: any): number {
    throw new Error('Function not implemented.');
}
