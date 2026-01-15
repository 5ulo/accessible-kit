# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-01-15

### Added
- **Dropdown - Multiple ARIA Pattern Support**: Added `data-dropdown-role` attribute to support dialog and listbox patterns in addition to the default menu pattern
  - **New attribute**: `data-dropdown-role` accepts `"menu"` (default), `"dialog"`, or `"listbox"`
  - Automatically sets appropriate `aria-haspopup` value based on role type:
    - `role="menu"` → `aria-haspopup="true"`
    - `role="dialog"` → `aria-haspopup="dialog"`
    - `role="listbox"` → `aria-haspopup="listbox"`
  - Conditionally applies correct item roles (`menuitem`, none for dialog, `option` for listbox)
  - Pattern-specific keyboard navigation:
    - Menu/listbox: Arrow keys, Home/End, Tab closes dropdown
    - Dialog: Arrow keys, Tab navigates within (doesn't close)
  - **Use case example**: Radio playlists, media controls, or complex interactive widgets that aren't semantic "menus"
  - Added comprehensive documentation and live example (radio playlist) to demo page
  - Updated README with ARIA pattern guidance and when to use each pattern
  - **Backwards compatible**: Defaults to `"menu"` pattern, existing implementations unchanged

## [1.0.5] - 2025-12-21

### Fixed
- **Focus Trap - Manual Tab Navigation**: Complete rewrite of Tab key handling in Offcanvas and Modal components
  - **BREAKING CHANGE in behavior**: Focus trap now completely overrides native browser Tab behavior
  - Always prevents default Tab action and manually controls focus movement
  - Eliminates `aria-hidden` violations caused by browser trying to focus hidden elements
  - `updateFocusableElements()` is called on every Tab keypress to catch dynamic DOM changes
  - Focus only moves through elements in the filtered `focusableElements` list
  - Properly handles nested collapse components - focus skips closed submenus and includes opened ones

### Details
**Problem solved:**
When using Tab key in offcanvas/modal with dynamic content (e.g., collapse menus), the browser's native Tab behavior would attempt to focus elements with `aria-hidden="true"`, causing console warnings and accessibility violations.

**Solution:**
The focus trap now takes complete control of Tab navigation:
1. Every Tab keypress prevents default browser behavior
2. Updates the list of focusable elements to reflect current DOM state
3. Manually calculates and focuses the next/previous element from the filtered list
4. Elements inside `aria-hidden="true"` containers are never focused

This ensures perfect compatibility with dynamic components like animated collapse panels in navigation menus.

## [1.0.4] - 2025-12-21

### Fixed
- **Focus Trap - Initial Implementation**: Improved focus trap in Offcanvas and Modal components
  - Focus trap now correctly excludes elements with `aria-hidden="true"` and their children
  - Fixed timing issue where `updateFocusableElements()` was called before CSS visibility changes applied
  - Focus trap now properly skips hidden elements in collapsed/nested components
  - Added comprehensive filtering for hidden, invisible, and aria-hidden elements
  - Removed `visibility: hidden` check from filter to prevent false positives during panel opening
  - Works correctly with both animated (CSS Grid) and non-animated collapse panels

### Added
- Added `:focus-visible` styles to Offcanvas theme for better keyboard navigation visibility
- Added navigation demo with nested collapse submenus to Offcanvas demo page

### Details
The focus trap improvements ensure that keyboard navigation works correctly in complex scenarios:
- When offcanvas/modal contains collapse components, Tab key properly skips hidden submenu items
- Focus is set after CSS transitions complete, preventing "no focusable elements" issue
- Users can now navigate nested menus with full accessibility support

## [1.0.3] - 2025-12-20

### Fixed
- **CSS Architecture**: Fixed inconsistent placement of animations in Offcanvas and Modal components
- Moved `transition` properties from `theme.css` to `core.css` for Offcanvas component
- Moved `transition` properties from `theme.css` to `core.css` for Modal component
- Animations now work out-of-the-box even when using custom themes without importing `theme.css`

### Changed
- Updated `package.json` exports to include `style` condition for better CSS import compatibility
- Improved CSS imports documentation for Tailwind CSS and other bundlers

### Details
All components now follow consistent CSS architecture:
- **Core CSS** (`*.core.css`): Contains layout, positioning, behavior, and **animations**
- **Theme CSS** (`*.theme.css`): Contains only visual styling (colors, spacing, borders, shadows)

This ensures animations work correctly even when developers create custom themes.

## [1.0.2] - 2025-12-20

### Changed
- Minor version bump for package.json exports improvements

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

[1.0.6]: https://github.com/5ulo/accessible-kit/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/5ulo/accessible-kit/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/5ulo/accessible-kit/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/5ulo/accessible-kit/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/5ulo/accessible-kit/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/5ulo/accessible-kit/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/5ulo/accessible-kit/releases/tag/v1.0.0
