import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#0f1117',
    surface: '#1a1d27',
    primary: 'rgb(229, 24, 45)',
    secondary: 'rgb(255, 51, 51)',
    accent: '#3b82f6',
    text: '#e4e7eb',
    textMuted: '#9ca3af',
    danger: '#ef4444',
    success: '#34d399',
    warning: '#fbbf24',
  },
  fonts: {
    main: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
};

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    transition: filter 0.3s ease;
  }

  body.light-mode {
    filter: invert(1) hue-rotate(180deg);
  }

  body.light-mode img, body.light-mode video {
    filter: invert(1) hue-rotate(180deg);
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
