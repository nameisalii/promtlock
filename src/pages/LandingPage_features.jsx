            {/* Built for Heavy Construction Section */}
            <section className="features-section">
                 <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-4">Built for Heavy Construction</h2>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">
                        Your prompts aren't just text. They are software specs. BudgetLock handles the entire lifecycle.
                    </p>
                 </div>
                <div className="features-grid six-grid">
                    <FeatureCard
                        icon={<Layers className="w-6 h-6" />}
                        title="Big Files Support"
                        description="Upload massive context files. We handle chunking, vectorization, and relevance filtering automatically."
                        color="none"
                    />
                    <FeatureCard
                        icon={<FileCode className="w-6 h-6" />}
                        title="Coding Assistance"
                        description="Specialized processing for syntax highlighting and reduced hallucination in generated code."
                        color="blue"
                    />
                    <FeatureCard
                        icon={<Bug className="w-6 h-6" />}
                        title="Deep Debugging"
                        description="Analyze stack traces and logs to pinpoint root causes faster than any human observer."
                        color="none"
                    />
                    <FeatureCard
                        icon={<Search className="w-6 h-6" />}
                        title="Code Review"
                        description="Agentic diff review that flags security vulnerabilities and style violations before merge."
                        color="none"
                    />
                    <FeatureCard
                        icon={<Wrench className="w-6 h-6" />}
                        title="Build & Config"
                        description="Fix webpack, vite, and docker configurations by analyzing dependence graphs."
                        color="none"
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-6 h-6" />}
                        title="Documentation"
                        description="Auto-generate JSDoc, Readmes, and API references from your raw source code."
                        color="none"
                    />
                </div>
            </section>
