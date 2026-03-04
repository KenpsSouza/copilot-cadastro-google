import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(26, 29, 39, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 50;
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    color: #e4e7eb;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const LogoText = styled.h1`
  font-size: 1.4rem;
  font-weight: 800;
  color: #e4e7eb;
  margin: 0;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    background: linear-gradient(135deg, rgb(229, 24, 45), rgb(255, 51, 51));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
  }
`;

export const UserBadge = styled.div<{ $role: 'estilo' | 'compras' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  background: ${({ $role }) => 
    $role === 'estilo' 
      ? 'rgba(229, 24, 45, 0.15)' 
      : 'rgba(59, 130, 246, 0.15)'};
      
  color: ${({ $role }) => 
    $role === 'estilo' 
      ? 'rgb(229, 24, 45)' 
      : '#60a5fa'};
      
  border: 1px solid ${({ $role }) => 
    $role === 'estilo' 
      ? 'rgba(229, 24, 45, 0.3)' 
      : 'rgba(59, 130, 246, 0.3)'};
`;

export const ActionsArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderButton = styled.button<{ $variant?: 'primary' | 'ghost' }>`
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

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background: rgba(255, 255, 255, 0.1);
        color: #e4e7eb;
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        &:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
      `;
    }
    
    // Ghost variant (default)
    return `
      background: transparent;
      color: #9ca3af;
      
      &:hover {
        color: #e4e7eb;
        background: rgba(255, 255, 255, 0.05);
      }
    `;
  }}
`;
