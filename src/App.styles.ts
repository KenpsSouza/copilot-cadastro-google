import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-30px) scale(0.95); }
`;

const siriGlowOverlay = keyframes`
  0%, 100% {
    box-shadow:
      0 0 30px rgba(229, 24, 45, 0.3),
      0 0 60px rgba(255, 51, 51, 0.15),
      0 0 120px rgba(179, 0, 21, 0.1);
  }
  50% {
    box-shadow:
      0 0 40px rgba(255, 51, 51, 0.4),
      0 0 80px rgba(229, 24, 45, 0.2),
      0 0 160px rgba(179, 0, 21, 0.15);
  }
`;

const iridescentOverlay = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const siriOrbOverlay = keyframes`
  0%   { transform: translate(0, 0) scale(1); filter: blur(50px); }
  25%  { transform: translate(40px, -30px) scale(1.3); filter: blur(55px); }
  50%  { transform: translate(-30px, 20px) scale(0.85); filter: blur(45px); }
  75%  { transform: translate(20px, 35px) scale(1.15); filter: blur(60px); }
  100% { transform: translate(0, 0) scale(1); filter: blur(50px); }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #0f1117;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  padding: 0.8rem 1rem;
  gap: 0.8rem;
  overflow-y: auto;
  align-items: flex-start;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FormArea = styled.div<{ $blurred?: boolean }>`
  flex: 2;
  min-width: 0;
  transition: filter 0.6s ease, opacity 0.6s ease;

  ${({ $blurred }) => $blurred && css`
    filter: blur(3px) brightness(0.55);
    opacity: 0.7;
    pointer-events: none;
    user-select: none;
  `}
`;

export const PanelArea = styled.div<{ $blurred?: boolean }>`
  flex: 1;
  min-width: 340px;
  max-width: 440px;
  position: sticky;
  top: 0;
  transition: filter 0.6s ease, opacity 0.6s ease;

  ${({ $blurred }) => $blurred && css`
    filter: blur(3px) brightness(0.55);
    opacity: 0.7;
    pointer-events: none;
    user-select: none;
  `}

  @media (max-width: 900px) {
    max-width: 100%;
    position: static;
  }
`;

export const Footer = styled.footer`
  padding: 0 1rem 0.5rem 1rem;
`;

/* ========================
   OVERLAY CARD "Descreva o Produto"
   ======================== */

export const DescriptionOverlay = styled.div<{ $exiting?: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 3rem;
  z-index: 100;
  animation: ${({ $exiting }) => $exiting ? fadeOut : fadeIn} ${({ $exiting }) => $exiting ? '0.5s' : '0.6s'} ease forwards;

  @media (max-width: 900px) {
    padding-top: 1.5rem;
    align-items: center;
  }
`;

export const DescriptionCard = styled.div`
  background: #1a1d27;
  border: 2px solid transparent;
  background-image:
    linear-gradient(#1a1d27, #1a1d27),
    linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(255, 102, 102), rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(229, 24, 45));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 100% 100%, 400% 400%;
  border-radius: 24px;
  padding: 2.5rem 3rem;
  width: 100%;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  animation:
    ${siriGlowOverlay} 4s ease-in-out infinite,
    ${iridescentOverlay} 3s ease infinite;

  /* Glow iridescente borrado */
  &::before {
    content: '';
    position: absolute;
    top: -3px; left: -3px; right: -3px; bottom: -3px;
    border-radius: 26px;
    background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(255, 102, 102), rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(229, 24, 45));
    background-size: 400% 400%;
    animation: ${iridescentOverlay} 3s ease infinite;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }

  /* Siri orb */
  &::after {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229, 24, 45, 0.45), transparent 70%);
    animation: ${siriOrbOverlay} 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:focus-within {
    &::before {
      opacity: 0.75;
      filter: blur(24px);
    }
  }

  @media (max-width: 900px) {
    max-width: 95%;
    padding: 1.5rem;
  }

  /* Itens de conteúdo ocupam largura total */
  & > div, & > textarea, & > p, & > button {
    width: 100%;
  }
`;

export const DescriptionCardTitle = styled.h2`
  color: #e4e7eb;
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.01em;
`;

export const DescriptionCardSubtitle = styled.p`
  color: #9ca3af;
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.01em;
`;

export const DescriptionCardSkip = styled.button`
  align-self: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #4b5563;
  color: #9ca3af;
  font-size: 0.85rem;
  padding: 0.6rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.03em;
  font-weight: 500;
  width: auto !important;

  &:hover {
    color: #e4e7eb;
    border-color: #818cf8;
    background: rgba(129, 140, 248, 0.08);
    transform: translateY(-1px);
  }
`;

export const DescriptionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  margin-top: 0.3rem;
`;
