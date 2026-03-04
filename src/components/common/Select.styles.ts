import styled from 'styled-components';

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-size: 0.88rem;
    font-weight: 600;
    color: #9ca3af;
    letter-spacing: 0.01em;
`;

export const StyledSelect = styled.select`
    padding: 0.75rem;
    border: 1px solid #2d3348;
    border-radius: 10px;
    background-color: #151821;
    font-size: 0.95rem;
    color: #e4e7eb;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* A seta SVG hardcoded garante que o dropdown apareça bonitão nos browsers! */
    background-image: url('data:image/svg+xml;utf8,<svg fill="%236b7280" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.2em;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        outline: none;
        border-color: rgba(236, 72, 153, 0.4);
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.08);
    }
`;
