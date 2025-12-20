/**
 * Accessible Tabs Component
 * Vanilla JS, a11y friendly, keyboard navigation support
 * Follows WAI-ARIA Authoring Practices Guide for Tabs Pattern
 */

class AccessibleTabs {
    constructor(element, options = {}) {
        this.container = element;
        this.tablist = element.querySelector("[data-tabs-list]");
        this.tabs = Array.from(
            this.tablist.querySelectorAll("[data-tabs-tab]")
        );
        this.panels = Array.from(
            element.querySelectorAll("[data-tabs-panel]")
        );

        // Options
        this.options = {
            activeIndex: options.activeIndex || 0,
            automatic: options.automatic !== false, // Automatic activation on arrow keys
            orientation: options.orientation || "horizontal", // horizontal or vertical
            onChange: options.onChange || null,
            onTabClick: options.onTabClick || null,
        };

        this.currentIndex = this.options.activeIndex;

        this.init();
    }

    init() {
        // Set up ARIA attributes
        this.setupAria();

        // Activate initial tab
        this.activateTab(this.currentIndex, false);

        // Bind event listeners
        this.tabs.forEach((tab, index) => {
            tab.addEventListener("click", (e) => this.handleTabClick(e, index));
            tab.addEventListener("keydown", (e) =>
                this.handleTabKeydown(e, index)
            );
        });
    }

