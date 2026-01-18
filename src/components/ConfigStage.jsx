import React from 'react';
import { Shield, Zap, Book, Search, Lock, Bug, Code2, Hammer, FileText } from 'lucide-react';

const BUDGETS = [
    { value: 2048, label: '2k', sub: 'Strict' },
    { value: 4096, label: '4k', sub: 'Standard' },
    { value: 8192, label: '8k', sub: 'Extended' }
];

const MODES = [
    { id: 'debug', label: 'Debug', icon: Bug, desc: 'Prioritizes stack traces, logs, and recent changes.' },
    { id: 'review', label: 'Code Review', icon: Code2, desc: 'Prioritizes diffs, structure, and type definitions.' },
    { id: 'build', label: 'Build / Config', icon: Hammer, desc: 'Prioritizes config files, dependencies, and environment.' },
    { id: 'docs', label: 'Documentation', icon: FileText, desc: 'Prioritizes READMEs, docstrings, and comments.' }
];

export default function ConfigStage({ config, setConfig, onBack, onCompile }) {
    return (
        <div className="stage-container animate-fade-in justify-center max-w-2xl">
            <header className="mb-8 text-center">
                <h1 className="text-2xl font-mono mb-2 text-primary">COMPILER_CONFIG</h1>
                <p className="text-secondary text-sm">Define constraints for the token packing algorithm.</p>
            </header>

            <div className="flex flex-col gap-6">

                {/* Token Budget */}
                <section>
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest mb-3 block">Token Budget</label>
                    <div className="budget-grid">
                        {BUDGETS.map(b => (
                            <button
                                key={b.value}
                                onClick={() => setConfig({ ...config, budget: b.value })}
                                className={`budget-card ${config.budget === b.value ? 'active' : ''}`}
                            >
                                <span className="text-2xl font-mono font-bold">{b.label}</span>
                                <span className="text-[10px] uppercase tracking-wider opacity-60">
                                    {b.sub}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Task Mode */}
                <section>
                    <label className="text-xs font-mono text-tertiary uppercase tracking-widest mb-3 block">Optimization Mode</label>
                    <div className="mode-list">
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setConfig({ ...config, mode: m.id })}
                                className={`mode-item ${config.mode === m.id ? 'active' : ''}`}
                            >
                                <div className="mode-icon">
                                    <m.icon size={20} />
                                </div>
                                <div>
                                    <div className={`font-mono text-sm mb-0.5 ${config.mode === m.id ? 'text-accent-blue font-bold' : 'text-primary'}`}>{m.label}</div>
                                    <div className="text-xs text-secondary">{m.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Strict Mode Toggle */}
                <section className="flex items-center justify-between p-4 border border-border-subtle rounded-lg bg-[#0A0A0A]">
                    <div className="flex items-center gap-3">
                        <Lock size={16} className="text-accent-emerald" />
                        <div>
                            <div className="text-sm font-mono text-primary">Zero-Truncation Guarantee</div>
                            <div className="text-xs text-secondary">Ensure output fits exactly without overflow.</div>
                        </div>
                    </div>

                    <div
                        className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${config.strict ? 'bg-accent-emerald' : 'bg-surface'}`}
                        style={{ backgroundColor: config.strict ? 'var(--accent-emerald)' : '#333' }}
                        onClick={() => setConfig({ ...config, strict: !config.strict })}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${config.strict ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                </section>

            </div>

            <div className="mt-10 flex gap-4">
                <button
                    onClick={onBack}
                    className="btn flex-1 text-secondary hover:text-primary"
                >
                    BACK
                </button>
                <button
                    onClick={onCompile}
                    className="btn btn-primary flex-[2] h-12 text-base"
                >
                    COMPILE PROMPT PACK
                </button>
            </div>
        </div>
    );
}
