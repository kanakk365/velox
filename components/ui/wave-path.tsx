'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type WavePathProps = React.ComponentProps<'div'> & { color?: string };

export function WavePath({ className, color = 'currentColor', ...props }: WavePathProps) {
  const container = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, []);

  const getWidth = () => container.current?.clientWidth ?? window.innerWidth * 0.7;

  const setPath = (prog: number) => {
    const width = getWidth();
    path.current?.setAttributeNS(
      null,
      'd',
      `M0 100 Q${width * x} ${100 + prog * 0.6}, ${width} 100`,
    );
  };

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const manageMouseEnter = () => {
    if (reqId) { cancelAnimationFrame(reqId); resetAnimation(); }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    if (path.current) {
      const bound = path.current.getBoundingClientRect();
      x = (clientX - bound.left) / bound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const manageMouseLeave = () => { animateOut(); };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => { time = Math.PI / 2; progress = 0; };

  return (
    <div ref={container} className={cn('relative h-px w-full', className)} {...props}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full overflow-visible">
        <path ref={path} fill="none" stroke={color} strokeWidth={1.5} />
      </svg>
    </div>
  );
}
