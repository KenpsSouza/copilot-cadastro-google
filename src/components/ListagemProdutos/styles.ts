import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 1rem 0;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background: rgba(26, 29, 39, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  color: #e4e7eb;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: rgba(229, 24, 45, 0.5);
    box-shadow: 0 0 0 2px rgba(229, 24, 45, 0.2);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => $active ? 'rgba(229, 24, 45, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ $active }) => $active ? 'rgb(255, 102, 102)' : '#9ca3af'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(229, 24, 45, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(229, 24, 45, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${({ $active }) => $active ? 'rgb(255, 102, 102)' : '#e4e7eb'};
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #e4e7eb;
  margin: 0;
  letter-spacing: -0.02em;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: rgba(26, 29, 39, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #e4e7eb;
  margin: 0;
  line-height: 1.3;
`;

export const ProductCategory = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
`;

export const StatusTag = styled.div<{ $status: string }>`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;

  ${({ $status }) => {
    switch ($status) {
      case 'EM_DESENVOLVIMENTO':
        return `
          background: rgba(229, 24, 45, 0.15);
          color: rgb(255, 102, 102);
          border: 1px solid rgba(229, 24, 45, 0.3);
        `;
      case 'CADASTRADO_AGUARDANDO_COMPRAS':
        return `
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
      case 'FINALIZADO':
        return `
          background: rgba(52, 211, 153, 0.15);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.3);
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          border: 1px solid rgba(255, 255, 255, 0.2);
        `;
    }
  }}
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  
  .label {
    color: #9ca3af;
  }
  
  .value {
    color: #e4e7eb;
    font-weight: 600;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  color: #6b7280;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
  color: white;
  box-shadow: 0 4px 12px rgba(229, 24, 45, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(229, 24, 45, 0.3);
  }
`;
