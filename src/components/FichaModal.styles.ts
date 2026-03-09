import styled, { keyframes } from 'styled-components';
import { ds } from '../styles/designSystem';

const iridescentBorder = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(26, 29, 39, 0.82);
  border-radius: 28px;
  padding: 3.2rem 2.5rem;
  max-width: 1100px;
  width: 96vw;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.55), 0 0 100px rgba(229, 24, 45, 0.13);
  animation: slideUp 0.3s ease;
  pointer-events: auto;
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  transition: box-shadow 0.25s, border 0.25s, background 0.25s;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  border: none;
  position: fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(135deg, rgba(229, 24, 45, 0.5), rgba(255, 51, 51, 0.5), rgba(179, 0, 21, 0.5), rgba(255, 102, 102, 0.5), rgba(255, 51, 51, 0.5), rgba(229, 24, 45, 0.5));
    background-size: 300% 300%;
    animation: ${iridescentBorder} 8s ease infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.7;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;
