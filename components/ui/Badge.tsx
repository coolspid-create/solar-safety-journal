import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'orange' | 'dark' | 'green';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        default: "bg-gray-100 text-gray-800",
        outline: "text-gray-950 border border-gray-200",
        orange: "bg-orange-100 text-[var(--color-solar-orange)]",
        dark: "bg-[var(--color-dark-grey)] text-white",
        green: "bg-green-100 text-green-800"
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
