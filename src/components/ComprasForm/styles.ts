import styled, { keyframes, css } from 'styled-components';

const iridescentBorder = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const FormContainer = styled.div`
  background: rgba(26, 29, 39, 0.72);
  border-radius: 22px;
  padding: 2.2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(229,24,45,0.08);
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  transition: box-shadow 0.25s, border 0.25s, background 0.25s;

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
  gap: 18px;
  border-top: 1.5px solid rgba(255,255,255,0.13);
  padding-top: 1.5rem;
  margin-top: 2.5rem;
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
    gap: 12px;
    align-items: stretch;
    padding-top: 1rem;
    margin-top: 1.3rem;
    border-top-width: 1px;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 1rem 2.2rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(229,24,45,0.10);
  backdrop-filter: blur(6px) saturate(1.1);
  -webkit-backdrop-filter: blur(6px) saturate(1.1);
  transition: box-shadow 0.22s, border 0.22s, background 0.22s, color 0.18s, transform 0.18s;
  user-select: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
          color: white;
          box-shadow: 0 4px 16px rgba(229, 24, 45, 0.18);
          border: 1.5px solid rgba(229, 24, 45, 0.18);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 8px 28px rgba(229, 24, 45, 0.22);
            filter: brightness(1.08);
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
            filter: brightness(0.97);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.13);
          color: #ef4444;
          border: 1.5px solid rgba(239, 68, 68, 0.22);
          
          &:hover:not(:disabled) {
            background: rgba(239, 68, 68, 0.22);
            color: #fff;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.18);
          }
        `;
      case 'secondary':
      default:
        return `
          background: rgba(255, 255, 255, 0.07);
          color: #e4e7eb;
          border: 1.5px solid rgba(255, 255, 255, 0.13);
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.13);
            color: #fff;
            box-shadow: 0 4px 16px rgba(229, 24, 45, 0.10);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.2);
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
