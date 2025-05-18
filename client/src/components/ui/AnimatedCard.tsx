import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stiffness?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    className = '',
    delay = 0,
    stiffness = 70,
    ...props
}) => {
    return (
        <motion.div
            className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl ${className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness, delay }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;
