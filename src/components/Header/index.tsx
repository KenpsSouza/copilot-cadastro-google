import React from 'react';
import { UserRole } from '../../types';
import { HeaderContainer, LogoArea, LogoText, UserBadge, ActionsArea, HeaderButton, BackButton } from './styles';
import { LogOut, ArrowLeft } from 'react-feather';

import { ThemeToggle } from '../ThemeToggle';
import { BrandCarousel } from '../BrandCarousel';

interface HeaderProps {
  userRole: UserRole;
  onLogout: () => void;
  onNewProduct: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, onBack, showBack }) => {
  return (
    <HeaderContainer>
      <LogoArea>
        <BrandCarousel variant="header" color="#e4e7eb" interval={1500} />
        <LogoText style={{ marginLeft: '8px' }}>
          <span>Copilot</span>
        </LogoText>
        <UserBadge $role={userRole}>
          {userRole === 'estilo' ? 'Estilo' : 'Compras'}
        </UserBadge>
      </LogoArea>

      <ActionsArea>
        {showBack && (
          <BackButton onClick={onBack} title="Voltar">
            <ArrowLeft size={20} />
          </BackButton>
        )}
        <ThemeToggle />
        <HeaderButton $variant="ghost" onClick={onLogout}>
          <LogOut size={16} />
          Sair
        </HeaderButton>
      </ActionsArea>
    </HeaderContainer>
  );
};

export default Header;
