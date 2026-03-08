import React, { forwardRef } from 'react';
import { InputWrapper, Label, StyledInput, StyledTextArea } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, ...props }, ref) => {
    const isFilled = value != null && value !== '';
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledInput ref={ref} value={value} {...props} data-filled={isFilled} />
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, value, ...props }, ref) => {
    const isFilled = value != null && value !== '';
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledTextArea ref={ref} value={value} {...props} data-filled={isFilled} />
      </InputWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
