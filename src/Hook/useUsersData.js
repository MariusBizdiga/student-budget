import React, { useEffect, useState } from 'react';
import { database } from '../Firebase/Config';
import {getUserId} from './createUser';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const useUsersData = () => {
    const [transaction,setTransaction] = useState([]);
    const [income,setIncome] = useState(null);
    const [expense,setExpense] = useState(null)
    const userId = getUserId();
    const getTransaciton = async()=>
    {
        const transactionRef = collection(database,"transactions");
        const q = query(transactionRef,where("userId","==",userId));
        onSnapshot(q,(snapshot)=>
        {
            let tincome = 0;
            let texpense = 0;
         setTransaction(snapshot.docs.map((item)=>{
            if(item.data().transactionType=='INCOME')
            {
                tincome+=Number(item.data().transactionAmount)
            }
            else
            {
                texpense+=Number(item.data().transactionAmount);
            }
            return {...item.data(),id:item.id}
         }))
         setIncome(tincome);
         setExpense(texpense);
        })

    }
    useEffect(()=>{
        getTransaciton();
    },[])

    console.log(transaction)
    return {transaction,income,expense};
}

export default useUsersData