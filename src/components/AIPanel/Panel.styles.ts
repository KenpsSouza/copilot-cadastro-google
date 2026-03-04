import styled, { keyframes } from 'styled-components';

export const typing = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-4px); opacity: 1; }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    width: 6px;
    height: 6px;
    background-color: rgb(229, 24, 45);
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
  border-radius: 12px;
  padding: 1rem;
  color: #e4e7eb;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    border-color: rgb(229, 24, 45);
    box-shadow: 0 0 0 2px rgba(229, 24, 45, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

export const AIParseButton = styled.button`
  background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(229, 24, 45, 0.3);
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
  gap: 1rem;
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
  border-radius: 16px;
  padding: 1.2rem;
  animation: ${slideIn} 0.4s ease forwards;
  animation-delay: ${({ $delay }) => $delay || 0}s;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
  &.holographic {
    background: linear-gradient(135deg, rgba(30,33,43,0.8), rgba(40,30,50,0.8));
    border: 1px solid rgba(229, 24, 45, 0.2);
  }
`;

export const PanelTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #e4e7eb;
  margin: 0;
  letter-spacing: 0.02em;
`;

export const ScoreNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const ScoreBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const ScoreFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: linear-gradient(90deg, rgb(229, 24, 45), rgb(255, 51, 51));
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const AlertItem = styled.div<{ tipo: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem;
  border-radius: 8px;
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
  font-size: 0.8rem;
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 0.85rem;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem;
  border-radius: 8px;
  line-height: 1.4;
`;

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.2rem 0;
`;

export const AIDescriptionCard = styled(PanelCard)``;
export const MiniCard = styled.div``;
export const MiniCardTitle = styled.div``;
