// Design System centralizado para padronização visual

export const spacing = {
  xs: '0.4rem',
  sm: '0.8rem',
  md: '1.2rem',
  lg: '2rem',
  xl: '2.8rem',
};

export const font = {
  family: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  size: {
    xs: '0.75rem',
    sm: '0.88rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.8rem',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.5,
  },
};

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '22px',
};

export const shadow = {
  sm: '0 2px 8px 0 rgba(31,38,135,0.08)',
  md: '0 4px 18px 0 rgba(229,24,45,0.13)',
  lg: '0 8px 32px 0 rgba(31,38,135,0.18)',
};

// Exporta para uso em styled-components
export const ds = { spacing, font, radius, shadow };
