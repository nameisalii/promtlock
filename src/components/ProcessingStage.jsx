import React, { useEffect, useState } from 'react';

const LOGS = [
    "Initializing lexical analysis...",
    "Parsing 5 input sources...",
    "Building dependency graph...",
    "Estimating entropy per section...",
    "Calculating token density...",
    "Applying heuristic model: DEBUG...",
    "Pruning low-value stack frames...",
    "Compressing whitespace...",
    "Optimizing for 4096 token window...",
    "Verifying deterministic output...",
    "Finalizing Prompt Pack..."
];

export default function ProcessingStage({ onComplete }) {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let delay = 0;

        // Add logs one by one
        LOGS.forEach((log, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines(prev => [...prev, { text: log, id: index, time: (delay / 1000).toFixed(2) }]);
                setProgress(((index + 1) / LOGS.length) * 100);

                if (index === LOGS.length - 1) {
                    setTimeout(onComplete, 500);
                }
            }, delay);
        });

    }, [onComplete]);

    return (
        <div className="stage-container items-center justify-center">
            <div className="terminal-window">

                <div className="scan-overlay"></div>

                {/* Header */}
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="text-xs font-mono text-secondary">compiler.exe — processing</div>
                </div>

                {/* Terminal Body */}
                <div className="terminal-body custom-scrollbar">
                    {/* Cursor */}
                    <div className="flex items-center gap-2 text-accent-emerald mt-2">
                        <span>➜</span>
                        <span className="animate-pulse">_</span>
                    </div>

                    {[...lines].reverse().map((line) => (
                        <div key={line.id} className="mb-1 text-secondary">
                            <span className="text-tertiary mr-2">[{line.time}s]</span>
                            <span className={line.id === LOGS.length - 1 ? 'text-primary' : ''}>
                                {line.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-surface w-full bg-[#333]">
                    <div
                        className="h-full bg-accent-blue transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
