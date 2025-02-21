'use client';

import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';

interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  hoverColor?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RoundedButton({ 
  children, 
  backgroundColor = "#455CE9",
  hoverColor = "#1E0634",
  className = "",
  disabled = false,
  onClick,
  ...attributes 
}: RoundedButtonProps) {

  const circle = useRef<HTMLDivElement>(null);
  let timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")
  }, [])

  const manageMouseEnter = () => {
    if (disabled) return;
    if (timeoutId) clearTimeout(timeoutId)
    timeline.current?.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    if (disabled) return;
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !onClick) return;
    onClick(event);
  }

  return (
    <div 
      className={`${styles.roundedButton} ${disabled ? styles.disabled : ''} ${className}`}
      style={{ 
        backgroundColor, 
        overflow: "hidden",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }} 
      onMouseEnter={manageMouseEnter} 
      onMouseLeave={manageMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...attributes}
    >
      {children}
      <div 
        ref={circle} 
        style={{ backgroundColor: hoverColor }} 
        className={styles.circle}
      ></div>
    </div>
  )
}