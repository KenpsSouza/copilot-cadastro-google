import styled from 'styled-components';
import { ds } from '../../styles/designSystem';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.xs};
  width: 100%;
  position: relative;
`;

export const Label = styled.label`
  font-size: ${ds.font.size.sm};
  font-weight: ${ds.font.weight.semibold};
  color: #9ca3af; /* Poderia ser ds.colors.textSecondary se existir */
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const commonInputStyles = `
  width: 100%;
  background: rgba(26, 29, 39, 0.55);
  border: 1.5px solid rgba(255,255,255,0.13);
  border-radius: ${ds.radius.md};
  padding: ${ds.spacing.sm} ${ds.spacing.md};
  color: #e4e7eb;
  font-size: ${ds.font.size.md};
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;
  outline: none;
  box-shadow: ${ds.shadow.sm};
  backdrop-filter: blur(8px) saturate(1.1);
  -webkit-backdrop-filter: blur(8px) saturate(1.1);

  &:hover {
    border-color: #e5182d;
    background: rgba(26, 29, 39, 0.68);
    box-shadow: ${ds.shadow.md};
  }

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.18), ${ds.shadow.md};
    background: rgba(26, 29, 39, 0.78);
  }

  &::placeholder {
    color: #6b7280;
    font-style: italic;
    opacity: 0.85;
    letter-spacing: 0.01em;
  }

  &[data-filled='true'] {
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.13);
    background: rgba(26, 29, 39, 0.68);
  }

  &[data-error='true'] {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.18);
    background: rgba(239, 68, 68, 0.07);
  }
`;
export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: ${ds.font.size.xs};
  margin-top: 2px;
  font-weight: ${ds.font.weight.medium};
  letter-spacing: 0.01em;
  padding-left: 2px;
  min-height: 1.2em;
  transition: color 0.18s;
`;

export const StyledInput = styled.input`
  ${commonInputStyles}
`;

export const StyledTextArea = styled.textarea`
  ${commonInputStyles}
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
`;

// Assuming Select has a similar structure
export const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSelect = styled.select`
  ${commonInputStyles}
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right ${ds.spacing.md} center;
  background-size: 1em;
  padding-right: 2.5rem; /* Make space for arrow */
`;
