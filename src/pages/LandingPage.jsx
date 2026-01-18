import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Terminal,
    Cpu,
    ShieldCheck,
    Zap,
    ArrowRight,
    Code2,
    Lock,
    Activity,
    DollarSign,
    Clock,
    FileCode,
    Bug,
    Wrench,
    BookOpen,
    Layers,
    Search,
    Scale,
    CheckCircle2,
    ChevronDown,
    RefreshCw,
    FileCheck,
    Database
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleLaunch = () => navigate('/app');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="landing-page">
            <div className="landing-bg-top" />
            <div className="landing-bg-bottom" />

            <nav className="landing-nav">
                <div className="flex items-center gap-2">
                    <div className="landing-logo-box">
                        <Lock className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">BudgetLock</span>
                </div>
                <button onClick={handleLaunch} className="btn btn-primary">
                    Launch Component <ArrowRight className="w-4 h-4" />
                </button>
            </nav>

            <header className="landing-hero">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="version-pill">
                        <span className="pulse-dot" />
                        V1.0 BETA NOW AVAILABLE
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title">
                        Stop Guessing. <br />
                        <span className="text-accent-blue">Start Engineering.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-subtitle">
                        The first professional compiler for LLM prompts. Optimizing token usage,
                        enforcing strict schemas, and ensuring deterministic outputs.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-actions">
                        <button onClick={handleLaunch} className="btn-hero-primary">
                            Start Optimizing <Zap className="w-4 h-4" />
                        </button>
                        <button className="btn-hero-secondary">
                            <Code2 className="w-4 h-4" /> Read Documentation
                        </button>
                    </motion.div>
                </motion.div>
            </header>

            {/* Trusted By Section - Logos */}
            {/* Trusted By Section - Logos */}
            {/* Trusted By Section - Logos (3 Bigger Logos) */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="trusted-by-section"
            >
                <div className="logos-container" style={{ gap: '6rem' }}>
                    {/* The Token Company - BIGGER */}
                    <div className="partner-logo" title="The Token Company" style={{ transform: 'scale(1.2)' }}>
                        <svg viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text x="120" y="28" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="22" textAnchor="middle">The Token Company</text>
                        </svg>
                    </div>

                    {/* Arize - BIGGER */}
                    <div className="partner-logo" title="Arize AI" style={{ transform: 'scale(1.5)' }}>
                        <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px' }}>
                            <path d="M10 30L20 10L30 30H25L20 20L15 30H10Z" fill="#A855F7" />
                            <text x="35" y="28" fill="#A855F7" fontFamily="sans-serif" fontWeight="bold" fontSize="22">arize</text>
                        </svg>
                    </div>

                    {/* LeanMCP - BIGGER */}
                    <div className="partner-logo" title="LeanMCP" style={{ transform: 'scale(1.2)' }}>
                        <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5" width="30" height="30" rx="6" fill="#E5E5E5" />
                            <path d="M14 15V25" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                            <path d="M20 18V25" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                            <path d="M26 15V25" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                            <text x="45" y="28" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="22">LeanMCP</text>
                        </svg>
                    </div>
                </div>
            </motion.section>

            <ImpactGraphSection />

            {/* Integration Cards */}
            <section className="integration-section">
                <div className="integration-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="integration-card"
                    >
                        <RefreshCw className="w-12 h-12 text-accent-blue mb-4" />
                        <h3 className="text-xl font-bold text-primary mb-3">
                            Integrates with your framework
                        </h3>
                        <p className="text-secondary">
                            Next.js, Express, Hono, and more...
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="integration-card"
                    >
                        <img src="/placeholder-logo.svg" className="w-12 h-12 text-accent-emerald mb-4 opacity-0" alt="" /> {/* Spacer */}
                        <FileCheck className="w-12 h-12 text-accent-emerald mb-4 absolute" style={{ top: '3rem' }} />
                        <h3 className="text-xl font-bold text-primary mb-3">
                            Control your source code
                        </h3>
                        <p className="text-secondary">
                            BudgetLock is fully open-source under the Apache 2.0 license
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tracing Section */}
            <TracingSection />

            {/* Built for Heavy Construction Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Built for Heavy Construction</h2>
                    <p className="section-subtitle">
                        Your prompts aren't just text. They are software specs. BudgetLock handles the entire lifecycle.
                    </p>
                </div>
                <div className="features-grid six-grid">
                    <FeatureCard
                        icon={<Layers className="w-6 h-6" />}
                        title="Big Files Support"
                        description="Upload massive context files. We handle chunking, vectorization, and relevance filtering automatically."
                        color="blue"
                    />
                    <FeatureCard
                        icon={<FileCode className="w-6 h-6" />}
                        title="Coding Assistance"
                        description="Specialized processing for syntax highlighting and reduced hallucination in generated code."
                        color="purple"
                    />
                    <FeatureCard
                        icon={<Bug className="w-6 h-6" />}
                        title="Deep Debugging"
                        description="Analyze stack traces and logs to pinpoint root causes faster than any human observer."
                        color="rose"
                    />
                    <FeatureCard
                        icon={<Search className="w-6 h-6" />}
                        title="Code Review"
                        description="Agentic diff review that flags security vulnerabilities and style violations before merge."
                        color="emerald"
                    />
                    <FeatureCard
                        icon={<Wrench className="w-6 h-6" />}
                        title="Build & Config"
                        description="Fix webpack, vite, and docker configurations by analyzing dependence graphs."
                        color="amber"
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-6 h-6" />}
                        title="Documentation"
                        description="Auto-generate JSDoc, Readmes, and API references from your raw source code."
                        color="cyan"
                    />
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-tertiary rounded-md flex items-center justify-center">
                            <Lock className="w-3 h-3 text-bg-space" />
                        </div>
                        <span className="text-secondary font-medium">BudgetLock Inc.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// ImpactGraphSection with stats embedded and PERMANENT lock
const ImpactGraphSection = () => {
    const graphRef = useRef(null);
    const [mouseProgress, setMouseProgress] = useState(0.5);
    const [isHovering, setIsHovering] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const handleMouseMove = (e) => {
        if (!graphRef.current) return;

        // If locked, do not allow it to go down.
        if (isLocked) return;

        const rect = graphRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = Math.max(0, Math.min(x / rect.width, 1));

        // Lock at top
        if (progress >= 0.98) {
            setMouseProgress(1);
            setIsLocked(true);
        } else {
            setMouseProgress(progress);
        }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        if (!isLocked) {
            setIsHovering(false);
            setMouseProgress(0.5);
        }
    };

    const savings = isLocked ? 40 : Math.round(mouseProgress * 40);
    const speed = isLocked ? "2.5" : (1 + mouseProgress * 1.5).toFixed(1);
    const determinism = isLocked ? 100 : Math.round(mouseProgress * 100);
    const accuracy = isLocked ? 99 : Math.round(50 + mouseProgress * 49);

    return (
        <section className="impact-section">
            <div className="impact-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Measure Your Velocity</h2>
                    <p className="section-subtitle">
                        {isLocked ? "Optimization Complete." : "Move your cursor to optimize."}
                    </p>
                </motion.div>

                <div className="impact-graph-split">
                    {/* Left Panel - Bigger & More Items */}
                    <div className="impact-left-panel">
                        <div className="left-panel-label">
                            <Scale className="w-5 h-5" /> INTELLIGENT ARBITRATION
                        </div>
                        <h3 className="left-panel-title">
                            You set the budget.<br />
                            <span className="text-accent-purple">We choose the writer.</span>
                        </h3>

                        <div className="model-tiers mt-10">
                            <div className="model-tier">
                                <span className="tier-label">HIGH</span>
                                <span className="tier-models">O1 / Opus</span>
                            </div>
                            <div className="model-tier">
                                <span className="tier-label">MEDIUM</span>
                                <span className="tier-models">Sonnet / GPT-4o</span>
                            </div>
                            <div className="model-tier">
                                <span className="tier-label">LOW</span>
                                <span className="tier-models">Haiku / Flash</span>
                            </div>
                            <div className="model-tier">
                                <span className="tier-label">BATCH</span>
                                <span className="tier-models">Deepseek / Llama</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Graph (Longer & Synced) */}
                    <div
                        ref={graphRef}
                        className="impact-graph-right"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Stats Overlay - 4 Cards Under Graph Lines */}
                        <div className="graph-overlay-stats">
                            <div className="overlay-stat-card">
                                <span className="overlay-stat-value text-emerald-400">{savings}%</span>
                                <span className="overlay-stat-label">Savings</span>
                            </div>
                            <div className="overlay-stat-card">
                                <span className="overlay-stat-value text-blue-400">{speed}x</span>
                                <span className="overlay-stat-label">Faster</span>
                            </div>
                            <div className="overlay-stat-card">
                                <span className="overlay-stat-value text-purple-400">{determinism}%</span>
                                <span className="overlay-stat-label">Determinism</span>
                            </div>
                        </div>

                        <svg className="graph-svg" viewBox="0 0 900 450" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="org" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#D97706" stopOpacity="1" />
                                </linearGradient>
                                <linearGradient id="grn" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                                </linearGradient>
                            </defs>

                            {/* Unoptimized Line - Synced Animation & Longer */}
                            <motion.path
                                d="M 50 350 L 150 350 L 150 330 L 250 330 L 250 320 L 350 320 L 350 300 L 450 300 L 450 280 L 550 280 L 550 270 L 750 270 L 750 260 L 850 260"
                                fill="none"
                                stroke="url(#org)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ pathLength: mouseProgress }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                            <motion.circle
                                cx="850" cy="260" r="6" fill="#D97706"
                                animate={{
                                    opacity: mouseProgress > 0.95 ? 1 : 0,
                                    scale: mouseProgress > 0.95 ? 1 : 0
                                }}
                            />
                            <motion.text
                                x="780" y="250" fill="#D97706" fontSize="11"
                                animate={{ opacity: mouseProgress > 0.95 ? 0.8 : 0 }}
                            >
                                UNOPTIMIZED
                            </motion.text>

                            {/* Optimized Line - Synced Animation & Longer */}
                            <motion.path
                                d="M 50 370 L 150 370 L 150 310 L 250 310 L 250 250 L 350 250 L 350 190 L 450 190 L 450 130 L 550 130 L 550 100 L 750 100 L 750 70 L 850 70"
                                fill="none"
                                stroke="url(#grn)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ pathLength: mouseProgress }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />

                            {/* Ball at end */}
                            <motion.circle
                                cx="850"
                                cy="70"
                                r="8"
                                fill="#10B981"
                                animate={{
                                    scale: mouseProgress > 0.95 ? 1 : 0,
                                    opacity: mouseProgress > 0.95 ? 1 : 0
                                }}
                            >
                                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                            </motion.circle>

                            <motion.text
                                x="780" y="60" fill="#10B981" fontSize="11" fontFamily="monospace"
                                animate={{ opacity: mouseProgress > 0.95 ? 1 : 0 }}
                            >
                                BUDGETLOCK
                            </motion.text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Tracing Section (White Numbers)
const TracingSection = () => {
    const traces = [
        { name: 'Enterprise search agent', time: '5.53 ms', width: 95 },
        { name: 'Start Trace', time: '2.86 ms', width: 68 },
        { name: 'Initialize Agent', time: '0.14 ms', width: 15 },
        { name: 'Load Memory', time: '0.30 ms', width: 25 },
        { name: 'Set Objective', time: '0.9 ms', width: 12 }
    ];

    return (
        <section className="tracing-section">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Built-in observability</h2>
                    <p className="section-subtitle">View traces and logs for your agents</p>
                </motion.div>

                <div className="trace-container">
                    {traces.map((trace, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="trace-item"
                        >
                            <div className="trace-info">
                                {i === 0 && <CheckCircle2 className="w-4 h-4 text-white" />}
                                {i > 0 && <ChevronDown className="w-4 h-4 text-secondary opacity-0" />}
                                <span className="trace-name">{trace.name}</span>
                            </div>
                            <div className="trace-bar-container">
                                <motion.div
                                    className="trace-bar"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${trace.width}%` }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                />
                            </div>
                            <span className="trace-time">{trace.time}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`feature-card ${color}`}
    >
        <div className="feature-icon-box">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </motion.div>
);

export default LandingPage;
