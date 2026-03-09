import styled from 'styled-components';
import { ds } from '../../styles/designSystem';

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${ds.spacing.sm};
`;

export const Label = styled.label`
    font-size: ${ds.font.size.sm};
    font-weight: ${ds.font.weight.semibold};
    color: #9ca3af; /* Poderia ser ds.colors.textSecondary se existir */
    letter-spacing: 0.01em;
`;

export const StyledSelect = styled.select`
    padding: ${ds.spacing.sm};
    border: 1.5px solid rgba(255,255,255,0.13);
    border-radius: ${ds.radius.md};
    background-color: #151821;
    font-size: ${ds.font.size.md};
    color: #e4e7eb;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%236b7280" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right ${ds.spacing.md} center;
    background-size: 1.2em;
    box-shadow: ${ds.shadow.sm};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ec4899;
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.08);
    }
`;
