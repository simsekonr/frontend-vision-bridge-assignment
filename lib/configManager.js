import { removeElement, replaceElement, insertElement, alterContent } from './domActions.js';

// Get config IDs by querying /api/specific with host, url, and page
export async function fetchConfiguration(host, url, page) {
    const query = new URLSearchParams({ host, url, page }).toString();
    const response = await fetch(`/api/specific?${query}`);
    const data = await response.json();

    const pageIds = data?.datasource?.pages?.[page] || [];
    const urlIds = data?.datasource?.urls?.[url] || [];
    const hostIds = data?.datasource?.hosts?.[host] || [];

    return [...new Set([...pageIds, ...urlIds, ...hostIds])];
}

// Apply a set of actions to the DOM
export function applyConfigurations(config) {
    config.actions.forEach(action => {
        switch (action.type) {
            case 'remove':
                removeElement(action.selector);
                break;
            case 'replace':
                replaceElement(action.selector, action.newElement);
                break;
            case 'insert':
                insertElement(action.target, action.position, action.element);
                break;
            case 'alter':
                alterContent(action.oldValue, action.newValue);
                break;
            default:
                console.warn('Unsupported action type:', action.type);
        }
    });
}