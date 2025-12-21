/**
 * Accessible Offcanvas Component
 * Vanilla JS, a11y friendly, focus trap, keyboard navigation
 * Follows WAI-ARIA Authoring Practices Guide for Dialog Pattern
 */

class AccessibleOffcanvas {
    constructor(element, options = {}) {
        this.container = element;
        this.triggers = Array.from(
            document.querySelectorAll(`[data-offcanvas-trigger="${element.id}"]`)
        );
        this.panel = element.querySelector("[data-offcanvas-panel]");
        this.backdrop = element.querySelector("[data-offcanvas-backdrop]");
        this.closeButtons = Array.from(
            this.panel.querySelectorAll("[data-offcanvas-close]")
        );

        // Options
        this.options = {
            closeOnBackdrop: options.closeOnBackdrop !== false,
            closeOnEscape: options.closeOnEscape !== false,
            trapFocus: options.trapFocus !== false,
            scrollLock: options.scrollLock !== false,
            onOpen: options.onOpen || null,
            onClose: options.onClose || null,
        };

        this.isOpen = false;
        this.lastFocusedElement = null;
        this.focusableElements = [];
        this.firstFocusable = null;
        this.lastFocusable = null;

        this.init();
    }

    init() {
        // Set up ARIA attributes
        this.setupAria();

        // Bind event listeners
        this.triggers.forEach((trigger) => {
            trigger.addEventListener("click", (e) => this.open(e));
        });

        this.closeButtons.forEach((button) => {
            button.addEventListener("click", (e) => this.close(e));
        });

        // Backdrop click
        if (this.backdrop && this.options.closeOnBackdrop) {
            this.backdrop.addEventListener("click", (e) => this.close(e));
        }

        // Escape key
        if (this.options.closeOnEscape) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.isOpen) {
                    this.close(e);
                }
            });
        }

        // Focus trap
        if (this.options.trapFocus) {
            this.panel.addEventListener("keydown", (e) =>
                this.handleFocusTrap(e)
            );
        }
    }

    setupAria() {
        // Generate unique IDs if not present
        if (!this.container.id) {
            this.container.id = `offcanvas-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
        }
        if (!this.panel.id) {
            this.panel.id = `${this.container.id}-panel`;
        }

        // Panel ARIA attributes
        this.panel.setAttribute("role", "dialog");
        this.panel.setAttribute("aria-modal", "true");
        this.panel.setAttribute("aria-hidden", "true");
        this.panel.setAttribute("tabindex", "-1");

        // Find title for aria-labelledby
        const title = this.panel.querySelector("[data-offcanvas-title]");
        if (title) {
            if (!title.id) {
                title.id = `${this.container.id}-title`;
            }
            this.panel.setAttribute("aria-labelledby", title.id);
        }

        // Backdrop ARIA
        if (this.backdrop) {
            this.backdrop.setAttribute("aria-hidden", "true");
        }

        // Trigger ARIA
        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-controls", this.panel.id);
            trigger.setAttribute("aria-expanded", "false");
        });
    }

    open(e) {
        if (e) {
            e.preventDefault();
            this.lastFocusedElement = e.target;
        }

        if (this.isOpen) return;

        this.isOpen = true;
        this.panel.setAttribute("aria-hidden", "false");
        if (this.backdrop) {
            this.backdrop.setAttribute("aria-hidden", "false");
        }

        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-expanded", "true");
        });

        // Scroll lock
        if (this.options.scrollLock) {
            document.body.classList.add("offcanvas-open");
        }

        // Update focusable elements and focus - needs to wait for CSS to apply
        setTimeout(() => {
            this.updateFocusableElements();

            if (this.firstFocusable) {
                this.firstFocusable.focus();
            } else {
                this.panel.focus();
            }
        }, 50);

        // Callback
        if (this.options.onOpen) {
            this.options.onOpen(this);
        }
    }

    close(e) {
        if (e) {
            e.preventDefault();
        }

        if (!this.isOpen) return;

        this.isOpen = false;
        this.panel.setAttribute("aria-hidden", "true");
        if (this.backdrop) {
            this.backdrop.setAttribute("aria-hidden", "true");
        }

        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-expanded", "false");
        });

        // Scroll lock
        if (this.options.scrollLock) {
            document.body.classList.remove("offcanvas-open");
        }

        // Return focus to trigger
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }

        // Callback
        if (this.options.onClose) {
            this.options.onClose(this);
        }
    }

    updateFocusableElements() {
        // Find all focusable elements
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];

        this.focusableElements = Array.from(
            this.panel.querySelectorAll(focusableSelectors.join(","))
        ).filter((el) => {
            // Check if element is visible
            const isVisible = (
                el.offsetWidth > 0 ||
                el.offsetHeight > 0 ||
                el.getClientRects().length > 0
            );

            if (!isVisible) {
                return false;
            }

            // Check if element or any parent has aria-hidden="true"
            let currentElement = el;
            while (currentElement && currentElement !== this.panel) {
                if (currentElement.getAttribute('aria-hidden') === 'true') {
                    return false;
                }
                currentElement = currentElement.parentElement;
            }

            // Check if element has hidden attribute
            if (el.hasAttribute('hidden')) {
                return false;
            }

            // Check computed style for display (not visibility, as panel is opening)
            const style = window.getComputedStyle(el);
            if (style.display === 'none') {
                return false;
            }

            return true;
        });

        this.firstFocusable = this.focusableElements[0] || null;
        this.lastFocusable =
            this.focusableElements[this.focusableElements.length - 1] || null;
    }

    handleFocusTrap(e) {
        if (!this.isOpen || e.key !== "Tab") return;

        // If no focusable elements, prevent default
        if (this.focusableElements.length === 0) {
            e.preventDefault();
            return;
        }

        // Shift + Tab (backward)
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        }
        // Tab (forward)
        else {
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }

    destroy() {
        // Remove event listeners
        this.triggers.forEach((trigger) => {
            trigger.removeEventListener("click", this.open);
        });

        this.closeButtons.forEach((button) => {
            button.removeEventListener("click", this.close);
        });

        if (this.backdrop) {
            this.backdrop.removeEventListener("click", this.close);
        }

        // Remove scroll lock
        if (this.options.scrollLock) {
            document.body.classList.remove("offcanvas-open");
        }

        // Close if open
        if (this.isOpen) {
            this.close();
        }
    }
}

/**
 * Initialize all offcanvas elements on the page
 * Call this manually after DOM is ready
 */
function initOffcanvas() {
    const offcanvasElements = document.querySelectorAll("[data-offcanvas]");
    const instances = [];

    offcanvasElements.forEach((element) => {
        const options = {
            closeOnBackdrop: element.dataset.closeOnBackdrop !== "false",
            closeOnEscape: element.dataset.closeOnEscape !== "false",
            trapFocus: element.dataset.trapFocus !== "false",
            scrollLock: element.dataset.scrollLock !== "false",
        };

        instances.push(new AccessibleOffcanvas(element, options));
    });

    return instances;
}

// ES6 exports with short aliases
export { AccessibleOffcanvas, AccessibleOffcanvas as Offcanvas, initOffcanvas };
