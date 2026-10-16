import React from 'react';

export default function ConstructionBackground() {
    return (
        <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none select-none">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#070A11] transition-colors duration-300"></div>

            {/* Subtle Ambient Radial Glows (Cyan & Tech Blue) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.10),transparent_70%)] opacity-80 pointer-events-none"></div>
            <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.06),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(0,140,255,0.06),transparent_65%)] pointer-events-none"></div>
            <div className="absolute bottom-10 -right-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(6,182,212,0.05),transparent_65%)] pointer-events-none"></div>

            {/* Ultra-subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
    );
}

