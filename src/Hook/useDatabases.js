import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { database } from "../Firebase/Config"
// import useGetUser from "./useGetUser"
export const addTransaction = async ({ description, type, amount }) => {
    const userId = localStorage.getItem("userId");
     try {
        const transactionRef = collection(database, "transactions");
        await addDoc(transactionRef, {
            transactionDescription: description,
            transactionAmount: amount,
            transactionType: type,
             userId,   // use this only when a user is needed ; 
        })
        console.log("Succes");

    } catch (error) {
        console.log("Error");
    }



}