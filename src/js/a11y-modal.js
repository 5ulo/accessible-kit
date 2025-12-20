/**
 * Accessible Modal Component
 * Vanilla JS, a11y friendly, focus trap, keyboard navigation
 * Follows WAI-ARIA Authoring Practices Guide for Dialog Pattern
 */

class AccessibleModal {
    constructor(element, options = {}) {
        this.modal = element;
        this.triggers = Array.from(
            document.querySelectorAll(`[data-modal-trigger="${element.id}"]`)
        );
        this.dialog = element.querySelector("[data-modal-dialog]");
        this.backdrop = element.querySelector("[data-modal-backdrop]");
        this.closeButtons = Array.from(
            this.dialog.querySelectorAll("[data-modal-close]")
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
            this.dialog.addEventListener("keydown", (e) =>
                this.handleFocusTrap(e)
            );
        }
    }

    setupAria() {
        // Generate unique IDs if not present
        if (!this.modal.id) {
            this.modal.id = `modal-${Math.random().toString(36).substr(2, 9)}`;
        }
        if (!this.dialog.id) {
            this.dialog.id = `${this.modal.id}-dialog`;
        }

        // Modal ARIA attributes
        this.modal.setAttribute("role", "dialog");
        this.modal.setAttribute("aria-modal", "true");
        this.modal.setAttribute("aria-hidden", "true");
        this.modal.setAttribute("tabindex", "-1");

        // Find title for aria-labelledby
        const title = this.dialog.querySelector("[data-modal-title]");
        if (title) {
            if (!title.id) {
                title.id = `${this.modal.id}-title`;
            }
            this.modal.setAttribute("aria-labelledby", title.id);
        }

        // Backdrop ARIA
        if (this.backdrop) {
            this.backdrop.setAttribute("aria-hidden", "true");
        }

        // Trigger ARIA
        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-controls", this.modal.id);
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
        this.modal.setAttribute("aria-hidden", "false");

        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-expanded", "true");
        });

        // Scroll lock
        if (this.options.scrollLock) {
            document.body.classList.add("modal-open");
        }

        // Update focusable elements
        this.updateFocusableElements();

        // Focus first element
        setTimeout(() => {
            if (this.firstFocusable) {
                this.firstFocusable.focus();
            } else {
                this.modal.focus();
            }
        }, 100);

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
        this.modal.setAttribute("aria-hidden", "true");

        this.triggers.forEach((trigger) => {
            trigger.setAttribute("aria-expanded", "false");
        });

        // Scroll lock
        if (this.options.scrollLock) {
            document.body.classList.remove("modal-open");
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
            this.dialog.querySelectorAll(focusableSelectors.join(","))
        ).filter((el) => {
            return (
                el.offsetWidth > 0 ||
                el.offsetHeight > 0 ||
                el.getClientRects().length > 0
            );
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
            document.body.classList.remove("modal-open");
        }

        // Close if open
        if (this.isOpen) {
            this.close();
        }
    }
}

// Auto-initialize modals
function initModals() {
    const modalElements = document.querySelectorAll("[data-modal]");
    const instances = [];

    modalElements.forEach((element) => {
        const options = {
            closeOnBackdrop: element.dataset.closeOnBackdrop !== "false",
            closeOnEscape: element.dataset.closeOnEscape !== "false",
            trapFocus: element.dataset.trapFocus !== "false",
            scrollLock: element.dataset.scrollLock !== "false",
        };

        instances.push(new AccessibleModal(element, options));
    });

    return instances;
}

// Initialize on DOM ready (only if not using module bundler)
if (typeof window !== 'undefined' && !window.a11yKitManualInit) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModals);
    } else {
        initModals();
    }
}

// Register in global namespace for CDN usage
if (typeof window !== 'undefined') {
    window.a11yKit = window.a11yKit || {};
    window.a11yKit.Modal = AccessibleModal;
    window.a11yKit.initModals = initModals;
}

// ES6 exports with short aliases
export { AccessibleModal, AccessibleModal as Modal, initModals };
