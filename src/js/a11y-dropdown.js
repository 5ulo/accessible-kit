/**
 * Accessible Dropdown Component
 * Vanilla JS, a11y friendly, keyboard navigation support
 * Works for navigation menus, language switchers, etc.
 */

class AccessibleDropdown {
    constructor(element, options = {}) {
        this.dropdown = element;
        this.button = element.querySelector("[data-dropdown-button]");
        this.menu = element.querySelector("[data-dropdown-menu]");
        this.items = Array.from(
            this.menu.querySelectorAll("[data-dropdown-item]")
        );

        // Options
        this.options = {
            closeOnSelect: options.closeOnSelect !== false,
            closeOnOutsideClick: options.closeOnOutsideClick !== false,
            closeOnEscape: options.closeOnEscape !== false,
            hoverDelay: options.hoverDelay || 0,
            onOpen: options.onOpen || null,
            onClose: options.onClose || null,
            onSelect: options.onSelect || null,
        };

        this.isOpen = false;
        this.currentIndex = -1;
        this.hoverTimeout = null;

        // Register instance globally for managing multiple dropdowns
        if (typeof window !== 'undefined') {
            window.a11yKit = window.a11yKit || {};
            window.a11yKit._dropdownInstances = window.a11yKit._dropdownInstances || [];
            window.a11yKit._dropdownInstances.push(this);
        }

        this.init();
    }

