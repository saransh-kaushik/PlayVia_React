import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useLocation} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


const ModalOverlay = styled.div`
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;`

const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #141414; /* Netflix dark background */
`;

const Input = styled.input`
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #333; /* Dark input background */
    color: white;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease-in-out;

    &:focus {
        border: 1px solid #e50914; /* Netflix red border on focus */
    }
`;

const Button = styled.button`
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #e50914; /* Netflix red button */
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #f40612; /* Slightly lighter red on hover */
    }
`;

const Title = styled.h1`
    color: white;
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: bold;
`;

const Subtitle = styled.p`
    color: #b3b3b3; /* Netflix gray text */
    font-size: 1rem;
    margin-bottom: 30px;
`;

const PaymentGateway = () => {
    const location = useLocation();
    const price = location.state.price;

    const [formdata, setFormData] = useState({
        amount:price || '',
        cardNumber:'',
        cardHolderName:'',
        CVV:'',
        expiryDate:'',
        billingAddress:'',
        billingCity:''
    });

    return (
        <>
        <Navbar />
       
        <PaymentContainer>
        <Title>Payment Gateway</Title>
        <Subtitle>Enter your payment details below</Subtitle>
        <Input type="text" placeholder='amount' value={formdata.amount} readOnly />
        <Input type="text" placeholder="Card Number" value={formdata.cardNumber} onChange={(e) => setFormData({...formdata, cardNumber: e.target.value})} />
        <Input type="text" placeholder="Card Holder Name" value={formdata.cardHolderName} onChange={(e) => setFormData({...formdata, cardHolderName: e.target.value})} />
        <Input type="number" placeholder="CVV" value={formdata.CVV} onChange={(e) => setFormData({...formdata, CVV: e.target.value})} />
        <Input type="date" placeholder="Expiry Date" value={formdata.expiryDate} onChange={(e) => setFormData({...formdata, expiryDate: e.target.value})} />
        <Input type="text" placeholder="Billng Address" value={formdata.billingAddress} onChange={(e) => setFormData({...formdata, billingAddress: e.target.value})}/>
        <Button>Pay Now</Button>
        </PaymentContainer>
        
       
        </>
    )
}

export default PaymentGateway;