'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Leaf, MapPin, HelpCircle, Phone, FileText, 
  Shield, Clock, Mail, Facebook, Instagram, Twitter 
} from 'lucide-react';

const FooterWrapper = styled.footer`
  background: ${props => props.theme.cardBackground};
  padding: 3rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.textPrimary};
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${props => props.theme.textSecondary};
        text-decoration: none;
        
        &:hover {
          color: ${props => props.theme.textPrimary};
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.textSecondary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.logoColor}; // Cor da logo
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>
            <Users />
            Sobre Nós
          </h3>
          <ul>
            <li><a href="#"><Heart />Nossa História</a></li>
            <li><a href="#"><Users />Trabalhe Conosco</a></li>
            <li><a href="#"><Leaf />Sustentabilidade</a></li>
            <li><a href="#"><MapPin />Lojas Físicas</a></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>
            <HelpCircle />
            Atendimento
          </h3>
          <ul>
            <li><a href="#"><Phone />Central de Ajuda</a></li>
            <li><a href="#"><FileText />Política de Trocas</a></li>
            <li><a href="#"><Shield />Política de Privacidade</a></li>
            <li><a href="#"><Clock />Horário de Atendimento</a></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>
            <Mail />
            Contato
          </h3>
          <ul>
            <li><a href="#"><Mail />contato@myside.com</a></li>
            <li><a href="#"><Phone />(11) 99999-9999</a></li>
            <li><a href="#"><MapPin />São Paulo, SP</a></li>
            <li><a href="#"><Clock />Seg - Sex, 9h - 18h</a></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© 2024 MySide. Todos os direitos reservados.</p>
        <SocialLinks>
          <SocialIcon 
            href="#" 
            aria-label="Facebook"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Facebook size={20} />
          </SocialIcon>
          <SocialIcon 
            href="#" 
            aria-label="Instagram"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={20} />
          </SocialIcon>
          <SocialIcon 
            href="#" 
            aria-label="Twitter"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter size={20} />
          </SocialIcon>
        </SocialLinks>
      </FooterBottom>
    </FooterWrapper>
  );
};
