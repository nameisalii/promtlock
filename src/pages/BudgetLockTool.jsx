import React, { useState } from 'react';
import InputStage from '../components/InputStage';
import ConfigStage from '../components/ConfigStage';
import ProcessingStage from '../components/ProcessingStage';
import ResultStage from '../components/ResultStage';

const STAGES = {
    INPUT: 'INPUT',
    CONFIG: 'CONFIG',
    PROCESSING: 'PROCESSING',
    RESULT: 'RESULT'
};

function BudgetLockTool() {
    const [stage, setStage] = useState(STAGES.INPUT);
    const [files, setFiles] = useState([]);
    const [config, setConfig] = useState({
        budget: 4096,
        mode: 'debug',
        strict: true
    });

    const handleFilesAdded = (newFiles) => {
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleCompile = () => {
        setStage(STAGES.PROCESSING);
    };

    const handleProcessingComplete = () => {
        setStage(STAGES.RESULT);
    };

    const handleReset = () => {
        setFiles([]);
        setStage(STAGES.INPUT);
    };

    return (
        <div className="app-layout">
            {/* Top Bar for Global Context */}
            <div className="app-top-accent"></div>

            <main className="app-main">
                {stage === STAGES.INPUT && (
                    <InputStage
                        files={files}
                        onFilesAdded={handleFilesAdded}
                        onRemoveFile={handleRemoveFile}
                        onContinue={() => setStage(STAGES.CONFIG)}
                    />
                )}

                {stage === STAGES.CONFIG && (
                    <ConfigStage
                        config={config}
                        setConfig={setConfig}
                        onBack={() => setStage(STAGES.INPUT)}
                        onCompile={handleCompile}
                    />
                )}

                {stage === STAGES.PROCESSING && (
                    <ProcessingStage onComplete={handleProcessingComplete} />
                )}

                {stage === STAGES.RESULT && (
                    <ResultStage config={config} onReset={handleReset} />
                )}
            </main>
        </div>
    );
}

export default BudgetLockTool;
