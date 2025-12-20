/**
 * Demo Pages Common JavaScript
 * Utility functions for demo pages
 */

// Copy code to clipboard
function setupCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.className = 'code-copy-btn';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            background: #374151;
            color: #f9fafb;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
        `;

        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Initialize demo features
document.addEventListener('DOMContentLoaded', () => {
    setupCodeCopy();
});
