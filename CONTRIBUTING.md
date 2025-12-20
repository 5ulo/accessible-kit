# Contributing to Accessible Kit

First off, thank you for considering contributing to Accessible Kit! It's people like you that make this library better for everyone.

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our commitment to accessibility and inclusivity. By participating, you are expected to uphold a respectful and welcoming environment for all contributors.

## 📋 Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing](#testing)
- [Documentation](#documentation)

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. Chrome 120, Firefox 121, Safari 17]
 - Assistive Technology: [if applicable, e.g. NVDA, JAWS, VoiceOver]
 - Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **Specify which component(s)** it affects
- **Include mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? You can start by looking through `good-first-issue` and `help-wanted` issues:

- **good-first-issue** - Issues that should only require a few lines of code
- **help-wanted** - Issues that are a bit more involved

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/my-bug-fix
   ```
3. **Make your changes** following our [Coding Guidelines](#coding-guidelines)
4. **Test your changes** thoroughly
5. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   # or
   git commit -m "Fix: description of what you fixed"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```
7. **Submit a Pull Request** to our `main` branch

**Pull Request Guidelines:**

- Fill in the PR template completely
- Include screenshots/GIFs for UI changes
- Update documentation if needed
- Add/update tests as necessary
- Ensure all tests pass
- Keep PRs focused - one feature/fix per PR
- Reference related issues

## Development Setup

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x or yarn >= 1.22.x

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/accessible-kit.git
# Or clone the main repository
git clone https://github.com/5ulo/accessible-kit.git
cd accessible-kit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow

```bash
# Start dev server with hot reload
npm run dev

# Build all components
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format
```

## Project Structure

```
accessible-kit/
├── src/
│   ├── js/                    # JavaScript components
│   │   ├── index.js           # Main entry point
│   │   ├── a11y-dropdown.js   # Dropdown component
│   │   ├── a11y-tabs.js       # Tabs component
│   │   ├── a11y-accordion.js  # Accordion component
│   │   ├── a11y-modal.js      # Modal component
│   │   └── a11y-offcanvas.js  # Offcanvas component
│   ├── css/                   # Stylesheets
│   │   ├── *.core.css         # Core logic/behavior CSS
│   │   └── *.theme.css        # Visual styling CSS
│   └── demo/                  # Demo HTML files
│       ├── dropdown.html
│       ├── tabs.html
│       └── ...
├── tests/                     # Test files (coming soon)
├── docs/                      # Additional documentation
├── package.json
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Coding Guidelines

### JavaScript Style

- Use **vanilla JavaScript** (ES6+)
- **No dependencies** - keep the library lightweight
- Use **descriptive variable names**
- Add **JSDoc comments** for public APIs
- Follow **functional programming** principles where appropriate

**Example:**

```javascript
/**
 * Opens the dropdown menu
 * @param {HTMLElement} dropdown - The dropdown element
 * @returns {void}
 */
function openDropdown(dropdown) {
  dropdown.setAttribute('aria-expanded', 'true');
  dropdown.classList.add('is-open');
}
```

### CSS Style

We use a **dual CSS architecture**:

#### Core CSS (`*.core.css`)

- Contains **only logic, positioning, and behavior**
- Uses data attributes for selectors: `[data-dropdown]`
- No colors, fonts, or decorative styling
- **Should rarely need changes**

```css
/* Good - Core CSS */
[data-dropdown-menu] {
  position: absolute;
  display: none;
  z-index: 1000;
}

[data-dropdown-menu].is-open {
  display: block;
}

/* Bad - Don't put styling in core */
[data-dropdown-menu] {
  background: white;  /* ❌ Belongs in theme */
  padding: 1rem;      /* ❌ Belongs in theme */
}
```

#### Theme CSS (`*.theme.css`)

- Contains **all visual styling**
- Colors, spacing, typography, shadows
- Can be completely replaced for custom themes

```css
/* Good - Theme CSS */
[data-dropdown-menu] {
  background: var(--dropdown-bg, white);
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  [data-dropdown-menu] {
    background: var(--dropdown-bg-dark, #333);
  }
}
```

### HTML Attributes

- Use **data attributes** for component functionality: `data-dropdown`, `data-tabs`
- Use **ARIA attributes** for accessibility: `role`, `aria-expanded`, `aria-label`
- Use **classes** only for styling (not JS hooks)

## Accessibility Requirements

**All contributions MUST maintain WCAG 2.1 Level AA compliance.**

### Required Accessibility Features

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Implement proper focus management
   - Support standard keyboard patterns (arrows, Enter, Space, Esc, Tab)

2. **Screen Reader Support**
   - Use proper ARIA roles and attributes
   - Provide meaningful labels (`aria-label`, `aria-labelledby`)
   - Announce state changes (`aria-expanded`, `aria-selected`)
   - Use `aria-live` regions for dynamic content

3. **Focus Management**
   - Visible focus indicators
   - Focus trap for modal/offcanvas components
   - Return focus to trigger element when closing

4. **Semantic HTML**
   - Use proper HTML5 elements (`button`, `nav`, `dialog`)
   - Proper heading hierarchy
   - Logical tab order

5. **User Preferences**
   - Respect `prefers-reduced-motion`
   - Support `prefers-color-scheme`
   - Support `prefers-contrast`

### Testing with Assistive Technology

Before submitting a PR, test with:

- **NVDA** (Windows) or **VoiceOver** (macOS/iOS)
- Keyboard-only navigation
- Browser DevTools accessibility inspector
- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension

## Testing

### Manual Testing

1. **Keyboard Testing**
   ```
   - Tab through all interactive elements
   - Use arrow keys for navigation
   - Test Enter/Space for activation
   - Test Escape for closing
   ```

2. **Screen Reader Testing**
   - Enable screen reader (NVDA/VoiceOver)
   - Navigate through component
   - Verify all announcements are meaningful
   - Check state changes are announced

3. **Visual Testing**
   - Test in all supported browsers
   - Test dark mode
   - Test high contrast mode
   - Test at different zoom levels (100%, 200%, 400%)
   - Test responsive breakpoints

### Automated Testing (Coming Soon)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Code Comments

- Add JSDoc comments for all public methods
- Explain **why**, not just **what**
- Document parameters and return types

```javascript
/**
 * Toggles the accordion panel open/closed
 * Uses CSS Grid for smooth height animation without knowing content height
 *
 * @param {HTMLElement} panel - The accordion panel to toggle
 * @param {boolean} forceState - Optional: force specific state (true=open, false=closed)
 * @returns {void}
 */
function togglePanel(panel, forceState) {
  // Implementation
}
```

### README Updates

If you add/change features, update:

- **README.md** - Main documentation
- **Component examples** - Usage examples
- **Demo files** - Working demos

### Commit Message Format

Use clear, descriptive commit messages:

```
<type>: <subject>

<body (optional)>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

**Examples:**

```bash
git commit -m "feat: add vertical tabs orientation"
git commit -m "fix: dropdown keyboard navigation on mobile"
git commit -m "docs: update accordion API documentation"
```

## Questions?

Don't hesitate to ask questions by:

- Opening a [GitHub Discussion](https://github.com/5ulo/accessible-kit/discussions)
- Creating an issue with the `question` label
- Reaching out to maintainers

## Recognition

Contributors will be recognized in:

- **README.md** contributors section (coming soon)
- Release notes for significant contributions
- Our hearts ❤️

---

Thank you for contributing to make the web more accessible! 🙏
