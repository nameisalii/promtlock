export const config = {
    apiToken: import.meta.env.VITE_API_TOKEN || '',
    // Add other config variables here
};

export const hasApiToken = () => !!config.apiToken;
