// Remove elements matching selector
export function removeElement(selector) {
    document.querySelectorAll(selector).forEach(el => el.remove());
}

// Replace elements with new HTML
export function replaceElement(selector, newHtml) {
    document.querySelectorAll(selector).forEach(el => {
        const temp = document.createElement('div');
        temp.innerHTML = newHtml;
        el.replaceWith(temp.firstElementChild);
    });
}

// Insert element before/after/in specific target
export function insertElement(targetSelector, position, elementHtml) {
    const targets = document.querySelectorAll(targetSelector);
    targets.forEach(target => {
        target.insertAdjacentHTML(positionMap(position), elementHtml);
    });
}

// Replace text content
export function alterContent(oldVal, newVal) {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        node.nodeValue = node.nodeValue.replace(new RegExp(oldVal, 'g'), newVal);
    }
}

// Map custom position to insertAdjacentHTML keyword
function positionMap(pos) {
    switch (pos) {
        case 'before': return 'beforebegin';
        case 'after': return 'afterend';
        case 'start': return 'afterbegin';
        case 'end': return 'beforeend';
        default: return 'beforeend';
    }
}