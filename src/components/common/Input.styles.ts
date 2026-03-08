import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const commonInputStyles = `
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: #e4e7eb;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #4b5563;
    font-style: italic;
  }

  &[data-filled='true'] {
    border-color: #22c55e; /* Tailwind green-500 */
  }
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
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem; /* Make space for arrow */
`;
