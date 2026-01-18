import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, RefreshCw, BarChart2, Info, ArrowRight } from 'lucide-react';

const MOCK_PROMPT = `--- SYSTEM ---
You are a senior specialized engineer.
Task Context: DEBUGGING
Constraint: STRICT_2K

--- CONTEXT ---
File: src/auth/LoginController.ts
Lines: 42-158 (Focused on Error Handling)
...
   try {
     await authProvider.validate(token);
   } catch (e) {
     logger.error('Auth failed', { error: e.message });
     // CRITICAL: Retry logic missing here
     throw new AuthError(e);
   }
...

--- LOGS ---
[ERROR] 2024-03-15 14:22:10 - Auth failed - Token expired
[ERROR] 2024-03-15 14:22:11 - Auth failed - Token expired
[WARN]  Retry limit reached for user_id: 8492

--- TASK ---
Analyze the error handling flow above.
Why is the retry logic not triggering for 'Token expired' errors?
Propose a fix that fits within the current try/catch block.
`;

export default function ResultStage({ config, onReset }) {
    const [copied, setCopied] = useState(false);
    const [expandedSection, setExpandedSection] = useState('dropped');

    const handleCopy = () => {
        navigator.clipboard.writeText(MOCK_PROMPT);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const reduction = 76; // 76% reduction
    const finalTokens = config.budget - 3; // e.g., 2045 / 2048

    return (
        <div className="result-split animate-fade-in bg-bg-space">

            {/* LEFT PANEL - PROMPT PACK */}
            <div className="result-left flex flex-col min-w-0 h-full">
                {/* Toolbar */}
                <div className="result-toolbar">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="font-mono text-sm font-medium text-primary tracking-tight">PROMPT_PACK_GENERATED</span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`
               btn gap-2 font-mono text-xs transition-all duration-300
               ${copied ? 'bg-accent-emerald border-accent-emerald text-white' : 'btn-primary'}
             `}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'COPIED_TO_CLIPBOARD' : 'COPY_PACK'}
                    </button>
                </div>

                {/* Editor Area */}
                <div className="result-editor custom-scrollbar">
                    <div className="line-numbers">
                        {Array.from({ length: 20 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    <pre className="code-content">
                        {MOCK_PROMPT.split('\n').map((line, i) => (
                            <div key={i} className={line.startsWith('---') ? 'text-accent-blue font-bold mt-4 mb-2' : ''}>
                                {line}
                            </div>
                        ))}
                    </pre>
                </div>
            </div>

            {/* RIGHT PANEL - METRICS & TRANSPARENCY */}
            <div className="result-right custom-scrollbar">

                {/* Top Metric Card */}
                <div className="metric-panel">
                    <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Efficiency Metrics</h3>

                    <div className="flex items-end justify-between mb-2">
                        <span className="text-3xl font-mono text-primary font-bold tracking-tighter">
                            {finalTokens} <span className="text-lg text-tertiary font-normal">/ {config.budget}</span>
                        </span>
                        <div className="text-right">
                            <div className="text-xs text-secondary mb-0.5">Reduction</div>
                            <div className="text-accent-emerald font-mono font-bold">-{reduction}%</div>
                        </div>
                    </div>

                    {/* Gauge */}
                    <div className="metric-gauge-container">
                        <div className="bg-accent-emerald h-full" style={{ width: '85%' }} title="High Value Signal"></div>
                        <div className="bg-accent-amber h-full" style={{ width: '10%' }} title="Context"></div>
                        <div className="bg-bg-space h-full" style={{ width: '5%' }} title="Space"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-tertiary font-mono uppercase">
                        <span>Signal</span>
                        <span>Context</span>
                        <span>Free</span>
                    </div>
                </div>

                {/* Context Verification */}
                <div className="metric-panel">
                    <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Context Retention</h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-primary">
                                <Check size={14} className="text-accent-emerald" />
                                <span>Stack Traces</span>
                            </div>
                            <span className="text-xs text-accent-emerald font-mono">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-primary">
                                <Check size={14} className="text-accent-emerald" />
                                <span>Error Logs</span>
                            </div>
                            <span className="text-xs text-accent-emerald font-mono">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Info size={14} className="text-accent-amber" />
                                <span>Boilerplate Code</span>
                            </div>
                            <span className="text-xs text-accent-amber font-mono">TRIMMED</span>
                        </div>
                    </div>
                </div>

                {/* Dropped Context - The "Why" */}
                <div className="flex-1 p-6">
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'dropped' ? null : 'dropped')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <h3 className="text-xs font-mono text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">Dropped Items Audit</h3>
                        {expandedSection === 'dropped' ? <ChevronDown size={14} className="text-secondary" /> : <ChevronRight size={14} className="text-secondary" />}
                    </button>

                    {expandedSection === 'dropped' && (
                        <div className="dropped-items-list">
                            <div className="text-sm">
                                <div className="text-accent-rose font-mono text-xs mb-1">src/assets/images/*</div>
                                <div className="text-secondary text-xs">Binary files irrelevant to text analysis.</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-accent-rose font-mono text-xs mb-1">node_modules/**</div>
                                <div className="text-secondary text-xs">Dependency source excluded (Standard Policy).</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-accent-rose font-mono text-xs mb-1">README.md:94-204</div>
                                <div className="text-secondary text-xs">Contributor guidelines irrelevant to DEBUG task.</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 mt-auto">
                    <button
                        onClick={onReset}
                        className="w-full btn border-text-tertiary text-secondary hover:text-primary"
                    >
                        <RefreshCw size={14} /> START NEW PACK
                    </button>
                </div>

            </div>
        </div>
    );
}
