/**
 * Accessible Accordion/Collapse Component
 * Vanilla JS, a11y friendly, keyboard navigation
 * Follows WAI-ARIA Authoring Practices Guide for Accordion Pattern
 *
 * Two components:
 * - Collapse: Standalone collapse toggles (button controls panel via data-collapse-toggle)
 * - Accordion: Accordion groups with single/multiple expand support
 *
 * Features:
 * - Standalone collapse toggles (button controls panel via selector)
 * - Accordion groups (single/multiple expand)
 * - Expand/Collapse all functionality
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full ARIA support
 * - Dynamic text for show/hide states
 */

class AccessibleAccordion {
    constructor() {
        this.accordions = [];
        this.init();
    }

    init() {
        // Initialize standalone toggles (button with selector reference)
        this.initStandaloneToggles();

        // Initialize accordion groups (grouped items)
        this.initAccordionGroups();
    }

    // Standalone collapse/expand (Button + Panel(s) via CSS selector)
    initStandaloneToggles() {
        const toggleButtons = document.querySelectorAll('[data-collapse-toggle]');

        toggleButtons.forEach((button, buttonIndex) => {
            const selector = button.getAttribute('data-collapse-toggle');
            const panels = document.querySelectorAll(selector);

            if (panels.length === 0) {
                console.warn(`No panels found for selector "${selector}"`);
                return;
            }

            // Setup ARIA
            if (!button.id) button.id = `toggle-${buttonIndex}`;

            // Collect panel IDs for aria-controls
            const panelIds = [];
            panels.forEach((panel, panelIndex) => {
                if (!panel.id) {
                    panel.id = `panel-${buttonIndex}-${panelIndex}`;
                }
                panelIds.push(panel.id);
                panel.setAttribute('aria-labelledby', button.id);
                // Mark as collapse panel for CSS styling
                panel.setAttribute('data-collapse-panel', '');
                this.setPanelVisibility(panel, true);
            });

            // Set aria-controls with all panel IDs (space-separated)
            button.setAttribute('aria-controls', panelIds.join(' '));
            button.setAttribute('aria-expanded', 'false');

            // Set initial aria-label based on collapsed state
            this.updateButtonText(button, false);

            // Event listener
            button.addEventListener('click', () => {
                this.toggleStandalone(button, panels);
            });
        });
    }

    toggleStandalone(button, panels) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const newExpandedState = !isExpanded;

        button.setAttribute('aria-expanded', newExpandedState);

