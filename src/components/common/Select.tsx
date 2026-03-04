import React from 'react';
import { SelectWrapper, Label, StyledSelect } from './Select.styles';

type OptionItem = string | { value: string; label: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {   
    label: string;
    options: OptionItem[];
    placeholder?: string;
}

const getOptionValue = (opt: OptionItem): string =>
    typeof opt === 'string' ? opt : opt.value;

const getOptionLabel = (opt: OptionItem): string =>
    typeof opt === 'string' ? opt : opt.label;

export const Select: React.FC<SelectProps> = ({ label, name, value, onChange, options, placeholder, ...rest }) => {
    return (
        <SelectWrapper>
            <Label htmlFor={name}>{label}</Label>
            <StyledSelect id={name} name={name} value={value} onChange={onChange} {...rest}>
                <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
                {options.map(opt => (
                    <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
                        {getOptionLabel(opt)}
                    </option>
                ))}
            </StyledSelect>
        </SelectWrapper>
    );
};

export default Select;
