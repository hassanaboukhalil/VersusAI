import { TooltipProps } from 'recharts';
import { useRef, useEffect } from 'react';
import '../../../styles/tooltip.css';

const TooltipCard = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm shadow-xl">
            <p className="font-semibold text-primary mb-1.5">{label}</p>
            <div className="space-y-1.5">
                {payload.map((p) => (
                    <TooltipItem
                        key={String(p.dataKey)}
                        color={String(p.color || '#fff')}
                        name={String(p.name || '')}
                        value={p.value ?? ''}
                    />
                ))}
            </div>
        </div>
    );
};

// Separate component to handle each tooltip item
const TooltipItem = ({
    color,
    name,
    value,
}: {
    color: string;
    name: string;
    value: string | number;
}) => {
    const itemRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.setProperty('--item-color', color);
        }
    }, [color]);

    return (
        <p ref={itemRef} className="flex items-center gap-2">
            <span className="tooltip-dot" />
            <span className="font-medium tooltip-item">{name}:</span>
            <span className="tooltip-item">{value}</span>
        </p>
    );
};

export default TooltipCard;
