import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTimes } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #757575;
  padding: 70px 45px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FAQSection = styled.div`
  margin-bottom: 50px;
`;

const FAQTitle = styled.h2`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 30px;
`;

const FAQList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const FAQItem = styled.li`
  margin-bottom: 8px;
`;

const FAQQuestion = styled.button`
  width: 100%;
  background-color: #303030;
  color: white;
  padding: 20px 30px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.625rem;
  text-align: left;

  &:hover {
    background-color: #404040;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const FAQAnswer = styled.div`
  background-color: #303030;
  color: white;
  padding: ${props => props.isOpen ? '20px 30px' : '0 30px'};
  max-height: ${props => props.isOpen ? '1200px' : '0'};
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  font-size: 1.625rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FooterLink = styled.a`
  color: #757575;
  text-decoration: none;
  font-size: 13px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  font-size: 13px;
  margin-top: 20px;
`;

const faqData = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks."
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  }
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FAQSection>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          <FAQList>
            {faqData.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  {openIndex === index ? <FaTimes /> : <FaPlus />}
                </FAQQuestion>
                <FAQAnswer isOpen={openIndex === index}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </FAQSection>

        <FooterLinks>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Account</FooterLink>
          <FooterLink href="#">Media Center</FooterLink>
          <FooterLink href="#">Investor Relations</FooterLink>
          <FooterLink href="#">Jobs</FooterLink>
          <FooterLink href="#">Ways to Watch</FooterLink>
          <FooterLink href="#">Terms of Use</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Cookie Preferences</FooterLink>
          <FooterLink href="#">Corporate Information</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Speed Test</FooterLink>
          <FooterLink href="#">Legal Notices</FooterLink>
          <FooterLink href="#">Only on Netflix</FooterLink>
        </FooterLinks>

        <FooterText>© 2024 Netflix Clone</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
