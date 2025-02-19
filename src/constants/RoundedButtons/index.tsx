'use client';

import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';

interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
}

export default function RoundedButton({ 
  children, 
  backgroundColor = "#455CE9", 
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
    if (timeoutId) clearTimeout(timeoutId)
    timeline.current?.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300)
  }

  return (
    <div 
      className={styles.roundedButton} 
      style={{ overflow: "hidden" }} 
      onMouseEnter={manageMouseEnter} 
      onMouseLeave={manageMouseLeave} 
      {...attributes}
    >
      {children}
      <div 
        ref={circle} 
        style={{ backgroundColor: '#9D5FED' }} 
        className={styles.circle}
      ></div>
    </div>
  )
}