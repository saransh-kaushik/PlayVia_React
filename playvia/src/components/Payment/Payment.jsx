import React from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100vh;
    background-color: #111;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const Subtitle = styled.p`
    color: #aaa;
    font-size: 1.2rem;
    margin-bottom: 40px;
`;

const PlanCard = styled.div`
    background-color: #222;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s, box-shadow 0.3s;
`;

const PlanName = styled.h2`
    color: #fff;
    font-size: 1.8rem;
    margin-bottom: 10px;
`;

const PlanPrice = styled.p`
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

const PlanFeatures = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    color: #aaa;
    font-size: 1rem;
    margin-bottom: 20px;
`;

const SubscribeButton = styled.button`
    background-color: #e50914;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color:rgb(220, 118, 123);
    }
`;

const PlansContainer = styled.div`
    display: flex;
    flex-wrap: nowrap; /* Prevent wrapping to the next line */
    justify-content: center;
    gap: 20px; /* Adds spacing between the cards */
    margin-top: 20px;
    overflow-x: auto; /* Enable horizontal scrolling if needed */
    padding: 10px; /* Add padding for better scrolling experience */
`;

const Payment = () => {
    const navigate = useNavigate();
    
    
    const plans = [
        { name: "Basic", price: "$8.99", features: ["720p resolution", "1 screen"] },
        { name: "Standard", price: "$13.99", features: ["1080p resolution", "2 screens"] },
        { name: "Premium", price: "$17.99", features: ["4K resolution", "4 screens"] },
    ];

    return (
        
        <PaymentContainer>
            <Navbar />
            <Title>Choose Your Plan</Title>
            <Subtitle>Watch anywhere. Cancel anytime.</Subtitle>
            <PlansContainer>
                {plans.map((plan, index) => (
                    <PlanCard key={index}>
                        <PlanName>{plan.name}</PlanName>
                        <PlanPrice>{plan.price}/month</PlanPrice>
                        <PlanFeatures>
                            {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </PlanFeatures>
                        <SubscribeButton onClick={() => navigate('/payment-gateway', { state: { price: plan.price } })} >Subscribe Now</SubscribeButton>
                    </PlanCard>
                ))}
            </PlansContainer>
        </PaymentContainer>
    );
};

export default Payment;