import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'react-feather';

const ToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #e4e7eb;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsLight(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <ToggleButton onClick={toggleTheme} title={isLight ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}>
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </ToggleButton>
  );
};
