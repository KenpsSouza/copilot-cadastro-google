import styled, { keyframes } from 'styled-components';
import { ds } from '../../styles/designSystem';

const iridescentBorder = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const FormContainer = styled.div`
  background: rgba(26, 29, 39, 0.72);
  border-radius: ${ds.radius.xl};
  padding: ${ds.spacing.lg} ${ds.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.lg};
  position: relative;
  overflow: hidden;
  box-shadow: ${ds.shadow.lg};
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  transition: box-shadow 0.25s, border 0.25s, background 0.25s;

  /* Borda animada vermelha igual ComprasForm */
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
  font-size: ${ds.font.size.md};
  font-weight: ${ds.font.weight.bold};
  margin: 0 0 ${ds.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${ds.spacing.sm};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  padding-bottom: ${ds.spacing.xs};
  position: relative;
  /* Adiciona divisor animado sutil */
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0; right: 0; bottom: -6px;
    height: 2px;
    background: linear-gradient(90deg, rgba(229,24,45,0.13) 0%, rgba(168,85,247,0.10) 100%);
    border-radius: 2px;
    opacity: 0.7;
    pointer-events: none;
    transition: background 0.3s;
  }
`;
export const RequiredMark = styled.span`
  color: #e5182d;
  font-size: 1.1em;
  margin-left: 0.2em;
  font-weight: ${ds.font.weight.bold};
  vertical-align: super;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${ds.spacing.md};
  align-items: stretch;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  & > * {
    transition: box-shadow 0.18s, transform 0.18s;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.xs};
`;

export const FullWidthField = styled.div`
  grid-column: 1 / -1;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.md};
  margin-top: ${ds.spacing.lg};
  padding-top: ${ds.spacing.lg};
  border-top: 1.5px solid rgba(255, 255, 255, 0.13);

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
  gap: ${ds.spacing.sm};
  padding: ${ds.spacing.sm} ${ds.spacing.xl};
  border-radius: ${ds.radius.lg};
  font-weight: ${ds.font.weight.bold};
  font-size: ${ds.font.size.md};
  cursor: pointer;
  border: none;
  box-shadow: ${ds.shadow.sm};
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

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${ds.spacing.md};
  width: 100%;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${ds.spacing.sm};
  }
`;
