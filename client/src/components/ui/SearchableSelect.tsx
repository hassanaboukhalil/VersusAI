'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './input';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface SearchableSelectProps {
    label?: string;
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = 'Search...',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle option selection
    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    // Display value or placeholder in the input field
    const displayValue = value || placeholder;

    return (
        <div className={`flex flex-col gap-1 relative ${className || ''}`} ref={containerRef}>
            {label && <label className="text-lg">{label}</label>}

            <div
                className="flex items-center bg-white text-black px-2 py-1 rounded cursor-pointer w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex-1 truncate">{displayValue}</div>
                <div className="ml-2">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white text-black rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                    <div className="p-2 sticky top-0 bg-white border-b">
                        <div className="relative">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search options..."
                                className="pl-8 w-full"
                                autoFocus
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        </div>
                    </div>

                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${option === value ? 'bg-blue-100' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-gray-500">No options found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
