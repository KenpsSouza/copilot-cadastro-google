import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

/* ═══════════════════════════════════════════════════════
   BRAND MARKS — HTML/CSS com Montserrat carregada
   Fiel às imagens originais das marcas
   ═══════════════════════════════════════════════════════ */

const BrandMark = styled.div`
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`;

/* ─── ARAMIS — Montserrat Light 300, espaçado, linha vermelha no A ─── */
const AramisRedLine = styled.span`
  position: absolute;
  top: 58%;
  left: 0;
  right: 0;
  height: var(--aramis-line-h, 1.5px);
  background: #E5182D;
  border-radius: 1px;
  pointer-events: none;
`;

const AramisFirstA = styled.span`
  position: relative;
  display: inline-block;
`;

const AramisBrand: React.FC<{ color?: string }> = ({ color = '#e4e7eb' }) => (
  <BrandMark>
    <span
      style={{
        color,
        fontWeight: 300,
        fontSize: 'var(--brand-aramis-size)',
        letterSpacing: '0.32em',
        lineHeight: 1,
      }}
    >
      <AramisFirstA>
        A
        <AramisRedLine />
      </AramisFirstA>
      RAMIS
    </span>
  </BrandMark>
);

/* ─── ARAMIS NEXT — "ARAMIS" pequeno em cima, "next" grande fino, bem próximos ─── */
const AramisNextBrand: React.FC<{ color?: string }> = ({ color = '#e4e7eb' }) => (
  <BrandMark style={{ alignItems: 'flex-start', gap: 0 }}>
    <span
      style={{
        color,
        fontWeight: 200,
        fontSize: 'var(--brand-next-top)',
        letterSpacing: '0.35em',
        lineHeight: 1,
        marginBottom: 'var(--brand-next-gap)',
      }}
    >
      ARAMIS
    </span>
    <span
      style={{
        color,
        fontWeight: 200,
        fontSize: 'var(--brand-next-bottom)',
        letterSpacing: '0.02em',
        lineHeight: 0.82,
      }}
    >
      next
    </span>
  </BrandMark>
);

/* ─── URBAN — Montserrat Black 900, ultra-bold geométrico ─── */
const UrbanBrand: React.FC<{ color?: string }> = ({ color = '#e4e7eb' }) => (
  <BrandMark>
    <span
      style={{
        color,
        fontWeight: 700,
        fontSize: 'var(--brand-urban-size)',
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}
    >
      URBAN
    </span>
  </BrandMark>
);

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */
interface BrandCarouselProps {
  variant?: 'header' | 'login';
  color?: string;
  interval?: number;
}

/* ═══════════════════════════════════════════════════════
   ANIMATIONS — slide horizontal suave
   ═══════════════════════════════════════════════════════ */
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
    filter: blur(2px);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
`;

const slideOutToRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateX(30px);
    filter: blur(2px);
  }
`;

const progressFill = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

/* ═══════════════════════════════════════════════════════
   STYLED COMPONENTS
   ═══════════════════════════════════════════════════════ */
const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const CarouselWrapper = styled.div<{ $variant: 'header' | 'login' }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${({ $variant }) =>
    $variant === 'header'
      ? css`
          height: 32px;
          width: 160px;

          --brand-aramis-size: 18px;
          --aramis-line-h: 1px;
          --brand-next-top: 6px;
          --brand-next-bottom: 24px;
          --brand-next-gap: 0px;
          --brand-urban-size: 20px;
        `
      : css`
          height: 80px;
          width: 320px;

          --brand-aramis-size: 40px;
          --aramis-line-h: 2.5px;
          --brand-next-top: 14px;
          --brand-next-bottom: 56px;
          --brand-next-gap: 0px;
          --brand-urban-size: 42px;
        `}
`;

const BrandSlide = styled.div<{
  $state: 'entering' | 'active' | 'exiting';
  $direction: 'forward' | 'backward';
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  will-change: transform, opacity, filter;

  ${({ $state, $direction }) => {
    if ($state === 'active') {
      return css`
        opacity: 1;
        transform: translateX(0);
        filter: blur(0);
      `;
    }
    if ($state === 'entering') {
      const anim = $direction === 'forward' ? slideInFromRight : slideInFromLeft;
      return css`
        animation: ${anim} 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
      `;
    }
    const anim = $direction === 'forward' ? slideOutToLeft : slideOutToRight;
    return css`
      animation: ${anim} 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
    `;
  }}
`;

const ProgressTrack = styled.div<{ $variant: 'header' | 'login' }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1px;
  overflow: hidden;

  ${({ $variant }) =>
    $variant === 'header' &&
    css`
      display: none;
    `}
`;

const ProgressFill = styled.div<{ $duration: number; $running: boolean }>`
  height: 100%;
  border-radius: 1px;
  background: linear-gradient(90deg, rgba(229, 24, 45, 0.4), rgba(229, 24, 45, 0.7));
  animation: ${progressFill} ${({ $duration }) => $duration}ms linear;
  animation-play-state: ${({ $running }) => ($running ? 'running' : 'paused')};
  animation-fill-mode: forwards;
`;

const DotsContainer = styled.div<{ $variant: 'header' | 'login' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: ${({ $variant }) => ($variant === 'header' ? '0' : '14px')};

  ${({ $variant }) =>
    $variant === 'header' &&
    css`
      display: none;
    `}
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '20px' : '6px')};
  height: 6px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(90deg, rgb(229, 24, 45), rgb(255, 60, 60))'
      : 'rgba(255, 255, 255, 0.12)'};

  &:hover {
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(90deg, rgb(229, 24, 45), rgb(255, 60, 60))'
        : 'rgba(255, 255, 255, 0.25)'};
    transform: scale(1.1);
  }
`;

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
const brands = [AramisBrand, AramisNextBrand, UrbanBrand];

export const BrandCarousel: React.FC<BrandCarouselProps> = ({
  variant = 'login',
  color = '#e4e7eb',
  interval = 500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (isTransitioning || nextIdx === currentIndex) return;

      const forward =
        nextIdx > currentIndex ||
        (currentIndex === brands.length - 1 && nextIdx === 0);
      setDirection(forward ? 'forward' : 'backward');

      setIsTransitioning(true);
      setPrevIndex(currentIndex);
      setCurrentIndex(nextIdx);

      setTimeout(() => {
        setPrevIndex(null);
        setIsTransitioning(false);
        setProgressKey((k) => k + 1);
      }, 380);
    },
    [currentIndex, isTransitioning],
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (currentIndex + 1) % brands.length;
      goTo(next);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, interval, goTo]);

  const CurrentBrandComponent = brands[currentIndex];
  const PrevBrandComponent = prevIndex !== null ? brands[prevIndex] : null;

  return (
    <OuterWrapper>
      <CarouselWrapper $variant={variant}>
        {PrevBrandComponent && prevIndex !== null && (
          <BrandSlide
            key={`exit-${prevIndex}-${Date.now()}`}
            $state="exiting"
            $direction={direction}
          >
            <PrevBrandComponent color={color} />
          </BrandSlide>
        )}
        <BrandSlide
          key={`enter-${currentIndex}`}
          $state={prevIndex !== null ? 'entering' : 'active'}
          $direction={direction}
        >
          <CurrentBrandComponent color={color} />
        </BrandSlide>
      </CarouselWrapper>
    </OuterWrapper>
  );
};

export default BrandCarousel;
