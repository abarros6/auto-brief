export const generateSummary = async (decision) => {
    const response = await fetch('/api/generate-summary', {
        method: 'POST',
        body: decision,
    });
    const data = await response.json();
    return data;
}