import React from 'react';
import { UserRole } from '../../types';
import { LoginContainer, GlassCard, HeaderSection, LogoWrapper, Title, Subtitle, ButtonsContainer, RoleButton } from './styles';
import { Edit3, ShoppingBag } from 'react-feather';
import { BrandCarousel } from '../BrandCarousel';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <LoginContainer>
      {/* Vídeo de fundo animado */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          background: '#0f1117', // fallback para evitar faixa preta
        }}
      >
        <source src="/assets/vd-bglogin.mp4" type="video/mp4" />
        {/* Se quiser, adicione um .webm para fallback */}
      </video>
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
