import React, { useState } from 'react';
import styled from 'styled-components';
import {income,expense}from '../../Hook/useUsersData'
import {addTransaction} from '../../Hook/useDatabases';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
	width: 100%;
	font-family: open sans;
`;

const BalanceBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	color: black;
	width: 100%;
	font-size:22px;

`;
const AddExpense = styled.div`
	// background: green;
	// color: white;
	// text-align: center;
	// padding: 8px 15px;
	// border-radius: 5px;
	// cursor: pointer;
	// font-weight: bold;
	// font-size: 14px;
	transition: 0.5s;
`;
const AddTransContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid gray;
	gap: 15px;
	padding: 15px 20px;
	margin: 20px;
	padding: 10px 20px;
	width: 100%;
	input {
		border-radius: 4px;
		// border: 1px solid black;
		padding: 10px 15px;
		outline: none;
	}
`;
const RadioBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	input {
		margin: 0px 10px;
		color:green;
	}
`;
const ExpenseContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	
`;
const ExpenseBox = styled.div`
	display: flex;
	flex-direction: column;
    font-size:16px;
    align-items:center;
//     border: 1px solid grey;
//     border-radius: 4px;
    padding:10px 20px;
    gap:5px;
    margin:10px 25px ;
//     width:135px;
    span{
//         color:red;
        font-size:20px;
        font-weight:bold;
    }
	
`;
const IncomeBox = styled.div`
	display: flex;
	flex-direction: column;
    text-align:center;
	border: 1px solid gray;
	border-radius: 4px;
	padding: 10px 20px;
	gap: 5px;
	margin: 10px 25px;
	width: 135px;
	font-size: 16px;

	span {
		// color: green;
		font-size: 20px;
		font-weight: bold;
	}
`;

const AddTransView = (props) => {
	const [amount, setAmount] = useState();
	const [description, setDescription] = useState();
	const [type, setType] = useState('EXPENSE');

 const addTransactions = async () => {
	 props.toggleAddTsn();
	await addTransaction({ description, type, amount})
	};

	return (
		<AddTransContainer  className="border ">
			<AddExpense className="py-1 btn btn-outline-primary " onClick={()=>addTransactions()}>Add Transaction</AddExpense>
			<form>
			<input
			className='form-control outline-none my-2'
			style={{outline:"none"}}
				placeholder="Amount"
                value={amount}
                type="number"
				onChange={(e) => setAmount(e.target.value)}
			/>
			<input
			className='form-control outline-none my-3' 
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<RadioBox className='my-2'>
				<input
				
					type="radio"
					id="exp"
					name="type"
					value="EXPENSE"
					checked={type === 'EXPENSE'}
					onChange={(e) => setType(e.target.value)}
				/>
				<label htmlFor="exp">Expense</label>
				<input
					type="radio"
					id="income"
					name="type"
					value="INCOME"
					checked={type === 'INCOME'}
					onChange={(e) => setType(e.target.value)}
				/>
				<label htmlFor="income">Income</label>
			</RadioBox>
		    </form>
		</AddTransContainer>
	);
};

const Expense = (props) => {
	const [isAddTsnVisible, toggleAddTsn] = useState(false);
	return (
		<Container >
			<BalanceBox>
				Balance: £{props.income - props.expense}
				<AddExpense  className="btn btn-primary btn-md" onClick={() => toggleAddTsn(!isAddTsnVisible)}>
					{isAddTsnVisible ? 'CANCEL' : 'ADD'}
				</AddExpense>
			</BalanceBox>
			{isAddTsnVisible && (
				<AddTransView
					toggleAddTsn={toggleAddTsn}
					addTransactionValue={props.addTransactionValue}
				/>
			)}
			<ExpenseContainer >
				<ExpenseBox  style={{width:"100px "}} className='border w-100 ' isIncome={false}>
					<div className='fs-5 text-secondary fw-bold'>Expense</div>
					<span className='text-danger'> £{props.expense}</span>
				</ExpenseBox>
				<IncomeBox   style={{width:"100px "}} className='border w-100 ' isIncome={true}>
					<div className='fs-4 text-secondary fw-bold'>Income </div>
					<span className='text-success'>£{props.income}</span>
				</IncomeBox>
			</ExpenseContainer>
		</Container>
	);
};

export default Expense;
