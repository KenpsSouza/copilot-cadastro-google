import React, { forwardRef } from 'react';
import { InputWrapper, Label, StyledInput, StyledTextArea, ErrorMessage } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, error, errorMessage, ...props }, ref) => {
    const isFilled = value != null && value !== '';
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledInput
          ref={ref}
          value={value}
          {...props}
          data-filled={isFilled}
          data-error={!!error}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, value, error, errorMessage, ...props }, ref) => {
    const isFilled = value != null && value !== '';
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledTextArea
          ref={ref}
          value={value}
          {...props}
          data-filled={isFilled}
          data-error={!!error}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
