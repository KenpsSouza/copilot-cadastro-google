import React, { useState } from 'react';
import {
  PanelCard, PanelTitle, ScoreBar, ScoreFill,
  ChecklistItem, SuggestionItem, ProgressText, ScoreNumber,
  AlertItem, AlertSugestao, AIDescriptionCard, AITextArea, 
  AIParseButton, MiniCard, MiniCardTitle, TypingIndicator,
} from './Panel.styles';
import { CheckCircle, XCircle, AlertCircle, AlertTriangle, Zap, TrendingUp, Info, FileText } from 'react-feather';
import { AIAlert } from '../../types';

// ========================
// CARDS DE ALERTA E CHECKLIST
// ========================
export const AlertsPanel: React.FC<{ alertas: AIAlert[] }> = ({ alertas }) => {
  if (!alertas || alertas.length === 0) return null;
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'error': return <AlertCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'success': return <CheckCircle size={16} />;
      default: return <Info size={16} />;
    }
  };
  return (
    <PanelCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertTriangle size={18} color="#f59e0b" />
        <PanelTitle style={{ marginBottom: 0 }}>Alertas IA ({alertas.length})</PanelTitle>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 260, overflowY: 'auto' }}>
        {alertas.map((alerta, idx) => (
          <AlertItem key={idx} tipo={alerta.tipo}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>{getIcon(alerta.tipo)}</div>
            <div>
              {alerta.campo && (<span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{alerta.campo}: </span>)}
              {alerta.mensagem}
              {alerta.sugestao && <AlertSugestao>💡 {alerta.sugestao}</AlertSugestao>}
            </div>
          </AlertItem>
        ))}
      </div>
    </PanelCard>
  );
};

export const ChecklistPanel: React.FC<{ items: { texto: string; ok: boolean }[]; children?: React.ReactNode }> = ({ items, children }) => {
  if (!items || items.length === 0) return null;
  const doneCount = items.filter(i => i.ok).length;
  return (
    <PanelCard>
      <PanelTitle>Checklist ({doneCount}/{items.length})</PanelTitle>
      {children && <div style={{ marginBottom: '0.4rem' }}>{children}</div>}
      <div style={{ maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, idx) => (
          <ChecklistItem key={idx} style={{ color: item.ok ? '#22c55e' : '#ef4444' }}>
            {item.ok ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span style={{ fontSize: '0.86rem' }}>{item.texto}</span>
          </ChecklistItem>
        ))}
      </div>
    </PanelCard>
  );
};

export const SuggestionsPanel: React.FC<{ sugestoes: string[] }> = ({ sugestoes }) => (
  <PanelCard className="holographic">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <TrendingUp size={18} color="#22c55e" />
      <PanelTitle style={{ marginBottom: 0 }}>Sugestões IA</PanelTitle>
    </div>
    {sugestoes.map((s, idx) => (
      <SuggestionItem key={idx}>
        <span style={{ marginRight: 6, color: '#818cf8' }}>›</span>{s}
      </SuggestionItem>
    ))}
  </PanelCard>
);

// ========================
// AI DESCRIPTION (O Card Menor do painel esquerdo da sidebar)
// ========================
export const AIDescriptionPanel: React.FC<{ onParse: (texto: string) => void; isParsing: boolean }> = ({ onParse, isParsing }) => {
  const [texto, setTexto] = useState('');
  return (
    <AIDescriptionCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'conic-gradient(from 0deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(229, 24, 45))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'spin 4s linear infinite', boxShadow: '0 0 12px rgba(229, 24, 45, 0.3)',
        }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: '#1a1d27', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={14} color="rgb(229, 24, 45)" />
          </div>
        </div>
        <PanelTitle style={{ marginBottom: 0, fontSize: '0.95rem' }}>Descreva o Produto</PanelTitle>
      </div>
      <span style={{ fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.5, letterSpacing: '0.01em' }}>
        Escreva livremente sobre o produto. A IA vai categorizar e preencher todos os campos automaticamente.
      </span>
      <AITextArea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Ex: Camisa manga longa social slim fit, coleção inverno 2026, público masculino..."
      />
      {isParsing ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TypingIndicator><span /><span /><span /></TypingIndicator>
          <span style={{ fontSize: '0.82rem', color: 'rgb(229, 24, 45)', fontWeight: 600, fontStyle: 'italic' }}>Analisando com IA...</span>
        </div>
      ) : (
        <AIParseButton disabled={!texto.trim()} onClick={() => onParse(texto)}>
          <span className="siri-shine" />
          <Zap size={16} /> Preencher com IA
        </AIParseButton>
      )}
    </AIDescriptionCard>
  );
};

// ========================
// MINI PROGRESS PANEL
// ========================
export const MiniProgressPanel: React.FC<{ camposPreenchidos: number; totalCampos: number; score: number; role: 'estilo' | 'compras' }> = ({ camposPreenchidos, totalCampos, score, role }) => (
  <MiniCard style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.7rem 0.8rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Zap size={14} color="#6366f1" />
      <MiniCardTitle style={{ marginBottom: 0, fontSize: '0.74rem' }}>
        Copiloto IA — {role === 'estilo' ? 'Estilo' : 'Compras'}
      </MiniCardTitle>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8', lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>/100</span>
    </div>
    <ScoreBar style={{ height: 6 }}><ScoreFill percent={score} /></ScoreBar>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#6b7280' }}>
      <span>{camposPreenchidos} de {totalCampos} campos</span>
      <span>{totalCampos - camposPreenchidos} restantes</span>
    </div>
  </MiniCard>
);
