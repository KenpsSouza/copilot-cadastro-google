import React from 'react';
import { UserRole } from '../../types';
import { LoginContainer, GlassCard, HeaderSection, LogoWrapper, Title, Subtitle, ButtonsContainer, RoleButton } from './styles';
import { Edit3, ShoppingBag } from 'react-feather';
import { ThemeToggle } from '../ThemeToggle';
import { BrandCarousel } from '../BrandCarousel';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <LoginContainer>
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
        <ThemeToggle />
      </div>
      <GlassCard>
        <HeaderSection>
          <LogoWrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <BrandCarousel variant="login" color="#e4e7eb" interval={1500} />
          </LogoWrapper>
          <Title style={{ marginTop: '12px' }}>
            <span>Copilot</span>
          </Title>
          <Subtitle>
            Cadastro Inteligente de Produtos
          </Subtitle>
        </HeaderSection>

        <ButtonsContainer>
          <RoleButton $role="estilo" onClick={() => onLogin('estilo')}>
            <div className="icon-wrapper">
              <Edit3 size={28} color="#f472b6" />
            </div>
            <span>Acessar como Estilo</span>
          </RoleButton>

          <RoleButton $role="compras" onClick={() => onLogin('compras')}>
            <div className="icon-wrapper">
              <ShoppingBag size={28} color="#60a5fa" />
            </div>
            <span>Acessar como Compras</span>
          </RoleButton>
        </ButtonsContainer>
      </GlassCard>
    </LoginContainer>
  );
};

export default LoginPage;
