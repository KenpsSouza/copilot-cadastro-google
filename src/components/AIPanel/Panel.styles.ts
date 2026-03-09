
import styled, { keyframes } from 'styled-components';
import { ds } from '../../styles/designSystem';

export const typing = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-4px); opacity: 1; }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.xs};
  span {
    width: 6px;
    height: 6px;
    background-color: #e5182d;
    border-radius: 50%;
    animation: ${typing} 1.4s infinite ease-in-out both;
  }
  span:nth-child(1) { animation-delay: -0.32s; }
  span:nth-child(2) { animation-delay: -0.16s; }
`;

export const AITextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${ds.radius.md};
  padding: ${ds.spacing.md};
  color: #e4e7eb;
  resize: vertical;
  outline: none;
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;
  font-family: ${ds.font.family};

  &:focus {
    border-color: #e5182d;
    box-shadow: 0 0 0 2px rgba(229, 24, 45, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${ds.spacing.md};
  border-top: 1.5px solid rgba(255,255,255,0.13);
  padding-top: ${ds.spacing.lg};
  margin-top: ${ds.spacing.xl};
  justify-content: flex-end;
  flex-wrap: wrap;
  background: rgba(255,255,255,0.01);
  backdrop-filter: blur(2.5px) saturate(1.05);
  -webkit-backdrop-filter: blur(2.5px) saturate(1.05);
  transition: background 0.18s, border 0.18s;

  & > * {
    transition: box-shadow 0.18s, transform 0.18s;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${ds.spacing.sm};
    align-items: stretch;
    padding-top: 1rem;
    margin-top: 1.3rem;
    border-top-width: 1px;
  }
`;

// Refinamento do AIParseButton para visual premium
export const AIParseButton = styled.button`
  background: linear-gradient(135deg, #e5182d, #ff3333);
  color: #fff;
  border: 1.5px solid rgba(229, 24, 45, 0.18);
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.md} ${ds.spacing.xl};
  font-weight: ${ds.font.weight.bold};
  font-size: ${ds.font.size.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${ds.spacing.sm};
  cursor: pointer;
  box-shadow: ${ds.shadow.md};
  backdrop-filter: blur(6px) saturate(1.1);
  -webkit-backdrop-filter: blur(6px) saturate(1.1);
  transition: box-shadow 0.22s, border 0.22s, background 0.22s, color 0.18s, transform 0.18s;
  user-select: none;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.2);
  }

  &:not(:disabled):hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: ${ds.shadow.lg};
    filter: brightness(1.08);
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
    filter: brightness(0.97);
  }

  .siri-shine {
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
    transform: skewX(-20deg);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { left: -100%; }
    20% { left: 200%; }
    100% { left: 200%; }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
  width: 100%;
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const PanelCard = styled.div<{ $delay?: number }>`
  background: rgba(30, 33, 43, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  animation: ${slideIn} 0.4s ease forwards;
  animation-delay: ${({ $delay }) => $delay || 0}s;
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.sm};
  box-shadow: ${ds.shadow.md};
  
  &.holographic {
    background: linear-gradient(135deg, rgba(30,33,43,0.8), rgba(40,30,50,0.8));
    border: 1px solid rgba(229, 24, 45, 0.2);
  }
`;

export const PanelTitle = styled.h4`
  font-size: ${ds.font.size.sm};
  font-weight: ${ds.font.weight.bold};
  color: #e4e7eb;
  margin: 0;
  letter-spacing: 0.02em;
`;

export const ScoreNumber = styled.div`
  font-size: ${ds.font.size.xl};
  font-weight: ${ds.font.weight.black};
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: ${ds.spacing.xs};
`;

export const ScoreBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${ds.radius.sm};
  overflow: hidden;
`;

export const ScoreFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: linear-gradient(90deg, rgb(229, 24, 45), rgb(255, 51, 51));
  border-radius: ${ds.radius.sm};
  transition: width 0.5s ease;
`;

export const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${ds.font.size.xs};
  color: #9ca3af;
`;

export const AlertItem = styled.div<{ tipo: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: ${ds.font.size.sm};
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem;
  border-radius: ${ds.radius.sm};
  border-left: 3px solid ${({ tipo }) => {
    switch (tipo) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#22c55e';
      default: return '#3b82f6';
    }
  }};
  
  svg {
    color: ${({ tipo }) => {
      switch (tipo) {
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        case 'success': return '#22c55e';
        default: return '#3b82f6';
      }
    }};
  }
`;

export const AlertSugestao = styled.div`
  margin-top: 4px;
  color: rgb(255, 102, 102);
  font-style: italic;
  font-size: ${ds.font.size.xs};
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: ${ds.font.size.sm};
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem;
  border-radius: ${ds.radius.sm};
  line-height: 1.4;
`;

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.xs};
  padding: 0.2rem 0;
`;

export const AIDescriptionCard = styled(PanelCard)``;
export const MiniCard = styled.div``;
export const MiniCardTitle = styled.div``;
