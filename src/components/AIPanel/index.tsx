import React from 'react';
import { AIValidationResult } from '../../types';
import { AlertsPanel, ChecklistPanel, SuggestionsPanel, AIDescriptionPanel, MiniProgressPanel } from './PanelCards';

interface AIPanelProps {
  validation: AIValidationResult;
  role: 'estilo' | 'compras';
  onAIDescriptionParse?: (texto: string) => void;
  isParsing?: boolean;
}

const AIPanel: React.FC<AIPanelProps> = ({ validation, role, onAIDescriptionParse, isParsing }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
      {onAIDescriptionParse && role === 'estilo' && (
        <AIDescriptionPanel onParse={onAIDescriptionParse} isParsing={!!isParsing} />
      )}
      {validation.alertas.length > 0 && (
        <AlertsPanel alertas={validation.alertas} />
      )}
      <SuggestionsPanel sugestoes={validation.sugestoes} />
      <ChecklistPanel items={validation.checklist}>
        <MiniProgressPanel
          camposPreenchidos={validation.camposPreenchidos}
          totalCampos={validation.totalCampos}
          score={validation.score}
          role={role}
        />
      </ChecklistPanel>
    </div>
  );
};

export default AIPanel;
