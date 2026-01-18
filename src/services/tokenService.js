import { getEncoding } from 'js-tiktoken';

// Initialize tokenizer singleton
const enc = getEncoding("cl100k_base"); // Standard for GPT-4 / GPT-3.5-Turbo

/**
 * Service to handle token counting.
 * Uses js-tiktoken for 100% accurate, local, zero-latency counting.
 */
export const TokenService = {

    /**
     * Count tokens for a file.
     * Performs actual tokenization using cl100k_base encoding.
     */
    countTokens: async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    // Actual counting
                    const tokens = enc.encode(content);
                    resolve(tokens.length);
                } catch (error) {
                    console.error("Tokenization failed", error);
                    // Fallback heuristic if binary/unreadable
                    resolve(Math.ceil(file.size / 4));
                }
            };

            reader.onerror = () => {
                reject(new Error("File reading failed"));
            };

            // Read as text to count tokens
            reader.readAsText(file);
        });
    },

    /**
     * Process a batch of files
     */
    processFiles: async (files) => {
        const promises = files.map(async (file) => {
            // Artificial delay for UI "feel" only if it's too fast (optional)
            const [tokens] = await Promise.all([
                TokenService.countTokens(file),
                new Promise(r => setTimeout(r, 150)) // 150ms minimum for UX
            ]);

            return {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: (file.size / 1024).toFixed(1) + 'KB',
                type: TokenService.detectType(file.name),
                tokens: tokens
            };
        });

        return Promise.all(promises);
    },

    detectType: (name) => {
        if (name.endsWith('.md')) return 'DOCS';
        if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.py') || name.endsWith('.jsx') || name.endsWith('.tsx')) return 'CODE';
        if (name.includes('log')) return 'LOGS';
        return 'TEXT';
    }
};
