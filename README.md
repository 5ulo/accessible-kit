# Accessible Kit

<!-- Badges will be added when published -->
[![npm version](https://img.shields.io/npm/v/accessible-kit.svg)](https://www.npmjs.com/package/accessible-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/accessible-kit)](https://bundlephobia.com/package/accessible-kit)

> Lightweight, accessible UI component library with full ARIA support. Zero dependencies, vanilla JavaScript.

A collection of fully accessible UI components for modern web applications. Built with a focus on keyboard navigation, screen reader support, and following WAI-ARIA best practices.

## ✨ Features

- **🎯 Fully Accessible** - Complete ARIA support and keyboard navigation
- **🪶 Lightweight** - Zero dependencies, vanilla JavaScript
- **🎨 Customizable** - Separated core/theme CSS for easy theming
- **📱 Responsive** - Mobile-first design approach
- **🌙 Dark Mode** - Built-in dark mode support
- **♿ Inclusive** - High contrast mode and reduced motion support
- **🔧 Framework Agnostic** - Works with any framework or vanilla JS
- **📦 Tree-shakeable** - Import only what you need

## 📚 Table of Contents

- [Demo](#-demo)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Components](#-components)
  - [Dropdown](#dropdown)
  - [Tabs](#tabs)
  - [Accordion](#accordion)
  - [Collapse](#collapse)
  - [Modal](#modal)
  - [Offcanvas](#offcanvas)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

## 🎭 Demo

View live examples at: [https://5ulo.github.io/accessible-kit/](https://5ulo.github.io/accessible-kit/)

## 📦 Installation

### NPM

```bash
npm install accessible-kit
```

### Yarn

```bash
yarn add accessible-kit
```

### CDN (ES Modules)

```html
<!-- Individual component with manual initialization -->
<script type="module">
  import { initDropdowns } from 'https://unpkg.com/accessible-kit/src/js/a11y-dropdown.js';

  document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
  });
</script>
<link rel="stylesheet" href="https://unpkg.com/accessible-kit/src/css/a11y-dropdown.core.css">
<link rel="stylesheet" href="https://unpkg.com/accessible-kit/src/css/a11y-dropdown.theme.css">
```

## 🚀 Quick Start

### Using ES Modules (Recommended for Modern Browsers)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="https://unpkg.com/accessible-kit/src/css/a11y-dropdown.core.css">
  <link rel="stylesheet" href="https://unpkg.com/accessible-kit/src/css/a11y-dropdown.theme.css">
</head>
<body>
  <div data-dropdown>
    <button data-dropdown-button>
      Options
      <span data-dropdown-arrow></span>
    </button>
    <div data-dropdown-menu>
      <div>
        <div>
          <button data-dropdown-item>Edit</button>
          <button data-dropdown-item>Delete</button>
        </div>
      </div>
    </div>
  </div>

  <script type="module">
    import { initDropdowns } from 'https://unpkg.com/accessible-kit/src/js/a11y-dropdown.js';

    document.addEventListener('DOMContentLoaded', () => {
      initDropdowns();
    });
  </script>
</body>
</html>
```

### Using NPM/Modules

```javascript
// Import specific components (best for tree-shaking)
import { initDropdowns } from 'accessible-kit/dropdown';
import { initTabs } from 'accessible-kit/tabs';

// Import styles
import 'accessible-kit/styles/dropdown-core';
import 'accessible-kit/styles/dropdown-theme';

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initTabs();
});

// Or import all components
import { initAll } from 'accessible-kit';

document.addEventListener('DOMContentLoaded', () => {
  initAll();
});
```

### Module Imports (ES6+)

```javascript
import { AccessibleDropdown } from 'accessible-kit/dropdown';

const dropdown = new AccessibleDropdown(element, {
  closeOnSelect: true,
  onOpen: () => console.log('Opened'),
  onClose: () => console.log('Closed')
});
```

## 🧩 Components

### Available Components (v1.0)

- ✅ **Dropdown** - Accessible dropdown menus with keyboard navigation
- ✅ **Tabs** - Tab panels following WAI-ARIA Tabs Pattern
- ✅ **Accordion** - Expandable sections with keyboard support
- ✅ **Collapse** - Standalone collapsible panels
- ✅ **Modal** - Accessible dialogs with focus trap
- ✅ **Offcanvas** - Slide-out side panels with focus management

### Roadmap (v1.1+)

- 🔜 **Tooltip** - Accessible tooltips with positioning
- 🔜 **Toast/Notification** - Live region announcements
- 🔜 **Toggle Switch** - Accessible switch component
- 🔜 **Popover** - Interactive popovers
- 🔜 **Alert/Banner** - Dismissible alert messages
- 🔜 **Combobox/Autocomplete** - Searchable select component

---

## Dropdown

Fully accessible dropdown component with keyboard navigation and ARIA support.

### Features

- ✅ Full ARIA attributes support
- ✅ Keyboard navigation (arrows, Enter, Space, Esc, Home, End)
- ✅ Focus management
- ✅ Auto-close on outside click
- ✅ CSS Grid animations by default
- ✅ Multiple variants (nav, language switcher)
- ✅ Automatic `prefers-reduced-motion` support

### Installation

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-dropdown.core.css">
<link rel="stylesheet" href="css/a11y-dropdown.theme.css">

<!-- JavaScript -->
<script src="js/a11y-dropdown.js"></script>
```

### Basic Usage

```html
<div data-dropdown>
  <button data-dropdown-button>
    Options
    <span data-dropdown-arrow></span>
  </button>
  <div data-dropdown-menu>
    <!-- Two wrapper divs required for animations -->
    <div>
      <div>
        <button data-dropdown-item>Edit</button>
        <button data-dropdown-item>Duplicate</button>
        <hr data-dropdown-divider>
        <button data-dropdown-item>Delete</button>
      </div>
    </div>
  </div>
</div>
```

### JavaScript Initialization

```javascript
import { initDropdowns, Dropdown } from 'accessible-kit/dropdown';

// Initialize all dropdowns
document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
});

// Or manual initialization with options
const dropdown = new Dropdown(element, {
  closeOnSelect: true,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  hoverDelay: 0,
  onOpen: (dropdown) => {},
  onClose: (dropdown) => {},
  onSelect: (item, index) => {}
});
```

### Animations

Dropdowns have **CSS Grid animations enabled by default**. The animation automatically respects `prefers-reduced-motion` user preferences.

**Customizing animation speed:**

```html
<!-- Inline via style attribute -->
<div data-dropdown style="--a11y-dropdown-duration: 0.5s;">
  <!-- dropdown content -->
</div>
```

```css
/* Or globally in CSS */
:root {
  --a11y-dropdown-duration: 0.3s;
  --a11y-dropdown-easing: ease-in-out;
}
```

**Disable animations:**

```html
<div data-dropdown-menu data-no-animation>
  <!-- menu without animations -->
</div>
```

### Configuration

**Data attributes:**

```html
<!-- Keep dropdown open after selection -->
<div data-dropdown data-close-on-select="false">

<!-- Disable close on outside click -->
<div data-dropdown data-close-on-outside-click="false">

<!-- Hover delay (ms) -->
<div data-dropdown data-hover-delay="200">
```

**JavaScript options:**

```javascript
{
  closeOnSelect: true,           // Close after selecting item
  closeOnOutsideClick: true,     // Close on outside click
  closeOnEscape: true,           // Close on Escape key
  hoverDelay: 0,                 // Hover delay in ms
  onOpen: (dropdown) => {},      // Callback on open
  onClose: (dropdown) => {},     // Callback on close
  onSelect: (item, index) => {}  // Callback on item select
}
```

### Keyboard Navigation

- **Enter** / **Space** - Open/close menu or select item
- **↓** / **↑** - Navigate between items
- **Home** / **End** - Jump to first/last item
- **Esc** - Close menu and return focus to button
- **Tab** - Close menu and move focus

### Variants

**Navigation menu:**

```html
<div data-dropdown data-variant="nav">
  <button data-dropdown-button>Products</button>
  <div data-dropdown-menu>
    <div>
      <div>
        <a href="#" data-dropdown-item>Product 1</a>
        <a href="#" data-dropdown-item>Product 2</a>
      </div>
    </div>
  </div>
</div>
```

**Language switcher:**

```html
<div data-dropdown data-variant="language">
  <button data-dropdown-button>
    🇬🇧 EN
    <span data-dropdown-arrow></span>
  </button>
  <div data-dropdown-menu>
    <div>
      <div>
        <button data-dropdown-item>
          <span data-dropdown-item-flag>🇬🇧</span>
          English
        </button>
        <button data-dropdown-item>
          <span data-dropdown-item-flag>🇸🇰</span>
          Slovenčina
        </button>
      </div>
    </div>
  </div>
</div>
```

**Right-aligned menu:**

```html
<div data-dropdown-menu="right">
  <!-- items -->
</div>
```

---

## Tabs

Fully accessible tabs component following WAI-ARIA Tabs Pattern.

### Features

- ✅ Full ARIA attributes (role, aria-selected, aria-controls)
- ✅ Keyboard navigation (arrows, Home, End)
- ✅ Automatic and manual activation modes
- ✅ Focus management
- ✅ Disabled tabs support
- ✅ Horizontal and vertical orientation
- ✅ Multiple visual variants (basic, boxed, pills)
- ✅ Fade animations by default
- ✅ Automatic `prefers-reduced-motion` support

### Installation

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-tabs.core.css">
<link rel="stylesheet" href="css/a11y-tabs.theme.css">

<!-- JavaScript -->
<script src="js/a11y-tabs.js"></script>
```

### Basic Usage

```html
<div data-tabs>
  <div role="tablist" data-tabs-list>
    <button data-tabs-tab>Tab 1</button>
    <button data-tabs-tab>Tab 2</button>
    <button data-tabs-tab>Tab 3</button>
  </div>

  <div data-tabs-panel>
    Content for tab 1
  </div>

  <div data-tabs-panel>
    Content for tab 2
  </div>

  <div data-tabs-panel>
    Content for tab 3
  </div>
</div>
```

### JavaScript Initialization

```javascript
import { initTabs, Tabs } from 'accessible-kit/tabs';

// Initialize all tabs
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
});

// Or manual initialization with options
const tabs = new Tabs(element, {
  activeIndex: 0,           // Initial active tab (0-based)
  automatic: true,          // Auto-activate on arrow keys
  orientation: 'horizontal', // 'horizontal' or 'vertical'
  onChange: (tab, panel, index) => {},
  onTabClick: (tab, index) => {}
});
```

### Animations

Tabs have **fade animation enabled by default** when switching between panels.

**Customizing animation speed:**

```html
<div data-tabs style="--a11y-tabs-duration: 0.5s;">
  <!-- tabs -->
</div>
```

```css
:root {
  --a11y-tabs-duration: 0.3s;
  --a11y-tabs-easing: ease-in-out;
}
```

**Disable animations:**

```html
<div data-tabs data-no-animation>
  <!-- tabs without fade animation -->
</div>
```

### Configuration

**Data attributes:**

```html
<!-- Set initial active tab (0-based index) -->
<div data-tabs data-active-index="1">

<!-- Manual activation (requires Enter/Space) -->
<div data-tabs data-automatic="false">

<!-- Vertical orientation -->
<div data-tabs data-orientation="vertical">
```

**JavaScript options:**

```javascript
{
  activeIndex: 0,                    // Initial active tab
  automatic: true,                   // Auto-activate on arrow keys
  orientation: 'horizontal',         // 'horizontal' or 'vertical'
  onChange: (tab, panel, index) => {}, // Callback on tab change
  onTabClick: (tab, index) => {}     // Callback on tab click
}
```

### Keyboard Navigation

**Horizontal tabs:**
- **←** / **→** - Navigate between tabs
- **Home** - Jump to first tab
- **End** - Jump to last tab
- **Enter** / **Space** - Activate tab (manual mode)
- **Tab** - Move focus to panel content

**Vertical tabs:**
- **↑** / **↓** - Navigate between tabs
- **Home** / **End** - First/last tab
- **Enter** / **Space** - Activate tab
- **Tab** - Move to panel content

### Variants

**Boxed variant:**

```html
<div data-tabs data-variant="boxed">
  <div role="tablist" data-tabs-list>
    <button data-tabs-tab>Tab 1</button>
    <button data-tabs-tab>Tab 2</button>
  </div>

  <div data-tabs-panels>
    <div data-tabs-panel>Content 1</div>
    <div data-tabs-panel>Content 2</div>
  </div>
</div>
```

**Pills variant:**

```html
<div data-tabs data-variant="pills">
  <!-- tabs styled as pills/buttons -->
</div>
```

**Vertical tabs:**

```html
<div data-tabs data-orientation="vertical">
  <div role="tablist" data-tabs-list>
    <button data-tabs-tab>Tab 1</button>
    <button data-tabs-tab>Tab 2</button>
  </div>

  <div data-tabs-panels>
    <div data-tabs-panel>Content 1</div>
    <div data-tabs-panel>Content 2</div>
  </div>
</div>
```

**Disabled tab:**

```html
<button data-tabs-tab disabled>Disabled Tab</button>
```

**Tabs with badges:**

```html
<button data-tabs-tab>
  Active
  <span class="tabs__tab-badge">12</span>
</button>
```

---

## Accordion

Fully accessible accordion component with keyboard navigation.

### Features

- ✅ Full ARIA attributes support
- ✅ Keyboard navigation (arrows, Home, End, Enter, Space)
- ✅ Single or multiple expand modes
- ✅ CSS Grid animations by default
- ✅ Optional "Toggle All" button
- ✅ Automatic `prefers-reduced-motion` support

### Installation

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-accordion.core.css">
<link rel="stylesheet" href="css/a11y-accordion.theme.css">

<!-- JavaScript -->
<script src="js/a11y-accordion.js"></script>
```

### Basic Usage

```html
<div data-accordion>
  <div data-accordion-item>
    <button data-accordion-trigger>
      Section 1
    </button>
    <div data-accordion-panel>
      <!-- Two wrapper divs required for animations -->
      <div>
        <div>
          <p>Content for section 1</p>
        </div>
      </div>
    </div>
  </div>

  <div data-accordion-item>
    <button data-accordion-trigger>
      Section 2
    </button>
    <div data-accordion-panel>
      <div>
        <div>
          <p>Content for section 2</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### JavaScript Initialization

```javascript
import { initAccordions, Accordion } from 'accessible-kit/accordion';

// Initialize all accordions
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
});

// Or manual initialization with options
const accordion = new Accordion(element, {
  allowMultiple: false,
  allowToggle: true,
  defaultExpanded: [],
  onToggle: (item, isExpanded) => {},
  onChange: (expandedItems) => {}
});
```

### Animations

Accordions have **CSS Grid animations enabled by default**.

**Customizing animation:**

```html
<div data-accordion style="--a11y-accordion-duration: 0.5s;">
  <!-- accordion items -->
</div>
```

```css
:root {
  --a11y-accordion-duration: 0.3s;
  --a11y-accordion-easing: ease;
}
```

**Disable animations:**

```html
<div data-accordion data-no-animation>
  <!-- accordion without animations -->
</div>
```

### Configuration

**Allow multiple sections open:**

```html
<div data-accordion data-accordion-multiple>
  <!-- multiple items can be open -->
</div>
```

**Default expanded state:**

```html
<div data-accordion-item data-default-expanded>
  <!-- this item is expanded by default -->
</div>
```

**Toggle All Button:**

```html
<div data-accordion data-accordion-multiple>
  <!-- Auto-generated toggle button -->
  <div data-accordion-controls="top"></div>

  <div data-accordion-item>
    <!-- items -->
  </div>

  <!-- Bottom toggle button -->
  <div data-accordion-controls="bottom"></div>
</div>
```

### Keyboard Navigation

- **↓** - Move to next trigger
- **↑** - Move to previous trigger
- **Home** - Move to first trigger
- **End** - Move to last trigger
- **Enter** / **Space** - Toggle accordion item

---

## Collapse

Standalone collapsible panels - accordion functionality without the group structure.

### Features

- ✅ Standalone toggle buttons
- ✅ CSS Grid animations by default
- ✅ Control multiple panels with one button
- ✅ Dynamic button text based on state
- ✅ ARIA attributes for accessibility

### Basic Usage

```html
<!-- Simple toggle -->
<button data-collapse-toggle="#panel">
  Toggle Panel
</button>

<div id="panel">
  <!-- Two wrapper divs required for animations -->
  <div>
    <div>
      <p>Panel content here</p>
    </div>
  </div>
</div>
```

### Control Multiple Panels

```html
<!-- Using class selector -->
<button data-collapse-toggle=".info-panel">
  Toggle All Info Panels
</button>

<div class="info-panel">
  <div><div>Panel 1</div></div>
</div>
<div class="info-panel">
  <div><div>Panel 2</div></div>
</div>
<div class="info-panel">
  <div><div>Panel 3</div></div>
</div>
```

### Dynamic Button Text

```html
<button
  data-collapse-toggle="#details"
  data-text-for-show="Show Details"
  data-text-for-hide="Hide Details"
  data-aria-label-for-show="Show additional details"
  data-aria-label-for-hide="Hide additional details">
  <span>Show Details</span>
</button>

<div id="details">
  <div><div>Details content</div></div>
</div>
```

### Animations

**Disable animations for specific panel:**

```html
<div id="no-animation-panel" data-no-animation>
  <div>
    <div>Panel without animation</div>
  </div>
</div>
```

---

## Modal

Accessible modal dialogs with focus trap following WAI-ARIA Dialog Pattern.

### Features

- ✅ Full ARIA attributes (role="dialog", aria-modal="true")
- ✅ Focus trap - Tab cycles only within modal
- ✅ Return focus - Returns focus to trigger after close
- ✅ Scroll lock - Locks body scroll when open
- ✅ Escape to close
- ✅ Backdrop click to close
- ✅ Configurable behavior

### Installation

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-modal.core.css">
<link rel="stylesheet" href="css/a11y-modal.theme.css">

<!-- JavaScript -->
<script src="js/a11y-modal.js"></script>
```

### Basic Usage

```html
<!-- Trigger button -->
<button data-modal-trigger="my-modal">Open Modal</button>

<!-- Modal -->
<div data-modal id="my-modal">
  <div data-modal-backdrop></div>
  <div data-modal-dialog>
    <div data-modal-header>
      <h2 data-modal-title>Modal Title</h2>
      <button data-modal-close aria-label="Close modal">×</button>
    </div>
    <div data-modal-body>
      <p>Modal content goes here.</p>
    </div>
    <div data-modal-footer>
      <button data-modal-close>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>
```

### JavaScript Initialization

```javascript
import { initModals, Modal } from 'accessible-kit/modal';

// Initialize all modals
document.addEventListener('DOMContentLoaded', () => {
  initModals();
});

// Or manual initialization with options
const modal = new Modal(element, {
  closeOnBackdropClick: true,
  closeOnEscape: true,
  lockScroll: true,
  onOpen: (modal) => {},
  onClose: (modal) => {}
});

// Programmatic control
modal.open();
modal.close();
```

### Configuration

```javascript
{
  closeOnBackdropClick: true,  // Close on backdrop click
  closeOnEscape: true,         // Close on Esc key
  lockScroll: true,            // Lock body scroll
  onOpen: (modal) => {},       // Callback on open
  onClose: (modal) => {}       // Callback on close
}
```

### Keyboard Navigation

- **Tab** - Cycle through focusable elements (trapped within modal)
- **Shift + Tab** - Reverse cycle
- **Esc** - Close modal

---

## Offcanvas

Slide-out side panels with focus trap and full accessibility support.

### Features

- ✅ Full ARIA attributes (role="dialog", aria-modal="true")
- ✅ Focus trap - Tab cycles only within offcanvas
- ✅ Return focus - Returns focus to trigger after close
- ✅ Scroll lock - Locks body scroll when open
- ✅ Escape to close
- ✅ Backdrop click to close
- ✅ 4 positions (left, right, top, bottom)

### Installation

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-offcanvas.core.css">
<link rel="stylesheet" href="css/a11y-offcanvas.theme.css">

<!-- JavaScript -->
<script src="js/a11y-offcanvas.js"></script>
```

### Basic Usage

```html
<!-- Trigger button -->
<button data-offcanvas-trigger="menu">Open Menu</button>

<!-- Offcanvas -->
<div data-offcanvas id="menu">
  <div data-position="left" data-offcanvas-panel>
    <div data-offcanvas-header>
      <h2 data-offcanvas-title>Menu</h2>
      <button data-offcanvas-close aria-label="Close menu">×</button>
    </div>
    <div data-offcanvas-body>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </div>
</div>
```

### Positions

```html
<!-- Left (default) -->
<div data-offcanvas-panel data-position="left">

<!-- Right -->
<div data-offcanvas-panel data-position="right">

<!-- Top -->
<div data-offcanvas-panel data-position="top">

<!-- Bottom -->
<div data-offcanvas-panel data-position="bottom">
```

### Animations

**Customizing animation:**

```html
<div data-offcanvas style="--a11y-offcanvas-duration: 0.5s;">
  <!-- offcanvas content -->
</div>
```

```css
:root {
  --a11y-offcanvas-duration: 0.3s;
  --a11y-offcanvas-easing: ease-in-out;
}
```

**Disable animations:**

```html
<div data-offcanvas data-no-animation>
  <!-- offcanvas without animations -->
</div>
```

---

## 🌐 Browser Support

Tested and working in:

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **iOS Safari** 14+
- **Android Chrome** 90+

## 🏗️ CSS Architecture

All components use a **separated core/theme architecture**:

### Core CSS (`*.core.css`)

Contains only logic, positioning, layout, and behavior:
- Positioning (relative, absolute, z-index)
- Layout structure (display, flex, grid)
- Visibility states
- Animations
- Responsive breakpoints

**Do not modify** unless changing component functionality.

### Theme CSS (`*.theme.css`)

Contains all visual styling:
- Colors (background, border, text)
- Spacing (padding, margin)
- Typography
- Borders and border-radius
- Shadows
- Dark mode
- High contrast mode

**Customize freely** to match your design system.

## 🎨 Creating Custom Themes

1. Copy the theme CSS file:
```bash
cp a11y-dropdown.theme.css my-custom-theme.css
```

2. Modify CSS variables and styles

3. Update your HTML:
```html
<link rel="stylesheet" href="css/a11y-dropdown.core.css">
<link rel="stylesheet" href="css/my-custom-theme.css">
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Development Setup

```bash
# Clone repository
git clone https://github.com/5ulo/accessible-kit.git
cd accessible-kit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Running Tests

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with a focus on accessibility and usability, following:
- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- Modern web standards and best practices

## 💬 Support

- 📖 [Documentation](https://5ulo.github.io/accessible-kit/)
- 🐛 [Issue Tracker](https://github.com/5ulo/accessible-kit/issues)

---

Made with ♿ and ❤️ for a more accessible web.
