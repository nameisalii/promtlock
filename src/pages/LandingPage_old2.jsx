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
    FileCheck
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

            <ImpactGraphSection />

            {/* Integration & Open Source Cards */}
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
                            Integrates with your framework or server
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
                        <FileCheck className="w-12 h-12 text-accent-emerald mb-4" />
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

             <section className="features-section">
                 <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-2xl font-bold text-primary">Core Mechanics</h2>
                 </div>
                <div className="features-grid">
                    <FeatureCard
                        icon={<Terminal className="w-6 h-6 text-accent-purple" />}
                        title="Semantic Minification"
                        description="Reduce token count by up to 40% without losing semantic meaning or context."
                    />

                    <FeatureCard
                        icon={<Cpu className="w-6 h-6 text-accent-blue" />}
                        title="Budget Enforcement"
                        description="Define strict token budgets per section. We ensure you never overflow context windows."
                    />

                    <FeatureCard
                        icon={<ShieldCheck className="w-6 h-6 text-accent-emerald" />}
                        title="Schema Validation"
                        description="Validate variable injection against strict types before sending a single request."
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
                    <div className="text-tertiary text-sm">
                        © 2026 BudgetLock. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Impact Graph with Sticky Behavior
const ImpactGraphSection = () => {
    const graphRef = useRef(null);
    const [mouseProgress, setMouseProgress] = useState(0.5);
    const [isHovering, setIsHovering] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const handleMouseMove = (e) => {
        if (!graphRef.current) return;
        
        const rect = graphRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = Math.max(0, Math.min(x / rect.width, 1));
        
        // Lock at 100% when reaching 98%+
        if (progress >= 0.98) {
            setMouseProgress(1);
            setIsLocked(true);
        } 
        // Only update if not locked, or if moving back left
        else if (!isLocked || progress < mouseProgress) {
            setMouseProgress(progress);
            if (progress < 0.95) {
                setIsLocked(false);
            }
        }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setMouseProgress(0.5);
        setIsLocked(false);
    };

    const savings = Math.round(mouseProgress * 40);
    const speed = (1 + mouseProgress * 1.5).toFixed(1);
    const determinism = Math.round(mouseProgress * 100);

    return (
        <section className="impact-section">
            <div className="impact-container">
                <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                     className="impact-header"
                >
                    <h2 className="impact-title">Measure Your Velocity</h2>
                    <p className="impact-sub">
                        Move your cursor left to right to see the optimization impact.
                    </p>
                </motion.div>

                <div className="impact-graph-split">
                    {/* Left Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="impact-left-panel"
                    >
                        <div className="left-panel-label">
                            <Scale className="w-4 h-4" /> INTELLIGENT ARBITRATION
                        </div>
                        <h3 className="left-panel-title">
                            You set the budget.<br />
                            <span className="text-accent-purple">We choose the writer.</span>
                        </h3>
                        <p className="left-panel-desc">
                            Don't overpay for simple tasks. Our evolutionary compiler analyzes 
                            your prompt's complexity and automatically routes it to the most 
                            cost-effective model that meets your strict quality threshold.
                        </p>

                        <div className="model-tiers">
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
                        </div>
                    </motion.div>

                    {/* Right Panel - Graph */}
                    <div 
                        ref={graphRef}
                        className="impact-graph-right"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <svg className="graph-svg" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="unoptGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#D97706" stopOpacity="1" />
                                </linearGradient>
                                <linearGradient id="optimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            
                            <motion.path
                                d="M 50 320 L 140 320 L 140 300 L 230 300 L 230 290 L 320 290 L 320 275 L 410 275 L 410 260 L 500 260 L 500 250 L 590 250 L 590 240 L 680 240 L 680 230 L 820 230"
                                fill="none"
                                stroke="url(#unoptGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.7 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                            />
                            
                            <motion.circle
                                cx="820"
                                cy="230"
                                r="6"
                                fill="#D97706"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.7, duration: 0.3 }}
                            >
                                <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                            </motion.circle>

                            <motion.path
                                d="M 50 340 L 140 340 L 140 280 L 230 280 L 230 220 L 320 220 L 320 160 L 410 160 L 410 120 L 500 120 L 500 90 L 590 90 L 590 65 L 680 65 L 680 45 L 820 45"
                                fill="none"
                                stroke="url(#optimGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{
                                    pathLength: mouseProgress,
                                    opacity: isHovering ? 1 : 0.3
                                }}
                                transition={{ duration: 0.1 }}
                            />

                            <motion.circle
                                cx="820"
                                cy="45"
                                r="7"
                                fill="#10B981"
                                animate={{ 
                                    scale: mouseProgress > 0.95 ? 1 : 0,
                                    opacity: mouseProgress > 0.95 ? 1 : 0
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite" />
                            </motion.circle>

                            <motion.text 
                                x="750" y="220" fill="#D97706" fontSize="11" fontFamily="monospace" opacity="0.9"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.9 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.8 }}
                            >
                                UNOPTIMIZED
                            </motion.text>
                            
                            <motion.text 
                                x="750" y="35" fill="#10B981" fontSize="11" fontFamily="monospace"
                                animate={{ opacity: mouseProgress > 0.5 ? 1 : 0.3 }}
                            >
                                BUDGETLOCK
                            </motion.text>

                            <motion.g animate={{ opacity: mouseProgress > 0.7 ? 1 : 0 }} transition={{ duration: 0.3 }}>
                                <rect x="280" y="10" width="180" height="60" rx="8" fill="#0A0A0A" stroke="#10B981" strokeWidth="1" opacity="0.95" />
                                <text x="300" y="30" fill="#10B981" fontSize="10" fontFamily="monospace">Throughput</text>
                                <text x="440" y="30" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="end">{Math.round(mouseProgress * 98)}%</text>
                                <text x="300" y="50" fill="#10B981" fontSize="10" fontFamily="monospace">Cost Reduction</text>
                                <text x="440" y="50" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="end">-{Math.round(mouseProgress * 40)}%</text>
                            </motion.g>
                        </svg>
                    </div>
                </div>

                <div className="stats-grid">
                    <AnimatedStatCard icon={<DollarSign className="w-5 h-5" />} label="Token Savings" value={`${savings}%`} color="emerald" delay={0} />
                    <AnimatedStatCard icon={<Clock className="w-5 h-5" />} label="Faster Iteration" value={`${speed}x`} color="blue" delay={0.1} />
                    <AnimatedStatCard icon={<Activity className="w-5 h-5" />} label="Deterministic" value={`${determinism}%`} color="purple" delay={0.2} />
                </div>
            </div>
        </section>
    );
};

// Tracing Section
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
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-primary mb-4">Built-in observability</h2>
                    <p className="text-secondary text-lg">View traces and logs for your agents</p>
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
                                <span className="trace-time">{trace.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AnimatedStatCard = ({ icon, label, value, color, delay }) => {
    const colors = {
        emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
        blue: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
        purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={`stat-card ${colors[color]}`}
        >
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </motion.div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div 
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        viewport={{ once: true }}
        className="feature-card group"
    >
        <div className="feature-icon-box group-hover:scale-110">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </motion.div>
);

export default LandingPage;
