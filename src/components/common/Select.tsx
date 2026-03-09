import React from 'react';
// Correcting the import path based on our previous change
import { InputWrapper, Label, ErrorMessage } from './Input.styles';
import { StyledSelect } from './Input.styles';

type OptionItem = string | { value: string; label: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: OptionItem[];
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
}

const getOptionValue = (opt: OptionItem): string =>
    typeof opt === 'string' ? opt : opt.value;

const getOptionLabel = (opt: OptionItem): string =>
    typeof opt === 'string' ? opt : opt.label;

export const Select: React.FC<SelectProps> = ({ label, name, value, onChange, options, placeholder, error, errorMessage, ...rest }) => {
    const isFilled = value != null && value !== '';

    return (
        <InputWrapper> 
            <Label htmlFor={name}>{label}</Label>
            <StyledSelect
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                data-filled={isFilled}
                data-error={!!error}
                {...rest}
            >
                <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
                {options.map(opt => (
                    <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
                        {getOptionLabel(opt)}
                    </option>
                ))}
            </StyledSelect>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputWrapper>
    );
};

export default Select;
