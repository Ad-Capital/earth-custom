'use client';
import styles from './style.module.scss';
import { JSX, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words: string[] = ["Love", "Share", "Express", "Love", "Share", "Express", "Love", "Share", "Express"];

interface Dimension {
  width: number;
  height: number;
}

export default function Index(): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [dimension, setDimension] = useState<Dimension>({width: 0, height: 0});

    useEffect(() => {
        setDimension({width: window.innerWidth, height: window.innerHeight});
    }, []);

    useEffect(() => {
        if(index === words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve: Variants = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    };

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 && 
            <>
                <motion.p variants={opacity} initial="initial" animate="enter">{words[index]}</motion.p>
                <svg>
                    <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                </svg>
            </>
            }
        </motion.div>
    );
}