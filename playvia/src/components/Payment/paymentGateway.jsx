import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useLocation} from 'react-router-dom';

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
        <input type="text" placeholder='amount' value={formdata.amount} readOnly />
        <input type="text" placeholder="Card Number" value={formdata.cardNumber} onChange={(e) => setFormData({...formdata, cardNumber: e.target.value})} />
        <input type="text" placeholder="Card Holder Name" value={formdata.cardHolderName} onChange={(e) => setFormData({...formdata, cardHolderName: e.target.value})} />
        <input type="number" placeholder="CVV" value={formdata.CVV} onChange={(e) => setFormData({...formdata, CVV: e.target.value})} />
        <input type="date" placeholder="Expiry Date" value={formdata.expiryDate} onChange={(e) => setFormData({...formdata, expiryDate: e.target.value})} />
        <input type="text" placeholder="Billng Address" value={formdata.billingAddress} onChange={(e) => setFormData({...formdata, billingAddress: e.target.value})}/>
        </>
    )
}

export default PaymentGateway;