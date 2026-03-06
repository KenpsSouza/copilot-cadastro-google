import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #0f1117;
  position: relative;
  overflow: hidden;

  /* Ambient Orbs */
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
    animation: ${pulseGlow} 8s ease-in-out infinite;
  }

  &::before {
    top: -10%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(229, 24, 45, 0.15), transparent 70%);
  }

  &::after {
    bottom: -10%;
    right: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%);
    animation-delay: -4s;
  }
`;

export const GlassCard = styled.div`
  background: rgba(26, 29, 39, 0.4);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  z-index: 10;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 2.5rem;
    width: 90%;
    max-width: 400px;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LogoWrapper = styled.div`
  width: auto;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.03em;
  
  span {
    background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #9ca3af;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RoleButton = styled.button<{ $role: 'estilo' | 'compras' }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  span {
    font-size: 1.2rem;
    font-weight: 700;
    color: #e4e7eb;
    letter-spacing: 0.02em;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${({ $role }) => 
      $role === 'estilo' 
        ? 'linear-gradient(135deg, rgba(229, 24, 45, 0.1), rgba(255, 51, 51, 0.1))'
        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ $role }) => $role === 'estilo' ? 'rgba(229, 24, 45, 0.5)' : 'rgba(59, 130, 246, 0.5)'};
    box-shadow: 0 15px 30px -10px ${({ $role }) => $role === 'estilo' ? 'rgba(229, 24, 45, 0.3)' : 'rgba(59, 130, 246, 0.3)'};

    &::before {
      opacity: 1;
    }

    .icon-wrapper {
      background: ${({ $role }) => $role === 'estilo' ? 'rgb(229, 24, 45)' : '#3b82f6'};
      color: white;
      transform: scale(1.1);
      box-shadow: 0 0 20px ${({ $role }) => $role === 'estilo' ? 'rgba(229, 24, 45, 0.5)' : 'rgba(59, 130, 246, 0.5)'};
    }
  }
`;
