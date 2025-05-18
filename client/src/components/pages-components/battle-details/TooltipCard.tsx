import { TooltipProps } from 'recharts';

const TooltipCard = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm shadow-xl">
            <p className="font-semibold text-primary mb-1.5">{label}</p>
            <div className="space-y-1.5">
                {payload.map((p) => (
                    <p
                        key={p.dataKey}
                        className="flex items-center gap-2"
                        style={{ color: p.color }}
                    >
                        <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ background: p.color }}
                        />
                        <span className="font-medium" style={{ color: p.color }}>
                            {p.name}:
                        </span>
                        <span style={{ color: p.color }}>{p.value}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default TooltipCard;
