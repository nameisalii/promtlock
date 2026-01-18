import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';
import { hasApiToken } from '../config';
import { TokenService } from '../services/tokenService';

export default function InputStage({ files, onFilesAdded, onRemoveFile, onContinue }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const totalTokens = files.reduce((acc, f) => acc + f.tokens, 0);
    const isOverLimit = totalTokens > 8192; // 8k context window + safety

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        await handleProcess(droppedFiles);
    };

    const handleFileSelect = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        await handleProcess(selectedFiles);
    };

    const handleProcess = async (newFiles) => {
        setIsProcessing(true);
        try {
            const processed = await TokenService.processFiles(newFiles);
            onFilesAdded(processed);
        } catch (error) {
            console.error("Failed to process files", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="stage-container animate-fade-in">
            <header className="stage-header">
                <div className="badget-text mb-2">
                    <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                    BudgetLock // Build v1.0.4 {hasApiToken() && <span className="text-accent-emerald ml-2" title="API Token Linked">• LINKED</span>}
                </div>
                <h2 className="text-2xl font-medium tracking-tight text-primary">Input Source</h2>
            </header>

            <div
                className={`input-zone ${isDragging ? 'dragging' : ''} ${files.length > 0 ? 'compact' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] flex items-center justify-center border border-subtle shadow-2xl">
                    <Upload size={24} className="text-secondary" />
                </div>
                <div className="text-center">
                    <p className="text-primary font-medium mb-1">Drag sources here or click to browse</p>
                    <p className="text-secondary text-sm mb-4">Supports plaintext, code, markdown, logs</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const demoFiles = [
                                { name: 'server_error.log', size: 1024 * 450, type: 'text/plain' },
                                { name: 'AuthController.ts', size: 1024 * 12, type: 'text/typescript' },
                                { name: 'README.md', size: 1024 * 5, type: 'text/markdown' }
                            ].map(f => new File(['x'.repeat(f.size)], f.name, { type: f.type }));
                            handleProcess(demoFiles);
                        }}
                        disabled={isProcessing}
                        className="btn text-xs font-mono text-accent-blue hover:text-accent-blue-dim disabled:opacity-50"
                    >
                        {isProcessing ? 'CALCULATING...' : '[LOAD_DEMO_DATASET]'}
                    </button>
                </div>
            </div>

            {files.length > 0 && (
                <div className="flex-1 mt-6 flex flex-col overflow-hidden min-h-0">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <span className="text-xs font-mono text-tertiary tracking-widest">MANIFEST_KERNEL</span>
                        <span className="text-xs font-mono text-tertiary">{files.length} FILES</span>
                    </div>
                    <div className="file-list custom-scrollbar">
                        {files.map(file => (
                            <div key={file.id} className="file-row group">
                                <div className="flex items-center gap-3">
                                    {file.type === 'CODE' ? <FileCode size={16} className="text-secondary" /> : <FileText size={16} className="text-secondary" />}
                                    <div className="flex flex-col">
                                        <span className="text-sm text-primary font-mono">{file.name}</span>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] text-tertiary">{file.size}</span>
                                            <span className="text-[10px] text-tertiary border border-subtle px-1 rounded bg-[#111]">{file.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-secondary">{file.tokens} tk</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onRemoveFile(file.id); }}
                                        className="text-tertiary hover:text-accent-rose transition-colors p-1"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer with token gauge */}
            <div className="mt-auto pt-6">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-secondary uppercase tracking-widest">Raw Token Load</span>
                        {isOverLimit && <span className="text-[10px] text-accent-rose bg-[rgba(239,68,68,0.1)] px-1 rounded border border-[rgba(239,68,68,0.2)]">OVERFLOW</span>}
                    </div>
                    <span className={`font-mono text-lg ${isOverLimit ? 'text-accent-rose' : 'text-primary'}`}>
                        {totalTokens.toLocaleString()} <span className="text-tertiary text-sm">/ 8,192</span>
                    </span>
                </div>

                <div className="h-1 bg-surface w-full rounded-full overflow-hidden mb-8 bg-[#222]">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${isOverLimit ? 'bg-accent-rose' : 'bg-primary'}`}
                        style={{ width: `${Math.min((totalTokens / 8192) * 100, 100)}%` }}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onContinue}
                        disabled={files.length === 0}
                        className="btn btn-primary h-10 px-6 font-mono tracking-tight text-sm"
                    >
                        INITIALIZE_COMPILER <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
