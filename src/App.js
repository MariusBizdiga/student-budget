import React from 'react';
import styled from 'styled-components';

import Home from './component/home';

const Container = styled.div`
	display: flex;
  background-color:rgba(0,0,0,0.05);
	flex-direction: column;
	align-items: center;
	// margin: 30px 0 10px;
	font-family: open sans;

`;
const Header = styled.div`
	font-size: 25px;
  font-weight: bold;
  color: white;
  border:1px solid none;
  // border-radius:50px;
  // background: ;
  padding: 10px 70px;

`;

const App = () =>{
  return (
    <Container style={{letterSpacing:"2px"}} className=" container mt-5 mx-auto w-75 border p-0 m-0">
      <Header className="navbar navbar-fixed-top  w-75 border-b-1 text-dark text-center d-flex justify-content-center my-3 ">BUDGET TRACKER</Header>
      <Home style={{ backgroundcolor:"silver"}}/>
    </Container>
  );
}

export default App;