    init() {
        // Set up ARIA attributes
        this.setupAria();

        // Bind event listeners
        this.button.addEventListener("click", (e) => this.toggle(e));
        this.button.addEventListener("keydown", (e) =>
            this.handleButtonKeydown(e)
        );

        // Menu item events
        this.items.forEach((item, index) => {
            item.addEventListener("click", (e) =>
                this.handleItemClick(e, index)
            );
            item.addEventListener("keydown", (e) =>
                this.handleItemKeydown(e, index)
            );
            item.addEventListener("mouseenter", () =>
                this.handleItemHover(index)
            );
        });

        // Outside click
        if (this.options.closeOnOutsideClick) {
            document.addEventListener("click", (e) =>
                this.handleOutsideClick(e)
            );
        }

        // Escape key
        if (this.options.closeOnEscape) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.isOpen) {
                    this.close();
                    this.button.focus();
                }
            });
        }
    }

    setupAria() {
        // Generate unique IDs if not present
        if (!this.button.id) {
            this.button.id = `dropdown-button-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
        }
        if (!this.menu.id) {
            this.menu.id = `dropdown-menu-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
        }

        // Button ARIA attributes
        this.button.setAttribute("aria-haspopup", "true");
        this.button.setAttribute("aria-expanded", "false");
        this.button.setAttribute("aria-controls", this.menu.id);

        // Menu ARIA attributes
        this.menu.setAttribute("role", "menu");
        this.menu.setAttribute("aria-labelledby", this.button.id);

        // Menu items ARIA attributes
        this.items.forEach((item) => {
            item.setAttribute("role", "menuitem");
            if (!item.hasAttribute("tabindex")) {
                item.setAttribute("tabindex", "-1");
            }
        });
    }

    toggle(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.isOpen) return;

        // Close other dropdowns first
        if (typeof window !== 'undefined' && window.a11yKit._dropdownInstances) {
            window.a11yKit._dropdownInstances.forEach(instance => {
                if (instance !== this && instance.isOpen) {
                    instance.close();
                }
            });
        }

        this.isOpen = true;
        this.dropdown.classList.add("is-open");
        this.menu.classList.add("is-open");
        this.button.setAttribute("aria-expanded", "true");
        this.currentIndex = -1;

        // Focus first item after a short delay for screen readers
        setTimeout(() => {
            if (this.items.length > 0) {
                this.setFocusedItem(0);
            }
        }, 100);

        if (this.options.onOpen) {
            this.options.onOpen(this);
        }
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.dropdown.classList.remove("is-open");
        this.menu.classList.remove("is-open");
        this.button.setAttribute("aria-expanded", "false");
        this.currentIndex = -1;

        // Remove focus from items
        this.items.forEach((item) => {
            item.setAttribute("tabindex", "-1");
        });

        if (this.options.onClose) {
            this.options.onClose(this);
        }
    }

    handleButtonKeydown(e) {
        switch (e.key) {
            case "Enter":
            case " ":
            case "ArrowDown":
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else if (e.key === "ArrowDown") {
                    this.focusNextItem();
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (this.isOpen) {
                    this.focusPreviousItem();
                }
                break;
        }
    }

    handleItemKeydown(e, index) {
        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                this.selectItem(index);
                break;
            case "ArrowDown":
                e.preventDefault();
                this.focusNextItem();
                break;
            case "ArrowUp":
                e.preventDefault();
                this.focusPreviousItem();
                break;
            case "Home":
                e.preventDefault();
                this.setFocusedItem(0);
                break;
            case "End":
                e.preventDefault();
                this.setFocusedItem(this.items.length - 1);
                break;
            case "Tab":
                this.close();
                break;
        }
    }

    handleItemClick(e, index) {
        e.preventDefault();
        e.stopPropagation();
        this.selectItem(index);
    }

    handleItemHover(index) {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }

        this.hoverTimeout = setTimeout(() => {
            this.setFocusedItem(index);
        }, this.options.hoverDelay);
    }

    handleOutsideClick(e) {
        if (this.isOpen && !this.dropdown.contains(e.target)) {
            this.close();
        }
    }

    selectItem(index) {
        const item = this.items[index];

        if (this.options.onSelect) {
            this.options.onSelect(item, index, this);
        }

        // Handle link items
        const link = item.tagName === "A" ? item : item.querySelector("a");
        if (link && link.href) {
            window.location.href = link.href;
        }

        if (this.options.closeOnSelect) {
            this.close();
            this.button.focus();
        }
    }

    setFocusedItem(index) {
        // Remove tabindex from all items
        this.items.forEach((item) => {
            item.setAttribute("tabindex", "-1");
        });

        // Set current item
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            const item = this.items[index];
            item.setAttribute("tabindex", "0");
            item.focus();
        }
    }

    focusNextItem() {
        const nextIndex = this.currentIndex + 1;
        if (nextIndex < this.items.length) {
            this.setFocusedItem(nextIndex);
        } else {
            this.setFocusedItem(0); // Loop to first
        }
    }

    focusPreviousItem() {
        const prevIndex = this.currentIndex - 1;
        if (prevIndex >= 0) {
            this.setFocusedItem(prevIndex);
        } else {
            this.setFocusedItem(this.items.length - 1); // Loop to last
        }
    }

    destroy() {
        // Remove event listeners
        this.button.removeEventListener("click", this.toggle);
        this.button.removeEventListener("keydown", this.handleButtonKeydown);

        this.items.forEach((item, index) => {
            item.removeEventListener("click", (e) =>
                this.handleItemClick(e, index)
            );
            item.removeEventListener("keydown", (e) =>
                this.handleItemKeydown(e, index)
            );
        });

        if (this.options.closeOnOutsideClick) {
            document.removeEventListener("click", this.handleOutsideClick);
        }

        // Clean up
        this.dropdown.classList.remove("is-open");
        this.menu.classList.remove("is-open");
    }
}

// Auto-initialize dropdowns
function initDropdowns() {
    const dropdowns = document.querySelectorAll("[data-dropdown]");
    const instances = [];

    dropdowns.forEach((dropdown) => {
        const options = {
            closeOnSelect: dropdown.dataset.closeOnSelect !== "false",
            closeOnOutsideClick:
                dropdown.dataset.closeOnOutsideClick !== "false",
            closeOnEscape: dropdown.dataset.closeOnEscape !== "false",
            hoverDelay: parseInt(dropdown.dataset.hoverDelay) || 0,
        };

        instances.push(new AccessibleDropdown(dropdown, options));
    });

    return instances;
}

// Initialize on DOM ready (only if not using module bundler)
if (typeof window !== 'undefined' && !window.a11yKitManualInit) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }
}

// Register in global namespace for CDN usage
if (typeof window !== 'undefined') {
    window.a11yKit = window.a11yKit || {};
    window.a11yKit.Dropdown = AccessibleDropdown;
    window.a11yKit.initDropdowns = initDropdowns;
}

// ES6 exports with short aliases
export { AccessibleDropdown, AccessibleDropdown as Dropdown, initDropdowns };
