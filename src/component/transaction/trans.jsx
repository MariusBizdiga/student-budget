import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {  doc , deleteDoc } from 'firebase/firestore';
import { database } from "../../Firebase/Config";


const Container = styled.div`
	display: flex;
	flex-direction: column;
	
	margin: 15px 0px 10px;
	padding: 5px 12px;
	font-family: open sans;
	font-size: 18px;
	gap: 10px;
	width: 100%;
	input {
		border-radius: 10px;
		padding: 10px 15px;
		background: whitesmoke;
		// border: 1px solid gray;
		outline: none;
		width: 100%;
	}
	h2{
		text-align: center;
	}
`;
const Cell = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	padding: 10px 15px;
	font-size: 16px;
	border-radius: 5px;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
	border: 1px solid gray;
	border-right: 4px solid ${(props) => (props.isExpense ? 'red' : 'green')};
`;

const TransactionCell = (props) => {

	console.log(props)
	const {onclickTrx} = props
	return (
		<Cell onClick={onclickTrx} isExpense={props.payload?.transactionType
			=== 'EXPENSE'}>
			<div  className="btn btn-sm btn-outline-danger">X</div>
			<span>{props.payload.transactionDescription}</span>
			<span>£{props.payload.transactionAmount}</span>
		</Cell>
	);
};

const Transaction = (props) => {


	console.log("new transaction ")
	console.log(props)
	const [searchText, updateSearchText] = useState();
	const [filteredTrans, updateTrans] = useState(props.transactions);

	const filteredData = (searchText) => {
           console.log('search ')
		console.log(searchText)
		if (!searchText || !searchText.trim().length) {
			updateTrans(props.transactions);
			return;
		}
		let trans = [...props.transactions];
		trans = trans.filter((payload) =>
			payload.transactionDescription.toLowerCase()
				.includes(searchText.toLowerCase().trim())
		);
		updateTrans(trans);
	};
	useEffect(() => filteredData(searchText), [props.transactions]);

	const deleteTrx = async (payload)=>{
		console.log(payload.id)
          await deleteDoc(doc(database ,"transactions", payload.id));
	}



	return (
		<Container>
			<h2 className="fw-bold fs-5">Transaction List</h2>
			<input placeholder="search..."
		            className="form-control border"
				value={searchText}
				onChange={(e) => {
					updateSearchText(e.target.value)
					filteredData(e.target.value);
				}}
			/>
  


        {/* comment this to enable firebase  */}

			{filteredTrans?.length
		       ? filteredTrans.map((payload , id) => (
		            <TransactionCell key={payload.id} payload={payload} onclickTrx={()=>deleteTrx(payload)} />
	        ))
			: ''}





	
		</Container>
	);
};

export default Transaction;
