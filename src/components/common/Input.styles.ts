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

export const StyledInput = styled.input`
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
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: #e4e7eb;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #4b5563;
    font-style: italic;
  }
`;