    setupAria() {
        // Generate unique IDs if not present
        const baseId = `tabs-${Math.random().toString(36).substr(2, 9)}`;

        // Setup tablist
        this.tablist.setAttribute("role", "tablist");
        const orientation =
            this.container.classList.contains("tabs--vertical")
                ? "vertical"
                : "horizontal";
        this.tablist.setAttribute("aria-orientation", orientation);

        // Setup tabs and panels
        this.tabs.forEach((tab, index) => {
            const panel = this.panels[index];

            // Generate IDs
            if (!tab.id) {
                tab.id = `${baseId}-tab-${index}`;
            }
            if (!panel.id) {
                panel.id = `${baseId}-panel-${index}`;
            }

            // Tab attributes
            tab.setAttribute("role", "tab");
            tab.setAttribute("aria-controls", panel.id);
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "-1");

            // Check if tab is disabled
            if (
                tab.hasAttribute("disabled") ||
                tab.hasAttribute("aria-disabled")
            ) {
                tab.setAttribute("aria-disabled", "true");
            }

            // Panel attributes
            panel.setAttribute("role", "tabpanel");
            panel.setAttribute("aria-labelledby", tab.id);
            panel.setAttribute("tabindex", "0");
            panel.setAttribute("aria-hidden", "true");
        });
    }

    handleTabClick(e, index) {
        e.preventDefault();

        // Don't activate disabled tabs
        if (this.isTabDisabled(index)) {
            return;
        }

        this.activateTab(index);

        if (this.options.onTabClick) {
            this.options.onTabClick(this.tabs[index], index, this);
        }
    }

    handleTabKeydown(e, index) {
        const orientation = this.tablist.getAttribute("aria-orientation");
        let targetIndex = null;

        switch (e.key) {
            case "ArrowLeft":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    targetIndex = this.getPreviousEnabledTabIndex(index);
                }
                break;

            case "ArrowRight":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    targetIndex = this.getNextEnabledTabIndex(index);
                }
                break;

            case "ArrowUp":
                if (orientation === "vertical") {
                    e.preventDefault();
                    targetIndex = this.getPreviousEnabledTabIndex(index);
                }
                break;

            case "ArrowDown":
                if (orientation === "vertical") {
                    e.preventDefault();
                    targetIndex = this.getNextEnabledTabIndex(index);
                }
                break;

            case "Home":
                e.preventDefault();
                targetIndex = this.getFirstEnabledTabIndex();
                break;

            case "End":
                e.preventDefault();
                targetIndex = this.getLastEnabledTabIndex();
                break;

            case "Enter":
            case " ":
                e.preventDefault();
                if (!this.isTabDisabled(index)) {
                    this.activateTab(index);
                }
                return;
        }

        // Move focus and optionally activate
        if (targetIndex !== null) {
            this.tabs[targetIndex].focus();

            // Automatic activation
            if (this.options.automatic && !this.isTabDisabled(targetIndex)) {
                this.activateTab(targetIndex);
            }
        }
    }

    activateTab(index, focus = true) {
        if (index < 0 || index >= this.tabs.length) {
            return;
        }

        // Don't activate disabled tabs
        if (this.isTabDisabled(index)) {
            return;
        }

        const previousIndex = this.currentIndex;

        // Function to update DOM
        const updateDOM = () => {
            // Deactivate all tabs and panels
            this.tabs.forEach((tab, i) => {
                const isActive = i === index;

                tab.setAttribute("aria-selected", isActive ? "true" : "false");
                tab.setAttribute("tabindex", isActive ? "0" : "-1");

                this.panels[i].setAttribute("aria-hidden", isActive ? "false" : "true");
            });

            this.currentIndex = index;

            // Focus the activated tab
            if (focus) {
                this.tabs[index].focus();
            }

            // Callback
            if (this.options.onChange && previousIndex !== index) {
                this.options.onChange(
                    this.tabs[index],
                    this.panels[index],
                    index,
                    this
                );
            }
        };

        // Use View Transitions API if available and animations are enabled
        if (!this.container.hasAttribute('data-no-animation') &&
            document.startViewTransition &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.startViewTransition(() => updateDOM());
        } else {
            updateDOM();
        }
    }

    isTabDisabled(index) {
        const tab = this.tabs[index];
        return (
            tab.hasAttribute("disabled") ||
            tab.getAttribute("aria-disabled") === "true"
        );
    }

    getNextEnabledTabIndex(currentIndex) {
        let nextIndex = currentIndex + 1;

        // Loop to beginning
        if (nextIndex >= this.tabs.length) {
            nextIndex = 0;
        }

        // Skip disabled tabs
        while (this.isTabDisabled(nextIndex) && nextIndex !== currentIndex) {
            nextIndex++;
            if (nextIndex >= this.tabs.length) {
                nextIndex = 0;
            }
        }

        return nextIndex;
    }

    getPreviousEnabledTabIndex(currentIndex) {
        let prevIndex = currentIndex - 1;

        // Loop to end
        if (prevIndex < 0) {
            prevIndex = this.tabs.length - 1;
        }

        // Skip disabled tabs
        while (this.isTabDisabled(prevIndex) && prevIndex !== currentIndex) {
            prevIndex--;
            if (prevIndex < 0) {
                prevIndex = this.tabs.length - 1;
            }
        }

        return prevIndex;
    }

    getFirstEnabledTabIndex() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (!this.isTabDisabled(i)) {
                return i;
            }
        }
        return 0;
    }

    getLastEnabledTabIndex() {
        for (let i = this.tabs.length - 1; i >= 0; i--) {
            if (!this.isTabDisabled(i)) {
                return i;
            }
        }
        return this.tabs.length - 1;
    }

    destroy() {
        // Remove event listeners
        this.tabs.forEach((tab, index) => {
            tab.removeEventListener("click", (e) =>
                this.handleTabClick(e, index)
            );
            tab.removeEventListener("keydown", (e) =>
                this.handleTabKeydown(e, index)
            );
        });
    }
}

/**
 * Initialize all tabs on the page
 * Call this manually after DOM is ready
 */
function initTabs() {
    const tabsElements = document.querySelectorAll("[data-tabs]");
    const instances = [];

    tabsElements.forEach((element) => {
        const options = {
            activeIndex: parseInt(element.dataset.activeIndex) || 0,
            automatic: element.dataset.automatic !== "false",
            orientation: element.dataset.orientation || "horizontal",
        };

        instances.push(new AccessibleTabs(element, options));
    });

    return instances;
}

// ES6 exports with short aliases
export { AccessibleTabs, AccessibleTabs as Tabs, initTabs };
