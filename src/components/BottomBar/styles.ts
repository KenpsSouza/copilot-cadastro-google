import styled, { keyframes } from 'styled-components';

export const BottomBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1.2rem;
  background: rgba(26, 29, 39, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 0;
  position: relative;
  overflow: hidden;

  /* Subtle glow at the top edge */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 24, 45, 0.5), transparent);
    opacity: 0.6;
  }
`;

export const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ScoreDisplay = styled.div<{ $score: number }>`
  display: flex;
  align-items: center;
  gap: 6px;
  
  .score-value {
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: ${({ $score }) => {
      if ($score >= 80) return '#34d399'; // Green
      if ($score >= 50) return '#fbbf24'; // Yellow
      return '#f87171'; // Red
    }};
    text-shadow: 0 0 10px ${({ $score }) => {
      if ($score >= 80) return 'rgba(52, 211, 153, 0.3)';
      if ($score >= 50) return 'rgba(251, 191, 36, 0.3)';
      return 'rgba(248, 113, 113, 0.3)';
    }};
  }

  .score-label {
    display: flex;
    flex-direction: column;
    font-size: 0.6rem;
    color: #9ca3af;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1.1;
  }
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 150px;
  flex: 1;
  max-width: 300px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.65rem;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const ProgressBarFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: linear-gradient(90deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21));
  background-size: 200% 100%;
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${shimmer} 3s linear infinite;
`;

export const AIStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgb(255, 102, 102);
  font-weight: 600;
  background: rgba(229, 24, 45, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  border: 1px solid rgba(229, 24, 45, 0.2);

  .pulse {
    width: 6px;
    height: 6px;
    background-color: rgb(255, 51, 51);
    border-radius: 50%;
    box-shadow: 0 0 6px rgb(255, 51, 51);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(229, 24, 45, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(229, 24, 45, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(229, 24, 45, 0); }
  }
`;
