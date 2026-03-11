import styled from 'styled-components';
import { ds } from '../../styles/designSystem';

export const ListContainer = styled.div`
    padding: ${ds.spacing.lg};
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: ${ds.font.size.xl};
    font-weight: ${ds.font.weight.bold};
    color: #f3f4f6;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: ${ds.spacing.lg};

    @media (max-width: 1400px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    background: #1f2937;
    border-radius: ${ds.radius.md};
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-shadow: ${ds.shadow.sm};
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        border-color: rgba(236, 72, 153, 0.5);
    }
`;

export const CardHeader = styled.div`
    padding: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProductName = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #e4e7eb;
    margin: 0;
    line-height: 1.3;
`;

export const ProductCategory = styled.p`
    font-size: 0.8rem;
    color: #9ca3af; /* gray-400 */
    margin: 0.25rem 0 0;
`;

export const StatusTag = styled.span<{$status?: string}>`
    & > span {
        color: #fff !important;
    }
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.3em;

    ${({ $status }) => {
        switch ($status) {
            case 'EM_DESENVOLVIMENTO':
                return `background-color: #3b82f6; color: #fff;`;
            case 'ESTILO_CONCLUIDO':
                return `background: none; color: #fff !important; border: 2px solid #f97316;`;
            case 'LIBERADO_PARA_COMPRAS':
                return `background-color: #f97316; color: #fff;`;
            case 'FINALIZADO':
                return `background: none; color: #fff !important; border: 2px solid #22c55e;`;
            default:
                return `background-color: #6b7280; color: #fff;`;
        }
    }}
`;

export const CardBody = styled.div`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1; /* Makes body grow to fill space */
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;

    .label {
        color: #9ca3af;
        font-weight: 500;
    }

    .value {
        color: #e4e7eb;
        font-weight: 600;
    }
`;

export const CardFooter = styled.div`
    padding: 0.75rem 1.25rem;
    background: rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #9ca3af;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: auto; /* Pushes footer to the bottom */
`;

export const FooterActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const FooterActionText = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #e4e7eb;
`;

export const FooterIconButton = styled.button`
    background: transparent;
    border: none;
    color: #9ca3af;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
        background: #ef4444; // red-500
        color: #fff;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
    }
`;


export const ActionButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #ec4899; /* pink-500 */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #db2777; /* pink-600 */
    }
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap; // Allows filters to wrap on smaller screens
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
`;

export const SearchWrapper = styled.div`
    position: relative;
    flex-grow: 1;
    min-width: 250px;

    svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 0.7rem 1rem 0.7rem 2.8rem;
    color: #e4e7eb;
    font-size: 0.9rem;
    outline: none;

    &:focus {
        border-color: #ec4899;
        background: rgba(0,0,0,0.3);
    }
`;

export const FilterButton = styled.button<{$active: boolean}>`
    background: ${({ $active }) => $active ? 'rgba(236, 72, 153, 0.2)' : 'rgba(0,0,0,0.2)'};
    border: 1px solid ${({ $active }) => $active ? '#ec4899' : 'rgba(255,255,255,0.1)'};
    color: ${({ $active }) => $active ? '#ec4899' : '#9ca3af'};
    padding: 0.7rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.3em;

    &:hover {
        background: rgba(236, 72, 153, 0.1);
        color: #e4e7eb;
    }
`;

export const FilterSelect = styled.select<{ $active?: boolean }>`
    width: 180px;
    background: rgba(26, 29, 39, 0.85);
    border: 2px solid
        ${({ $active }) => $active ? '#ec4899' : 'rgba(255,255,255,0.18)'};
    color: #f3f4f6;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    outline: none;
    box-shadow: 0 2px 8px 0 rgba(31,38,135,0.08);
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%239ca3af" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2em;
    transition: border 0.18s, box-shadow 0.18s, background 0.18s;

    &:hover {
        border-color: #ec4899;
        background: rgba(26, 29, 39, 0.95);
        color: #fff;
    }

    &:focus {
        border-color: #22c55e;
        box-shadow: 0 0 0 3px rgba(34,197,94,0.13);
        background: rgba(26, 29, 39, 1);
        color: #fff;
    }

    option {
        color: #111827;
        background: #f3f4f6;
        font-size: 1rem;
    }
`;


export const ProgressContainer = styled.div`
  margin-bottom: 0.5rem; 
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.4rem;

  &::after {
    content: '';
    display: block;
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #22c55e; /* green-500 */
    transition: width 0.3s ease-out;
  }
`;

export const ProgressLabel = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
  text-align: right;
`;
