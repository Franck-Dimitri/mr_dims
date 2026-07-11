import React from 'react';
import { motion } from 'framer-motion';

export default function ConstructionBackground() {
    return (
        <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
            {/* Soft background color */}
            <div className="absolute inset-0 bg-blueprint-white dark:bg-blueprint-darkNight"></div>

            <svg className="absolute w-full h-full opacity-[0.2] dark:opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
                
                {/* Horizontal Top Alignment Line */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.1 }}
                    x1="0" y1="15vh" x2="100vw" y2="15vh" 
                    stroke="currentColor" strokeWidth="1" className="text-gray-500"
                />
                
                {/* Horizontal Bottom Alignment Line */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
                    x1="0" y1="85vh" x2="100vw" y2="85vh" 
                    stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-400"
                />

                {/* Vertical Left Blueprint Margin */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                    x1="5vw" y1="0" x2="5vw" y2="100vh" 
                    stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="text-blueprint-bluePrimary dark:text-blueprint-cyan"
                />

                {/* Vertical Right Sub-margin */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
                    x1="95vw" y1="0" x2="95vw" y2="100vh" 
                    stroke="currentColor" strokeWidth="1" className="text-gray-400"
                />

                {/* Secondary Vertical Line */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
                    x1="25vw" y1="0" x2="25vw" y2="100vh" 
                    stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700"
                />

                {/* Diagonal Architecture Cut */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.8 }}
                    x1="5vw" y1="95vh" x2="60vw" y2="15vh" 
                    stroke="currentColor" strokeWidth="1" className="text-gray-400"
                />
                
                {/* Secondary Diagonal */}
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
                    x1="25vw" y1="100vh" x2="95vw" y2="40vh" 
                    stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" className="text-gray-300 dark:text-gray-700"
                />

                {/* Construction Nodes at Intersections */}
                {[
                    { x: "5vw", y: "15vh" },
                    { x: "25vw", y: "15vh" },
                    { x: "95vw", y: "15vh" },
                    { x: "5vw", y: "85vh" },
                    { x: "95vw", y: "40vh" },
                ].map((point, index) => (
                    <motion.g 
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 + (index * 0.2) }}
                        className="text-blueprint-bluePrimary dark:text-blueprint-cyan"
                    >
                        {/* Target crosses */}
                        <line x1={`calc(${point.x} - 8px)`} y1={point.y} x2={`calc(${point.x} + 8px)`} y2={point.y} stroke="currentColor" strokeWidth="1.5" />
                        <line x1={point.x} y1={`calc(${point.y} - 8px)`} x2={point.x} y2={`calc(${point.y} + 8px)`} stroke="currentColor" strokeWidth="1.5" />
                        {/* Center dot */}
                        <circle cx={point.x} cy={point.y} r="2" fill="currentColor" />
                    </motion.g>
                ))}

                {/* Floating Architectural Data Annotations */}
                <motion.text 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1.5, delay: 2 }}
                    x="6vw" y="14vh" 
                    fill="currentColor" 
                    className="text-[10px] font-mono tracking-[0.2em] text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase font-bold"
                >
                    SEC: A-1 // ALIGNMENT VERIFIED
                </motion.text>
                
                <motion.text 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                    x="30vw" y="55vh" 
                    fill="currentColor" 
                    transform="rotate(-45, 30vw, 55vh)"
                    className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold"
                >
                    --- STRUCTURAL OFFSET RATIO 1.618 ---
                </motion.text>
                
                <motion.text 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 2.8 }}
                    x="85vw" y="87vh" 
                    fill="currentColor" 
                    className="text-[10px] font-mono tracking-widest text-gray-400 uppercase text-right"
                >
                    GRID_REF: 099.4X
                </motion.text>
            </svg>
        </div>
    );
}
