'use client';

import React from 'react';

interface SelectProps {
    label?: string;
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder,
    className,
}) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-lg">{label}</label>}
            <select
                className={`rounded bg-white text-black px-2 py-1 ${className || ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
