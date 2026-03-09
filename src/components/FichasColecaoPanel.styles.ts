import styled, { keyframes } from 'styled-components';
import { ds } from '../styles/designSystem';

const iridescentBorder = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const PanelContainer = styled.div`
  background: rgba(26, 29, 39, 0.75);
  border-radius: ${ds.radius.xl};
  padding: 2.2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${ds.shadow.lg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow 0.25s, border 0.25s, background 0.25s;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    padding: 1px;
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

export const FichaCard = styled.div`
  border-radius: 16px;
  padding: 32px 32px;
  background: rgba(30,33,43,0.6);
  cursor: pointer;
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;
  min-height: 120px;
  min-width: 0;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    padding: 1px;
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
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;
