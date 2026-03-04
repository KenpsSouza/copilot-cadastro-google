import React, { forwardRef } from 'react';
import { InputWrapper, Label, StyledInput, StyledTextArea } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledInput ref={ref} {...props} />
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ...props }, ref) => {
    return (
      <InputWrapper>
        <Label>{label}</Label>
        <StyledTextArea ref={ref} {...props} />
      </InputWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
