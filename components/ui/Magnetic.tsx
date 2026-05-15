"use client";
import React, { useRef, useState } from 'react';

export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center, multiplied by a friction/strength factor (0.2)
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ 
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`, 
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
            className="inline-block cursor-none"
        >
            {children}
        </div>
    );
}