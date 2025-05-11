import { fetchConfiguration, applyConfigurations } from './lib/configManager.js';

// Entry point: Fetch and apply config based on host, URL, or page
async function initDynamicDOMUpdate() {
    const page = document.body.dataset.page || 'default';
    const url = window.location.pathname;
    const host = window.location.hostname;

    try {
        const configIds = await fetchConfiguration(host, url, page);
        for (const id of configIds) {
            const config = await fetch(`/api/configuration/${id}`).then(res => res.json());
            applyConfigurations(config);
        }
    } catch (error) {
        console.error('Failed to apply configuration:', error);
    }
}

window.addEventListener('DOMContentLoaded', initDynamicDOMUpdate);