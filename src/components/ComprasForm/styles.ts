import styled, { keyframes, css } from 'styled-components';

const iridescentBorder = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const FormContainer = styled.div`
  background: #1a1d27;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  /* Borda animada iridescente mais sutil */
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

  /* Gradiente de fundo sutil reduzido */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, rgba(229, 24, 45, 0.03), transparent 40%),
                radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.03), transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const SectionTitle = styled.h3`
  color: #e4e7eb;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 600px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
          color: white;
          box-shadow: 0 4px 12px rgba(229, 24, 45, 0.2);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(229, 24, 45, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          
          &:hover:not(:disabled) {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'secondary':
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          color: #d1d5db;
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ══════════════════════════════════════════════
   SEÇÃO READ-ONLY — Dados do Estilo
   ══════════════════════════════════════════════ */

export const ReadOnlySection = styled.div<{ $collapsed?: boolean }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const ReadOnlySectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const ReadOnlyHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReadOnlyHeaderIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(168, 85, 247, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a855f7;
`;

export const ReadOnlyHeaderTitle = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: #a0a8b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ReadOnlyHeaderBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.03em;
`;

export const ReadOnlyChevron = styled.div<{ $open: boolean }>`
  color: #6b7280;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const ReadOnlyBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0;
  max-height: ${({ $open }) => $open ? '2000px' : '0'};
  opacity: ${({ $open }) => $open ? 1 : 0};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  padding: ${({ $open }) => $open ? '0.2rem 0.6rem 0.8rem' : '0 0.6rem'};
`;

export const ReadOnlyGroupTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.7rem 0.6rem 0.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  margin-bottom: 0.2rem;
`;

export const ReadOnlyField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0.55rem 0.6rem;
  border-radius: 8px;
  transition: background 0.15s ease;
  min-width: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.025);
  }
`;

export const ReadOnlyLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReadOnlyValue = styled.span<{ $empty?: boolean }>`
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ $empty }) => $empty ? '#374151' : '#d1d5db'};
  font-style: ${({ $empty }) => $empty ? 'italic' : 'normal'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* Separador visual entre seção read-only e editável */
export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.5rem 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 24, 45, 0.2), transparent);
  }
`;

export const SectionDividerLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: rgb(229, 24, 45);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const EditableSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
