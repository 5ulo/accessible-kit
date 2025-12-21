/**
 * a11y-kit
 * Lightweight, accessible UI component library with full ARIA support
 *
 * @version 1.0.4
 * @license MIT
 */

// Export all components with both full and short aliases
export { AccessibleDropdown, Dropdown, initDropdowns } from './a11y-dropdown.js';
export { AccessibleTabs, Tabs, initTabs } from './a11y-tabs.js';
export { AccessibleOffcanvas, Offcanvas, initOffcanvas } from './a11y-offcanvas.js';
export { AccessibleModal, Modal, initModals } from './a11y-modal.js';
export { AccessibleCollapse, Collapse, initCollapses, AccessibleAccordion, Accordion, initAccordions } from './a11y-accordion.js';

/**
 * Initialize all components at once
 * Convenient helper for manually initializing all a11y-kit components
 */
export function initAll() {
    const instances = {
        dropdowns: initDropdowns(),
        tabs: initTabs(),
        offcanvas: initOffcanvas(),
        modals: initModals(),
        collapses: initCollapses(),
        accordions: initAccordions()
    };

    return instances;
}
