# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-20

### Changed
- **BREAKING**: Removed automatic initialization from all components
- Components now require manual initialization via `initComponentName()` functions
- Removed global `window.a11yKit` namespace registration
- Updated all demo HTML files to use manual initialization with `DOMContentLoaded`
- Updated documentation and examples in README.md to reflect manual initialization
- Updated all component usage examples to show proper initialization pattern

### Fixed
- Fixed dropdown instance tracking - replaced `window.a11yKit._dropdownInstances` with static class property `AccessibleDropdown.instances`
- Fixed tree-shaking compatibility - `sideEffects: false` in package.json now works correctly
- Fixed module bundler compatibility (Astro, Vite, Webpack) - no more side effects on import

### Added
- Static instance tracking for dropdown component using `AccessibleDropdown.instances`

### Migration Guide (1.0.0 → 1.0.1)

#### Before (1.0.0):
```javascript
// Components initialized automatically on import
import 'accessible-kit/dropdown';
// Dropdown was auto-initialized
```

#### After (1.0.1):
```javascript
// Manual initialization required
import { initDropdowns } from 'accessible-kit/dropdown';

document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
});
```

#### Benefits of this change:
- ✅ True tree-shaking support - only used components are bundled
- ✅ SSR framework compatibility (Astro, Next.js, SvelteKit)
- ✅ Better control over initialization timing
- ✅ No unwanted side effects on import
- ✅ Follows modern JavaScript best practices

## [1.0.0] - 2024-12-XX

### Added
- Initial release
- Dropdown component with full ARIA support
- Tabs component following WAI-ARIA Tabs Pattern
- Accordion/Collapse components with keyboard navigation
- Modal component with focus trap
- Offcanvas component with slide-out panels
- Complete keyboard navigation support
- Dark mode and high contrast mode support
- Reduced motion support
- Separated core/theme CSS architecture
- Zero dependencies
- Full TypeScript-ready exports

[1.0.1]: https://github.com/5ulo/accessible-kit/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/5ulo/accessible-kit/releases/tag/v1.0.0