        // Toggle all matched panels
        panels.forEach(panel => {
            this.setPanelVisibility(panel, isExpanded);

            // Update aria-expanded on associated accordion triggers (if panel is part of accordion)
            const triggerId = panel.getAttribute('aria-labelledby');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if (trigger) {
                    trigger.setAttribute('aria-expanded', newExpandedState);
                    this.updateButtonText(trigger, newExpandedState);
                    this.updateToggleIcon(trigger, newExpandedState);
                }
            }
        });

        // Update button text and aria-label based on new state
        this.updateButtonText(button, newExpandedState);
    }

    // Accordion groups (multiple items in a group)
    initAccordionGroups() {
        const accordionGroups = document.querySelectorAll('[data-accordion]');

        accordionGroups.forEach((group, groupIndex) => {
            const allowMultiple = group.hasAttribute('data-accordion-multiple');
            const items = Array.from(group.querySelectorAll('[data-accordion-item]'));

            if (items.length === 0) return;

            const accordion = {
                element: group,
                allowMultiple,
                items: [],
                toggleButtons: []
            };

            // Setup expand/collapse all buttons
            this.setupGroupControls(group, groupIndex, accordion);

            // Setup each accordion item
            items.forEach((item, itemIndex) => {
                const trigger = item.querySelector('[data-accordion-trigger]');
                const panel = item.querySelector('[data-accordion-panel]');

                if (!trigger || !panel) {
                    console.warn('Accordion item missing trigger or panel');
                    return;
                }

                // Setup IDs and ARIA
                const triggerId = trigger.id || `accordion-${groupIndex}-trigger-${itemIndex}`;
                const panelId = panel.id || `accordion-${groupIndex}-panel-${itemIndex}`;

                trigger.id = triggerId;
                panel.id = panelId;
                trigger.setAttribute('aria-controls', panelId);
                trigger.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-labelledby', triggerId);
                panel.setAttribute('role', 'region');
                this.setPanelVisibility(panel, true);

                // Set initial aria-label based on collapsed state
                this.updateButtonText(trigger, false);

                // Store reference
                accordion.items.push({ trigger, panel, item });

                // Click event
                trigger.addEventListener('click', () => {
                    this.toggleAccordionItem(accordion, itemIndex);
                });

                // Keyboard navigation
                trigger.addEventListener('keydown', (e) => {
                    this.handleKeyboard(e, accordion, itemIndex);
                });
            });

            // Setup aria-controls for toggle buttons (after all items are added)
            this.setupToggleButtonsAriaControls(accordion);

            this.accordions.push(accordion);
        });
    }

    setupToggleButtonsAriaControls(accordion) {
        // Collect all panel IDs
        const panelIds = accordion.items.map(({ panel }) => panel.id);

        // Set aria-controls on all toggle buttons
        accordion.toggleButtons.forEach(toggleBtn => {
            toggleBtn.setAttribute('aria-controls', panelIds.join(' '));
        });
    }

    setupGroupControls(group, groupIndex, accordion) {
        // Check for expand/collapse all container
        const controlsTop = group.querySelector('[data-accordion-controls="top"]');
        const controlsBottom = group.querySelector('[data-accordion-controls="bottom"]');

        [controlsTop, controlsBottom].forEach(controls => {
            if (!controls) return;

            // Create toggle button if it doesn't exist
            let toggleBtn = controls.querySelector('[data-accordion-toggle-all]');

            if (!toggleBtn) {
                toggleBtn = this.createToggleAllButton(groupIndex);
                controls.appendChild(toggleBtn);
            }

            // Store reference to toggle button
            accordion.toggleButtons.push(toggleBtn);

            // Set initial state
            toggleBtn.setAttribute('aria-expanded', 'false');
            this.updateButtonText(toggleBtn, false);

            // Add event listener
            toggleBtn.addEventListener('click', () => {
                this.toggleAll(groupIndex);
            });
        });
    }

    createToggleAllButton(groupIndex) {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-accordion-toggle-all', '');

        // Set data attributes for dynamic text and aria-label
        button.setAttribute('data-text-for-show', 'Otvoriť všetko');
        button.setAttribute('data-text-for-hide', 'Zatvoriť všetko');
        button.setAttribute('data-aria-label-for-show', 'Otvoriť všetky panely');
        button.setAttribute('data-aria-label-for-hide', 'Zatvoriť všetky panely');

        button.innerHTML = `
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path class="toggle-icon-expand" d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path class="toggle-icon-collapse" d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display: none;"/>
        </svg>
        <span>Otvoriť všetko</span>
      `;

        return button;
    }

    toggleAccordionItem(accordion, index) {
        const { trigger, panel } = accordion.items[index];
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const newExpandedState = !isExpanded;

        if (!accordion.allowMultiple && !isExpanded) {
            // Close all other panels
            accordion.items.forEach((item, i) => {
                if (i !== index) {
                    item.trigger.setAttribute('aria-expanded', 'false');
                    this.setPanelVisibility(item.panel, true);
                    this.updateButtonText(item.trigger, false);
                    this.updateToggleIcon(item.trigger, false);
                }
            });
        }

        trigger.setAttribute('aria-expanded', newExpandedState);
        this.setPanelVisibility(panel, isExpanded);

        // Update button text and aria-label based on new state
        this.updateButtonText(trigger, newExpandedState);
        this.updateToggleIcon(trigger, newExpandedState);

        // Sync toggle all buttons state based on current accordion state
        this.syncToggleAllButtons(accordion);
    }

    handleKeyboard(e, accordion, index) {
        const { key } = e;
        const triggers = accordion.items.map(item => item.trigger);
        let targetIndex = index;

        switch (key) {
            case 'ArrowDown':
                e.preventDefault();
                targetIndex = index === triggers.length - 1 ? 0 : index + 1;
                triggers[targetIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                targetIndex = index === 0 ? triggers.length - 1 : index - 1;
                triggers[targetIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                triggers[0].focus();
                break;
            case 'End':
                e.preventDefault();
                triggers[triggers.length - 1].focus();
                break;
        }
    }

    toggleAll(groupIndex) {
        const accordion = this.accordions[groupIndex];
        if (!accordion) return;

        // Get current state from first toggle button
        const firstToggleBtn = accordion.toggleButtons[0];
        if (!firstToggleBtn) return;

        const isExpanded = firstToggleBtn.getAttribute('aria-expanded') === 'true';
        const newExpandedState = !isExpanded;

        // Update all accordion items
        accordion.items.forEach(({ trigger, panel }) => {
            trigger.setAttribute('aria-expanded', newExpandedState);
            this.setPanelVisibility(panel, isExpanded);
            this.updateButtonText(trigger, newExpandedState);
            this.updateToggleIcon(trigger, newExpandedState);
        });

        // Update ALL toggle buttons (top and bottom)
        accordion.toggleButtons.forEach(toggleButton => {
            toggleButton.setAttribute('aria-expanded', newExpandedState);
            this.updateButtonText(toggleButton, newExpandedState);
            this.updateToggleIcon(toggleButton, newExpandedState);
        });
    }

    syncToggleAllButtons(accordion) {
        // Check if all items are expanded
        const allExpanded = accordion.items.every(({ trigger }) =>
            trigger.getAttribute('aria-expanded') === 'true'
        );

        // Check if all items are collapsed
        const allCollapsed = accordion.items.every(({ trigger }) =>
            trigger.getAttribute('aria-expanded') === 'false'
        );

        // Only update if all items are in the same state
        if (allExpanded || allCollapsed) {
            const newState = allExpanded;

            // Update accordion's toggle all buttons
            if (accordion.toggleButtons && accordion.toggleButtons.length > 0) {
                accordion.toggleButtons.forEach(toggleButton => {
                    toggleButton.setAttribute('aria-expanded', newState);
                    this.updateButtonText(toggleButton, newState);
                    this.updateToggleIcon(toggleButton, newState);
                });
            }

            // Find and update standalone collapse buttons that control these panels
            const panelIds = accordion.items.map(({ panel }) => panel.id);
            const standaloneButtons = document.querySelectorAll('[data-collapse-toggle]');

            standaloneButtons.forEach(button => {
                const ariaControls = button.getAttribute('aria-controls');
                if (!ariaControls) return;

                // Check if this button controls any of the accordion's panels
                const controlledPanelIds = ariaControls.split(' ');
                const controlsSomePanels = controlledPanelIds.some(id => panelIds.includes(id));

                if (controlsSomePanels) {
                    button.setAttribute('aria-expanded', newState);
                    this.updateButtonText(button, newState);
                    this.updateToggleIcon(button, newState);
                }
            });
        }
    }

    updateButtonText(button, isExpanded) {
        const textForShow = button.getAttribute('data-text-for-show');
        const textForHide = button.getAttribute('data-text-for-hide');
        const ariaLabelForShow = button.getAttribute('data-aria-label-for-show');
        const ariaLabelForHide = button.getAttribute('data-aria-label-for-hide');

        if (textForShow && textForHide) {
            // Update text in <span> element
            const spanElement = button.querySelector('span');
            if (spanElement) {
                const currentText = isExpanded ? textForHide : textForShow;
                spanElement.textContent = currentText;
            }

            // Update aria-label (use separate aria-label attributes if available, otherwise use text attributes)
            const currentAriaLabel = isExpanded
                ? (ariaLabelForHide || textForHide)
                : (ariaLabelForShow || textForShow);
            button.setAttribute('aria-label', currentAriaLabel);
        }
    }

    updateToggleIcon(button, isExpanded) {
        const expandIcon = button.querySelector('.toggle-icon-expand');
        const collapseIcon = button.querySelector('.toggle-icon-collapse');

        if (expandIcon && collapseIcon) {
            if (isExpanded) {
                // Show collapse icon (minus)
                expandIcon.style.display = 'none';
                collapseIcon.style.display = 'block';
            } else {
                // Show expand icon (plus)
                expandIcon.style.display = 'block';
                collapseIcon.style.display = 'none';
            }
        }
    }

    // Helper method to set panel visibility (using aria-hidden to avoid Tailwind conflicts)
    setPanelVisibility(panel, shouldHide) {
        // Use aria-hidden instead of hidden attribute to avoid Tailwind's [hidden] { display: none !important; }
        panel.setAttribute('aria-hidden', shouldHide);
    }
}

// Standalone Collapse class (extends Accordion but only initializes collapse toggles)
class AccessibleCollapse extends AccessibleAccordion {
    init() {
        // Only initialize standalone toggles, not accordion groups
        this.initStandaloneToggles();
    }
}

/**
 * Initialize standalone collapses only
 * Call this manually after DOM is ready
 */
function initCollapses() {
    return new AccessibleCollapse();
}

/**
 * Initialize accordions (both collapses and accordion groups)
 * Call this manually after DOM is ready
 */
function initAccordions() {
    return new AccessibleAccordion();
}

// ES6 exports with short aliases
export {
    AccessibleCollapse,
    AccessibleCollapse as Collapse,
    AccessibleAccordion,
    AccessibleAccordion as Accordion,
    initCollapses,
    initAccordions
};
