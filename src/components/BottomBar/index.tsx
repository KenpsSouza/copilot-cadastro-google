import React from 'react';
import { UserRole } from '../../types';
import { BottomBarContainer, StatusSection, ScoreDisplay, ProgressSection, ProgressHeader, ProgressBarTrack, ProgressBarFill, AIStatus } from './styles';
import { Activity, CheckCircle, AlertTriangle } from 'react-feather';

interface BottomBarProps {
  score: number;
  camposPreenchidos: number;
  totalCampos: number;
  userRole: UserRole;
}

const BottomBar: React.FC<BottomBarProps> = ({ score, camposPreenchidos, totalCampos, userRole }) => {
  const percentage = totalCampos > 0 ? (camposPreenchidos / totalCampos) * 100 : 0;

  const getScoreIcon = () => {
    if (score >= 80) return <CheckCircle size={24} color="#34d399" />;
    if (score >= 50) return <Activity size={24} color="#fbbf24" />;
    return <AlertTriangle size={24} color="#f87171" />;
  };

  return (
    <BottomBarContainer>
      <StatusSection>
        <ScoreDisplay $score={score}>
          {getScoreIcon()}
          <div>
            <div className="score-value">{score}</div>
            <div className="score-label">
              <span>Score</span>
              <span>Geral</span>
            </div>
          </div>
        </ScoreDisplay>
      </StatusSection>

      <ProgressSection>
        <ProgressHeader>
          <span>Progresso do Preenchimento</span>
          <span>{camposPreenchidos} / {totalCampos} campos</span>
        </ProgressHeader>
        <ProgressBarTrack>
          <ProgressBarFill $percentage={percentage} />
        </ProgressBarTrack>
      </ProgressSection>
    </BottomBarContainer>
  );
};

export default BottomBar;
