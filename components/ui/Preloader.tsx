"use client";
import React, { useState, useEffect } from 'react';

export const Preloader = ({ isLoaded, setIsLoaded }: { isLoaded: boolean, setIsLoaded: (v: boolean) => void }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isLoaded) return;
        const interval = setInterval(() => {
            setCount(prev => {
                const next = prev + Math.floor(Math.random() * 12) + 4;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoaded(true), 400);
                    return 100;
                }
                return next;
            });
        }, 60);
        return () => clearInterval(interval);
    }, [isLoaded, setIsLoaded]);

    return (
        <div className={`fixed inset-0 z-[99999] bg-[#FAF8F5] flex justify-center items-center transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="text-[15vw] font-bold text-[#1C1B1A] tracking-tighter leading-none">
                {count}%
            </div>
        </div>
    );
};