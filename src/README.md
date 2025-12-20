# a11y-kit

Lightweight, accessible UI component library with full ARIA support. Zero dependencies, vanilla JavaScript.

Kolekcia plne prístupných UI komponentov pre moderné webové aplikácie. Vanilla JavaScript, žiadne závislosti.

## Inštalácia

### NPM

```bash
npm install a11y-kit
```

### Yarn

```bash
yarn add a11y-kit
```

### CDN (príklad použitia priamo v HTML)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/a11y-kit/src/css/a11y-dropdown.core.css">
<link rel="stylesheet" href="https://unpkg.com/a11y-kit/src/css/a11y-dropdown.theme.css">

<!-- JavaScript -->
<script src="https://unpkg.com/a11y-kit/src/js/a11y-dropdown.js"></script>
```

### Lokálna inštalácia (stiahnutie súborov)

Stiahnite súbory z GitLab/GitHub a includujte ich do vášho projektu.

## Dostupné komponenty

### ✅ Hotové (v1.0)

- ✅ [Dropdown](#dropdown) - Prístupné rozbaľovacie menu
- ✅ [Tabs](#tabs) - Prístupné záložky
- ✅ [Offcanvas](#offcanvas) - Vysúvacie bočné menu s focus trapom
- ✅ [Modal](#modal) - Modálne okná s focus trapom
- ✅ [Collapse](#collapse) - Standalone collapse toggle pre show/hide funkcionalitu
- ✅ [Accordion](#accordion) - Prístupný accordion s klávesovou navigáciou

### 🚧 Roadmap (v1.1+)

- 🔜 **Tooltip** - Prístupný tooltip s ARIA podporou a pozicionovaním
- 🔜 **Toast/Notification** - Live region announcements s auto-dismiss
- 🔜 **Toggle Switch** - Switch s localStorage/preferences podporou
- 🔜 **Popover** - Interaktívny popover s positioning a focus management
- 🔜 **Alert/Banner** - ARIA alert s dismissible podporou
- 🔜 **Combobox/Autocomplete** - Komplexný ARIA pattern pre search a autocomplete

## Všeobecné vlastnosti

- ✅ Plná podpora ARIA atribútov
- ✅ Kompletná klávesová navigácia
- ✅ Focus management pre screen readery
- ✅ Žiadne závislosti (vanilla JS)
- ✅ Responzívny dizajn
- ✅ Dark mode podpora
- ✅ High contrast mode podpora
- ✅ Reduced motion podpora
- ✅ Oddelený core a theme CSS

## Inicializácia komponentov

Každý komponent v a11y-kit môže byť inicializovaný viacerými spôsobmi podľa vašich potrieb:

### 1. Automatická inicializácia (CDN / priame súbory)

Pri použití cez `<script>` tag sa komponenty automaticky inicializujú po načítaní DOM:

```html
<script src="js/a11y-dropdown.js"></script>
<!-- Dropdown sa automaticky inicializuje -->
```

### 2. CDN s window.a11yKit namespace (odporúčané pre CDN)

```html
<script src="js/a11y-dropdown.js"></script>
<script src="js/a11y-tabs.js"></script>
<script src="js/a11y-modal.js"></script>
<!-- Alebo všetko naraz -->
<script src="js/index.js"></script>

<script>
  // Cez globálny namespace (odporúčané - žiadne kolízie)
  a11yKit.initAll(); // inicializuje všetky komponenty

  // Alebo jednotlivo
  a11yKit.initDropdowns();
  a11yKit.initTabs();
  a11yKit.initCollapses();
  a11yKit.initAccordions();

  // Bootstrap štýl - krátke aliasy pre manuálnu inicializáciu
  const dropdown = new a11yKit.Dropdown(element, options);
  const modal = new a11yKit.Modal(element, options);
  const tabs = new a11yKit.Tabs(element, options);
  const collapse = new a11yKit.Collapse();
  const accordion = new a11yKit.Accordion();
</script>
```

### 3. Manuálna inicializácia (so zakázaním auto-init)

```html
<script>
  // Zakázať auto-inicializáciu
  window.a11yKitManualInit = true;
</script>
<script src="js/a11y-dropdown.js"></script>
<script>
  // Potom volať manuálne cez namespace
  a11yKit.initDropdowns();

  // Alebo priamo (backwards compatible)
  initDropdowns();
</script>
```

### 4. ES6 Module import (Astro, Vite, Webpack)

#### Named import - init funkcie

```javascript
// S .js príponou (explicitné)
import { initDropdowns } from './a11y-kit/a11y-dropdown.js';
import { initTabs } from './a11y-kit/a11y-tabs.js';

// Bez .js prípony (podľa bundlera)
import { initDropdowns } from './a11y-kit/a11y-dropdown';
import { initTabs } from './a11y-kit/a11y-tabs';

// Inicializovať
initDropdowns();
initTabs();
```

#### Named import - krátke aliasy (Bootstrap štýl)

```javascript
// Import krátkych aliasov pre manuálnu inicializáciu z index.js:
import { Dropdown, Modal, Tabs, Collapse, Accordion } from './a11y-kit/index.js';

// Použitie ako Bootstrap
const dropdown = new Dropdown(element, {
  closeOnSelect: true,
  onOpen: (instance) => {
    console.log('Dropdown opened!');
  }
});

const modal = new Modal(element, options);
const tabs = new Tabs(element, options);
const collapse = new Collapse();
const accordion = new Accordion();
```

**Poznámka:** `.js` prípona je voliteľná a závisí od vášho bundlera a konfigurácie. Astro, Vite a moderné bundlery zvyčajne podporujú oba spôsoby.

#### Wildcard import

```javascript
// Import všetkého z index.js
import * as a11yKit from './a11y-kit/index.js';

// Init funkcie:
a11yKit.initDropdowns();
a11yKit.initTabs();
a11yKit.initModals();
a11yKit.initCollapses();
a11yKit.initAccordions();
a11yKit.initAll(); // všetko naraz

// Alebo Bootstrap štýl s krátkymi aliasmi:
const dropdown = new a11yKit.Dropdown(element, options);
const modal = new a11yKit.Modal(element, options);
const collapse = new a11yKit.Collapse();
const accordion = new a11yKit.Accordion();
```

#### Import len určitých komponentov (tree-shaking)

```javascript
// Import init funkcie + class pre flexibility
import { initDropdowns, Dropdown } from './a11y-kit/a11y-dropdown';

// Auto-init všetky dropdowny na stránke
initDropdowns();

// ALEBO vytvoriť špecifickú inštanciu (Bootstrap štýl)
const myDropdown = new Dropdown(element, {
  closeOnSelect: true,
  onOpen: (instance) => {
    console.log('Dropdown opened!');
  }
});
```

### 5. Inicializácia s callbackmi a options

Každý komponent podporuje voliteľné options a callbacky:

```javascript
// Import - krátky alias (odporúčané)
import { Dropdown } from './a11y-kit/a11y-dropdown';

// Alebo plný názov (backwards compatible)
import { AccessibleDropdown } from './a11y-kit/a11y-dropdown';

const dropdown = new Dropdown(element, {
  closeOnSelect: true,           // Zatvorí po výbere položky
  closeOnOutsideClick: true,     // Zatvorí pri kliku mimo
  closeOnEscape: true,           // Zatvorí pri Escape
  onOpen: (instance) => {
    console.log('Otvorené!');
  },
  onClose: (instance) => {
    console.log('Zatvorené!');
  },
  onSelect: (item, index) => {
    console.log('Vybraná položka:', item.textContent);
  }
});
```

### 6. NPM package import

```javascript
// Init všetkého naraz
import { initAll } from 'a11y-kit';
initAll();

// Wildcard
import * as a11yKit from 'a11y-kit';
a11yKit.initDropdowns();
// alebo Bootstrap štýl:
const modal = new a11yKit.Modal(element, options);

// Špecifické komponenty (tree-shaking)
import { initDropdowns, Dropdown } from 'a11y-kit/dropdown';
import { initTabs, Tabs } from 'a11y-kit/tabs';

// Init funkcia:
initDropdowns();
// alebo Bootstrap štýl:
const dropdown = new Dropdown(element, options);
```

### Ktorý spôsob použiť?

- 🌐 **CDN / priame súbory** → `window.a11yKit` namespace (odporúčané, žiadne kolízie)
- ⚡ **Rýchla inicializácia** → `a11yKit.initAll()` alebo `initDropdowns()`
- 🎯 **Bootstrap štýl (manuálna kontrola)** → `new a11yKit.Dropdown()` alebo `new Dropdown()`
- 📦 **Module bundler** → ES6 import s `initComponentName()` alebo `Dropdown` class
- 🔧 **Potrebujete callbacky** → `new Dropdown(element, options)` s callbacks
- 📉 **Malý bundle size** → Named imports len potrebných komponentov (tree-shaking)
- 💨 **Rýchle prototypovanie** → Wildcard `import * as a11yKit` + `initAll()`

## Architektúra CSS

Všetky komponenty majú CSS rozdelený na dve časti:

### Core CSS (`.core.css`)
Obsahuje iba logiku a správanie:
- Positioning a layout
- Visibility states
- Transform animácie
- Štruktúru komponentu

**Neupravujte**, pokiaľ nemeníte funkčnosť.

### Theme CSS (`.theme.css`)
Obsahuje vizuálne nastavenia:
- Farby, spacing, typography
- Borders, shadows, transitions
- Dark mode, high contrast
- Responsive breakpoints

**Upravujte** pre zmenu vzhľadu alebo vytvorte vlastnú tému.

## Filozofia: Data atribúty vs triedy

Komponenty používajú **data atribúty** ako primárne CSS selektory:
- `[data-tabs]`, `[data-tabs-tab]`, `[data-tabs-panel]` - pre základný styling
- `[data-dropdown]`, `[data-dropdown-button]` - pre dropdown

**Data atribúty pre varianty**:
- `data-variant="boxed"`, `data-variant="pills"` - vizuálne varianty
- `data-orientation="vertical"` - vertikálne tabs
- `data-animation="fade"` - fade animácia

**Triedy** sa používajú len pre voliteľné styling elementy:
- **Helpery**: `.tabs__tab-badge`, `.tabs__tab-icon` (iba vizuálne utility)

**Výhody tohto prístupu:**
- Menej verbózny HTML
- JS a CSS používajú rovnaké hooky
- Triedy voľné pre customizáciu
- Jasná separácia: data-* = funkčnosť, class = varianty

---

# Dropdown

Plne prístupný dropdown komponent s podporou klávesovej navigácie a ARIA atribútov.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov
- ✅ Klávesová navigácia (šípky, Enter, Space, Esc, Home, End)
- ✅ Focus management
- ✅ Automatické zatváranie pri kliku mimo
- ✅ Konfigurovateľné správanie
- ✅ CSS Grid animácie default (vypnutie cez data-no-animation)
- ✅ Viacero variantov (nav, language)
- ✅ Automatická podpora prefers-reduced-motion

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-dropdown.core.css">
<link rel="stylesheet" href="css/a11y-dropdown.theme.css">

<!-- JavaScript -->
<script src="js/a11y-dropdown.js"></script>
```

## Použitie

### Základná štruktúra

Dropdown má **CSS Grid animácie default** pri otváraní/zatváraní menu.

```html
<div class="dropdown" data-dropdown>
    <button class="dropdown__button" data-dropdown-button>
        Možnosti
        <span class="dropdown__arrow"></span>
    </button>
    <div class="dropdown__menu" data-dropdown-menu>
        <!-- Prvý div: overflow wrapper (overflow: hidden, grid-row: 1/span 2) -->
        <div>
            <!-- Druhý div: content wrapper (padding) -->
            <div>
                <button class="dropdown__item" data-dropdown-item>Upraviť</button>
                <button class="dropdown__item" data-dropdown-item>Duplikovať</button>
                <hr class="dropdown__divider">
                <button class="dropdown__item" data-dropdown-item>Odstrániť</button>
            </div>
        </div>
    </div>
</div>
```

**Dôležité pre animáciu:**
- Potrebná štruktúra: `data-dropdown-menu > wrapper (overflow) > obsah (padding)`
- Prvý vnorený div: technický wrapper s `overflow: hidden` (BEZ paddingu)
- Druhý vnorený div: kontajner pre obsah (má padding)
- Animácia: CSS Grid (`grid-template-rows: 0fr → 1fr`)
- Funguje bez potreby poznať výšku menu vopred

### Animácie

**Nastavenie rýchlosti animácie:**

```html
<!-- Inline pomocou style atribútu -->
<div data-dropdown style="--a11y-dropdown-duration: 0.5s;">
    <button data-dropdown-button>Menu</button>
    <div data-dropdown-menu>
        <div>
            <div>
                <button data-dropdown-item>Item 1</button>
                <button data-dropdown-item>Item 2</button>
            </div>
        </div>
    </div>
</div>

<!-- Vlastný easing -->
<div data-dropdown style="--a11y-dropdown-duration: 0.3s; --a11y-dropdown-easing: ease-in-out;">
    <!-- dropdown menu -->
</div>
```

```css
/* Alebo globálne v CSS */
:root {
    --a11y-dropdown-duration: 0.25s;
    --a11y-dropdown-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Dostupné CSS custom properties:**
- `--a11y-dropdown-duration` - Dĺžka animácie (default: `0.2s`)
- `--a11y-dropdown-easing` - Easing funkcia (default: `ease`)

**Vypnutie animácií:**

Ak chcete vypnúť animácie pre konkrétny dropdown, použite atribút `data-no-animation`:

```html
<div class="dropdown" data-dropdown>
    <button class="dropdown__button" data-dropdown-button>
        Menu bez animácie
        <span class="dropdown__arrow"></span>
    </button>
    <div class="dropdown__menu" data-dropdown-menu data-no-animation>
        <div>
            <div>
                <button class="dropdown__item" data-dropdown-item>Upraviť</button>
                <button class="dropdown__item" data-dropdown-item>Odstrániť</button>
            </div>
        </div>
    </div>
</div>
```

**Automatická podpora prefers-reduced-motion:**

Animácie sa automaticky vypnú pre používateľov, ktorí majú nastavené `prefers-reduced-motion: reduce` v prehliadači alebo operačnom systéme. Nemusíte nič nastavovať.

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initDropdowns();

// Manuálna inicializácia
const dropdown = new AccessibleDropdown(element, {
    closeOnSelect: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    hoverDelay: 0,
    onOpen: (dropdown) => {},
    onClose: (dropdown) => {},
    onSelect: (item, index) => {}
});
```

## Konfigurácia

### Data atribúty

```html
<!-- Nechá dropdown otvorený po výbere -->
<div class="dropdown" data-dropdown data-close-on-select="false">

<!-- Zakáže zatvorenie pri kliku mimo -->
<div class="dropdown" data-dropdown data-close-on-outside-click="false">

<!-- Oneskorenie hover efektu (ms) -->
<div class="dropdown" data-dropdown data-hover-delay="200">
```

### JavaScript options

```javascript
{
    closeOnSelect: true,           // Zatvorí dropdown po výbere položky
    closeOnOutsideClick: true,     // Zatvorí dropdown pri kliku mimo
    closeOnEscape: true,           // Zatvorí dropdown pri stlačení Escape
    hoverDelay: 0,                 // Oneskorenie pre hover efekt (ms)
    onOpen: (dropdown) => {},      // Callback po otvorení
    onClose: (dropdown) => {},     // Callback po zatvorení
    onSelect: (item, index) => {}  // Callback po výbere položky
}
```

## Klávesová navigácia

- **Enter** / **Space** - Otvorí/zatvorí menu alebo vyberie položku
- **↓** / **↑** - Navigácia medzi položkami
- **Home** / **End** - Skok na prvú/poslednú položku
- **Esc** - Zatvorí menu a vráti focus na tlačidlo
- **Tab** - Zatvorí menu a presunie focus ďalej

## Varianty

### Navigačné menu

```html
<div data-dropdown data-variant="nav">
    <!-- ... -->
</div>
```

### Prepínač jazykov

```html
<div data-dropdown data-variant="language">
    <!-- ... -->
</div>
```

### Menu zarovnané doprava

```html
<div data-dropdown-menu="right">
    <div>
        <div>
            <!-- položky -->
        </div>
    </div>
</div>
```

## Demo

Kompletnú demo stránku nájdete v [demo/dropdown.html](demo/dropdown.html)

---

# Tabs

Plne prístupné záložky s podporou klávesovej navigácie podľa WAI-ARIA Tabs Pattern.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov (role, aria-selected, aria-controls)
- ✅ Klávesová navigácia (šípky, Home, End)
- ✅ Automatická aj manuálna aktivácia
- ✅ Focus management
- ✅ Podpora disabled tabov
- ✅ Horizontálna aj vertikálna orientácia
- ✅ Viacero vizuálnych variantov (basic, boxed, pills)
- ✅ Fade animácie default (vypnutie cez data-no-animation)
- ✅ Automatická podpora prefers-reduced-motion

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-tabs.core.css">
<link rel="stylesheet" href="css/a11y-tabs.theme.css">

<!-- JavaScript -->
<script src="js/a11y-tabs.js"></script>
```

## Použitie

### Základná štruktúra

```html
<div data-tabs>
    <div role="tablist" data-tabs-list>
        <button data-tabs-tab>Tab 1</button>
        <button data-tabs-tab>Tab 2</button>
        <button data-tabs-tab>Tab 3</button>
    </div>

    <div data-tabs-panel>
        Obsah tabu 1
    </div>

    <div data-tabs-panel>
        Obsah tabu 2
    </div>

    <div data-tabs-panel>
        Obsah tabu 3
    </div>
</div>
```

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initTabs();

// Manuálna inicializácia
const tabs = new AccessibleTabs(element, {
    activeIndex: 0,           // Počiatočný aktívny tab
    automatic: true,          // Automatická aktivácia pri arrow keys
    orientation: 'horizontal', // 'horizontal' alebo 'vertical'
    onChange: (tab, panel, index) => {},
    onTabClick: (tab, index) => {}
});
```

## Konfigurácia

### Data atribúty

```html
<!-- Nastaviť počiatočný aktívny tab -->
<div class="tabs" data-tabs data-active-index="1">

<!-- Manuálna aktivácia (vyžaduje Enter/Space) -->
<div class="tabs" data-tabs data-automatic="false">

<!-- Vertikálna orientácia -->
<div class="tabs" data-tabs data-orientation="vertical">
```

### JavaScript options

```javascript
{
    activeIndex: 0,                    // Počiatočný aktívny tab (0-based)
    automatic: true,                   // Auto aktivácia pri arrow keys
    orientation: 'horizontal',         // 'horizontal' alebo 'vertical'
    onChange: (tab, panel, index) => {}, // Callback pri zmene tabu
    onTabClick: (tab, index) => {}     // Callback pri kliknutí
}
```

## Klávesová navigácia

### Horizontálne tabs
- **←** / **→** - Navigácia medzi tabmi
- **Home** - Skok na prvý tab
- **End** - Skok na posledný tab
- **Enter** / **Space** - Aktivuje tab (pri manuálnej aktivácii)
- **Tab** - Presunie focus do obsahu panelu

### Vertikálne tabs
- **↑** / **↓** - Navigácia medzi tabmi
- **Home** / **End** - Prvý/posledný tab
- **Enter** / **Space** - Aktivuje tab
- **Tab** - Do obsahu panelu

## Varianty

### Boxed variant

```html
<div data-tabs data-variant="boxed">
    <!-- tabs s rámčekom okolo obsahu -->
    <!-- pre boxed pridajte aj data-tabs-panels wrapper -->
    <div data-tabs-panels>...</div>
</div>
```

### Pills variant

```html
<div data-tabs data-variant="pills">
    <!-- tabs v štýle pills/buttons -->
</div>
```

### Vertikálne tabs

```html
<div data-tabs data-orientation="vertical">
    <div role="tablist" data-tabs-list>
        <button data-tabs-tab>Tab 1</button>
        <button data-tabs-tab>Tab 2</button>
    </div>

    <div data-tabs-panels>
        <div data-tabs-panel>Obsah 1</div>
        <div data-tabs-panel>Obsah 2</div>
    </div>
</div>
```

### Animácie

Tabs majú **fade animáciu default** pri prepínaní medzi panelmi. Plynulý prechod sa aplikuje automaticky.

```html
<div data-tabs>
    <div role="tablist" data-tabs-list>
        <button data-tabs-tab>Tab 1</button>
        <button data-tabs-tab>Tab 2</button>
    </div>

    <div data-tabs-panels>
        <div data-tabs-panel>Obsah 1</div>
        <div data-tabs-panel>Obsah 2</div>
    </div>
</div>
```

**Nastavenie rýchlosti animácie:**

```html
<!-- Inline pomocou style atribútu -->
<div data-tabs style="--a11y-tabs-duration: 0.5s;">
    <!-- tabs -->
</div>
```

```css
/* Alebo globálne v CSS */
:root {
    --a11y-tabs-duration: 0.3s;
    --a11y-tabs-easing: ease-in-out;
}
```

**Dostupné CSS custom properties:**
- `--a11y-tabs-duration` - Dĺžka animácie (default: `0.2s`)
- `--a11y-tabs-easing` - Easing funkcia (default: `ease`)

**Vypnutie animácií:**

Ak chcete vypnúť fade animáciu pre konkrétny tabs komponent, použite atribút `data-no-animation`:

```html
<div data-tabs data-no-animation>
    <div role="tablist" data-tabs-list>
        <button data-tabs-tab>Tab 1</button>
        <button data-tabs-tab>Tab 2</button>
    </div>

    <div data-tabs-panels>
        <div data-tabs-panel>Obsah 1 - prepne sa okamžite</div>
        <div data-tabs-panel>Obsah 2 - prepne sa okamžite</div>
    </div>
</div>
```

**Automatická podpora prefers-reduced-motion:**

Animácie sa automaticky vypnú pre používateľov, ktorí majú nastavené `prefers-reduced-motion: reduce` v prehliadači alebo operačnom systéme. Nemusíte nič nastavovať.

### Disabled tab

```html
<button data-tabs-tab disabled>Disabled Tab</button>
```

### Tabs s badge

```html
<button data-tabs-tab>
    Aktívne
    <span class="tabs__tab-badge">12</span>
</button>
<!-- Poznámka: .tabs__tab-badge je helper trieda pre styling -->
```

### Tabs s ikonami

```html
<button data-tabs-tab>
    <span class="tabs__tab-icon">
        📊 Štatistiky
    </span>
</button>
<!-- Poznámka: .tabs__tab-icon je helper trieda pre styling -->
```

## Demo

Kompletnú demo stránku nájdete v [demo/tabs.html](demo/tabs.html)

---

# Offcanvas

Vysúvacie bočné menu s focus trapom a plnou a11y podporou podľa WAI-ARIA Dialog Pattern.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov (role="dialog", aria-modal="true")
- ✅ Focus trap - Tab cykluje iba cez elementy v offcanvas
- ✅ Return focus - Po zatvorení vráti focus na trigger
- ✅ Scroll lock - Zamkne scrollovanie body
- ✅ Escape na zatvorenie
- ✅ Backdrop click na zatvorenie
- ✅ 4 pozície (left, right, top, bottom)
- ✅ Konfigurovateľné správanie

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-offcanvas.core.css">
<link rel="stylesheet" href="css/a11y-offcanvas.theme.css">

<!-- JavaScript -->
<script src="js/a11y-offcanvas.js"></script>
```

## Použitie

### Základná štruktúra

```html
<!-- Trigger button -->
<button data-offcanvas-trigger="my-offcanvas">Otvoriť menu</button>

<!-- Offcanvas -->
<div data-offcanvas id="my-offcanvas">
    <div data-position="left" data-offcanvas-panel>
        <div data-offcanvas-header>
            <h2 data-offcanvas-title>Nadpis</h2>
            <button data-offcanvas-close aria-label="Zatvoriť">&times;</button>
        </div>

        <div data-offcanvas-body>
            Obsah offcanvas...
        </div>

        <!-- Voliteľný footer -->
        <div data-offcanvas-footer>
            <button data-offcanvas-close>Zatvoriť</button>
        </div>
    </div>

    <div data-offcanvas-backdrop></div>
</div>
```

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initOffcanvas();

// Manuálna inicializácia
const offcanvas = new AccessibleOffcanvas(element, {
    closeOnBackdrop: true,      // Zatvorí pri kliku na backdrop
    closeOnEscape: true,        // Zatvorí pri stlačení Escape
    trapFocus: true,            // Aktivuje focus trap
    scrollLock: true,           // Zamkne scrollovanie body
    onOpen: (instance) => {},   // Callback po otvorení
    onClose: (instance) => {}   // Callback po zatvorení
});
```

## Animácie

Offcanvas používa **transform animácie** (translateX/translateY) pre plynulé vysúvanie panelu.

### Základná animácia (default)

Animácia je aktívna automaticky s predvolenou rýchlosťou `0.3s` a `ease` easingom.

```html
<!-- Offcanvas s default animáciou -->
<div data-offcanvas id="my-offcanvas">
    <div data-position="left" data-offcanvas-panel>
        <div data-offcanvas-header>
            <h2 data-offcanvas-title>Menu</h2>
            <button data-offcanvas-close aria-label="Zatvoriť">&times;</button>
        </div>
        <div data-offcanvas-body>
            Obsah...
        </div>
    </div>
    <div data-offcanvas-backdrop></div>
</div>
```

### Vlastná rýchlosť animácie

Rýchlosť animácie sa dá nastaviť pomocou CSS custom properties.

```html
<!-- Pomalá animácia (0.6s) -->
<div data-offcanvas id="slow-offcanvas" style="--a11y-offcanvas-duration: 0.6s;">
    <div data-position="left" data-offcanvas-panel>
        <!-- obsah -->
    </div>
    <div data-offcanvas-backdrop></div>
</div>

<!-- Rýchla animácia (0.15s) -->
<div data-offcanvas id="fast-offcanvas" style="--a11y-offcanvas-duration: 0.15s;">
    <div data-position="right" data-offcanvas-panel>
        <!-- obsah -->
    </div>
    <div data-offcanvas-backdrop></div>
</div>

<!-- Vlastný easing -->
<div data-offcanvas id="custom-offcanvas"
     style="--a11y-offcanvas-duration: 0.4s; --a11y-offcanvas-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);">
    <div data-position="top" data-offcanvas-panel>
        <!-- obsah -->
    </div>
    <div data-offcanvas-backdrop></div>
</div>
```

```css
/* Alebo globálne v CSS */
[data-offcanvas] {
    --a11y-offcanvas-duration: 0.25s;
    --a11y-offcanvas-easing: ease-in-out;
}
```

**Dostupné CSS custom properties:**
- `--a11y-offcanvas-duration` - Dĺžka animácie (default: `0.3s`)
- `--a11y-offcanvas-easing` - Easing funkcia (default: `ease`)

**Dôležité:**
- Animácia sa automaticky vypne pri `prefers-reduced-motion: reduce`
- Animuje sa panel (transform) aj backdrop (opacity)

## Konfigurácia

### Data atribúty

```html
<!-- Zakáže zatvorenie pri kliku na backdrop -->
<div data-offcanvas data-close-on-backdrop="false">

<!-- Zakáže focus trap -->
<div data-offcanvas data-trap-focus="false">

<!-- Zakáže scroll lock -->
<div data-offcanvas data-scroll-lock="false">
```

### JavaScript options

```javascript
{
    closeOnBackdrop: true,      // Zatvorí pri kliku na backdrop
    closeOnEscape: true,        // Zatvorí pri Escape
    trapFocus: true,            // Focus trap aktívny
    scrollLock: true,           // Body scroll lock
    onOpen: (instance) => {},   // Callback po otvorení
    onClose: (instance) => {}   // Callback po zatvorení
}
```

## Klávesová navigácia

- **Tab** - Navigácia medzi focusable elementmi (s focus trapom)
- **Shift + Tab** - Spätná navigácia (s focus trapom)
- **Esc** - Zatvorí offcanvas a vráti focus na trigger

## Focus Trap

Focus trap zabezpečuje, že keď je offcanvas otvorený:
- Tab cykluje iba cez focusable elementy v offcanvas
- Shift+Tab cykluje spätne
- Focus nemôže uniknúť mimo offcanvas
- Po zatvorení sa focus vráti na trigger button

## Pozície

### Zľava

```html
<div data-position="left" data-offcanvas-panel>
    <!-- Výška 100%, width 320px -->
</div>
```

### Zprava

```html
<div data-position="right" data-offcanvas-panel>
    <!-- Výška 100%, width 320px -->
</div>
```

### Zhora

```html
<div data-position="top" data-offcanvas-panel>
    <!-- Šírka 100%, max-height 50vh -->
</div>
```

### Zdola

```html
<div data-position="bottom" data-offcanvas-panel>
    <!-- Šírka 100%, max-height 50vh -->
</div>
```

## Varianty

### Široký variant

```html
<div data-position="left" data-width="wide" data-offcanvas-panel>
    <!-- Width 480px namiesto 320px -->
</div>
```

### Full height (pre top/bottom)

```html
<div data-position="top" data-width="full" data-offcanvas-panel>
    <!-- Max-height 100vh namiesto 50vh -->
</div>
```

### S footrom

```html
<div data-offcanvas-panel>
    <div data-offcanvas-header>...</div>
    <div data-offcanvas-body>...</div>
    <div data-offcanvas-footer>
        <button>Zrušiť</button>
        <button>Potvrdiť</button>
    </div>
</div>
```

## Demo

Kompletnú demo stránku nájdete v [demo/offcanvas.html](demo/offcanvas.html)

---

# Modal

Plne prístupné modálne okno s focus trapom podľa WAI-ARIA Dialog Pattern.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov (role="dialog", aria-modal="true")
- ✅ Focus trap - Tab cykluje iba cez elementy v modali
- ✅ Return focus - Po zatvorení vráti focus na trigger
- ✅ Scroll lock - Zamkne scrollovanie body
- ✅ Escape na zatvorenie
- ✅ Backdrop click na zatvorenie
- ✅ Viacero veľkostí (sm, md, lg, fullscreen)
- ✅ Konfigurovateľné správanie

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-modal.core.css">
<link rel="stylesheet" href="css/a11y-modal.theme.css">

<!-- JavaScript -->
<script src="js/a11y-modal.js"></script>
```

## Použitie

### Základná štruktúra

```html
<!-- Trigger button -->
<button data-modal-trigger="my-modal">Otvoriť modal</button>

<!-- Modal -->
<div data-modal id="my-modal">
    <div data-modal-dialog>
        <div data-modal-header>
            <h2 data-modal-title>Nadpis</h2>
            <button data-modal-close aria-label="Zatvoriť">&times;</button>
        </div>

        <div data-modal-body>
            Obsah modalu...
        </div>

        <div data-modal-footer>
            <button data-modal-close>Zrušiť</button>
            <button>Potvrdiť</button>
        </div>
    </div>

    <div data-modal-backdrop></div>
</div>
```

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initModals();

// Manuálna inicializácia
const modal = new AccessibleModal(element, {
    closeOnBackdrop: true,      // Zatvorí pri kliku na backdrop
    closeOnEscape: true,        // Zatvorí pri stlačení Escape
    trapFocus: true,            // Aktivuje focus trap
    scrollLock: true,           // Zamkne scrollovanie body
    onOpen: (instance) => {},   // Callback po otvorení
    onClose: (instance) => {}   // Callback po zatvorení
});
```

## Konfigurácia

### Data atribúty

```html
<!-- Zakáže zatvorenie pri kliku na backdrop -->
<div data-modal data-close-on-backdrop="false">

<!-- Zakáže focus trap -->
<div data-modal data-trap-focus="false">

<!-- Zakáže scroll lock -->
<div data-modal data-scroll-lock="false">
```

### JavaScript options

```javascript
{
    closeOnBackdrop: true,      // Zatvorí pri kliku na backdrop
    closeOnEscape: true,        // Zatvorí pri Escape
    trapFocus: true,            // Focus trap aktívny
    scrollLock: true,           // Body scroll lock
    onOpen: (instance) => {},   // Callback po otvorení
    onClose: (instance) => {}   // Callback po zatvorení
}
```

## Klávesová navigácia

- **Tab** - Navigácia medzi focusable elementmi (s focus trapom)
- **Shift + Tab** - Spätná navigácia (s focus trapom)
- **Esc** - Zatvorí modal a vráti focus na trigger

## Focus Trap

Focus trap zabezpečuje, že keď je modal otvorený:
- Tab cykluje iba cez focusable elementy v modali
- Shift+Tab cykluje spätne
- Focus nemôže uniknúť mimo modal
- Po zatvorení sa focus vráti na trigger button

## Veľkosti

### Small (400px)

```html
<div data-modal-dialog data-size="sm">
    <!-- Obsah -->
</div>
```

### Medium (600px) - predvolené

```html
<div data-modal-dialog>
    <!-- Obsah -->
</div>
```

### Large (800px)

```html
<div data-modal-dialog data-size="lg">
    <!-- Obsah -->
</div>
```

### Fullscreen

```html
<div data-modal-dialog data-size="fullscreen">
    <!-- Obsah -->
</div>
```

## Varianty

### Potvrdzovacie dialógy

```html
<div data-modal id="confirm-delete">
    <div data-modal-dialog data-size="sm">
        <div data-modal-header>
            <h2 data-modal-title>Potvrdiť odstránenie</h2>
            <button data-modal-close>&times;</button>
        </div>

        <div data-modal-body>
            <p>Naozaj chcete odstrániť túto položku?</p>
        </div>

        <div data-modal-footer>
            <button data-modal-close>Zrušiť</button>
            <button data-modal-close>Odstrániť</button>
        </div>
    </div>

    <div data-modal-backdrop></div>
</div>
```

### S formulárom

```html
<div data-modal id="modal-form">
    <div data-modal-dialog>
        <div data-modal-header>
            <h2 data-modal-title>Kontaktný formulár</h2>
            <button data-modal-close>&times;</button>
        </div>

        <div data-modal-body>
            <form>
                <input type="text" placeholder="Meno">
                <input type="email" placeholder="Email">
                <textarea placeholder="Správa"></textarea>
            </form>
        </div>

        <div data-modal-footer>
            <button data-modal-close>Zrušiť</button>
            <button>Odoslať</button>
        </div>
    </div>

    <div data-modal-backdrop></div>
</div>
```

### Scrollovateľný obsah

```html
<div data-modal-body>
    <!-- Dlhý obsah -->
    <!-- Modal body automaticky pridá scrollbar -->
</div>
```

## Demo

Kompletnú demo stránku nájdete v [demo/modal.html](demo/modal.html)

---

# Collapse

Samostatný collapse komponent pre show/hide funkcionalitu. Jednoduché prepínanie viditeľnosti obsahu pomocou tlačidla.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov (aria-expanded, aria-controls, aria-labelledby)
- ✅ Dynamické texty pre show/hide stavy (aria-label sa mení automaticky)
- ✅ Podpora viacerých panelov naraz (cez CSS selector)
- ✅ CSS Grid animácie default (vypnutie cez data-no-animation)
- ✅ Automatická podpora prefers-reduced-motion
- ✅ Jednoduchá integrácia

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-accordion.core.css">
<link rel="stylesheet" href="css/a11y-accordion.theme.css">

<!-- JavaScript -->
<script src="js/a11y-accordion.js"></script>
```

## Použitie

### Základný collapse (bez animácie)

Samostatné tlačidlo, ktoré prepína viditeľnosť panelu cez CSS selector. Panel sa zobrazí/skryje okamžite.

```html
<!-- S ID selektorom -->
<button data-collapse-toggle="#panel-1">
    Otvoriť panel
</button>

<div id="panel-1">
    <div>
        <div>
            <p>Obsah panelu...</p>
        </div>
    </div>
</div>
```

### Animácie

Collapse má **CSS Grid animácie default** pri otváraní/zatváraní.

```html
<button data-collapse-toggle="#panel">
    Otvoriť panel
</button>

<div id="panel">
    <!-- Prvý div: overflow wrapper (overflow: hidden, grid-row: 1/span 2) -->
    <div>
        <!-- Druhý div: content wrapper (padding) -->
        <div>
            <p>Obsah panelu s plynulou animáciou...</p>
        </div>
    </div>
</div>
```

**Dôležité pre animáciu:**
- Potrebná štruktúra: `panel > wrapper (overflow) > obsah (padding)`
- Prvý vnorený div: technický wrapper s `overflow: hidden` (BEZ paddingu)
- Druhý vnorený div: kontajner pre obsah (má padding)
- Animácia: CSS Grid (`grid-template-rows: 0fr → 1fr`)
- Funguje bez potreby poznať výšku obsahu vopred

**Nastavenie rýchlosti animácie:**

```html
<!-- Inline pomocou style atribútu na paneli -->
<div id="panel" style="--a11y-accordion-duration: 0.5s;">
    <div>
        <div>Obsah...</div>
    </div>
</div>
```

```css
/* Alebo globálne v CSS */
:root {
    --a11y-accordion-duration: 0.4s;
    --a11y-accordion-easing: ease-in-out;
}
```

**Dostupné CSS custom properties:**
- `--a11y-accordion-duration` - Dĺžka animácie (default: `0.3s`)
- `--a11y-accordion-easing` - Easing funkcia (default: `ease`)

**Vypnutie animácií:**

Ak chcete vypnúť animácie pre konkrétny panel, použite atribút `data-no-animation`:

```html
<button data-collapse-toggle="#no-animation-panel">
    Bez animácie
</button>

<div id="no-animation-panel" data-no-animation>
    <div>
        <div>
            <p>Tento panel sa zobrazí/skryje okamžite bez animácie.</p>
        </div>
    </div>
</div>
```

**Automatická podpora prefers-reduced-motion:**

Animácie sa automaticky vypnú pre používateľov, ktorí majú nastavené `prefers-reduced-motion: reduce` v prehliadači alebo operačnom systéme. Nemusíte nič nastavovať.

### Viacero panelov naraz

Jeden button môže ovládať viacero panelov pomocou class selektora alebo ľubovoľného CSS selektora.

```html
<!-- S class selektorom (ovláda viacero panelov naraz) -->
<button data-collapse-toggle=".info-panel">
    Prepnúť všetky info panely
</button>

<div class="info-panel">
    <div>
        <div>Panel 1</div>
    </div>
</div>
<div class="info-panel">
    <div>
        <div>Panel 2</div>
    </div>
</div>
<div class="info-panel">
    <div>
        <div>Panel 3</div>
    </div>
</div>

<!-- S ľubovoľným selektorom -->
<button data-collapse-toggle="[data-section='details']">
    Prepnúť detaily
</button>

<div data-section="details">
    <div>
        <div>Detail 1</div>
    </div>
</div>
<div data-section="details">
    <div>
        <div>Detail 2</div>
    </div>
</div>
```

### Dynamické texty (data-text-for-show / data-text-for-hide)

Button môže meniť svoj aria-label a viditeľný text podľa stavu (otvorené/zatvorené).

```html
<button
    data-collapse-toggle="#detail-panel"
    data-text-for-show="Zobraziť detail"
    data-text-for-hide="Skryť detail">
    <span>Zobraziť detail</span>
</button>

<div id="detail-panel">
    <div>
        <div>
            <p>Detailný obsah...</p>
        </div>
    </div>
</div>
```

**Správanie:**
- Keď je panel ZATVORENÝ → aria-label = "Zobraziť detail", text v `<span>` = "Zobraziť detail"
- Keď je panel OTVORENÝ → aria-label = "Skryť detail", text v `<span>` = "Skryť detail"
- Button **musí obsahovať** `<span>` element, v ktorom sa mení text
- `aria-expanded` atribút sa automaticky nastavuje na `true`/`false`

### Oddelené aria-label texty (data-aria-label-for-show / data-aria-label-for-hide)

Ak chcete mať odlišné texty pre aria-label a viditeľný text v `<span>`, použite samostatné atribúty:

```html
<button
    data-collapse-toggle=".info-panel"
    data-text-for-show="Zobraziť všetko"
    data-text-for-hide="Skryť všetko"
    data-aria-label-for-show="Zobraziť všetky info panely"
    data-aria-label-for-hide="Skryť všetky info panely">
    <span>Zobraziť všetko</span>
</button>
```

**Správanie:**
- Keď je panel ZATVORENÝ → aria-label = "Zobraziť všetky info panely", text v `<span>` = "Zobraziť všetko"
- Keď je panel OTVORENÝ → aria-label = "Skryť všetky info panely", text v `<span>` = "Skryť všetko"

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initCollapses();

// Manuálna inicializácia (Bootstrap štýl)
const collapse = new Collapse();

// Alebo cez namespace (CDN)
const collapse = new a11yKit.Collapse();
```

---

# Accordion

Plne prístupný accordion komponent s klávesovou navigáciou podľa WAI-ARIA Accordion Pattern. Pre samostatné collapse toggles použite [Collapse](#collapse) komponent.

## Vlastnosti

- ✅ Plná podpora ARIA atribútov (aria-expanded, aria-controls, role="region")
- ✅ Klávesová navigácia (Arrow keys, Home, End)
- ✅ Single aj multiple expand modes
- ✅ Toggle all funkcionality (jeden button s dynamickým textom a ikonou)
- ✅ Standalone collapse toggles (button + panel via selector)
- ✅ Dynamické texty pre show/hide stavy (aria-label sa mení automaticky)
- ✅ CSS Grid animácie default (vypnutie cez data-no-animation)
- ✅ Viacero vizuálnych variantov
- ✅ Automatická podpora prefers-reduced-motion

## Inštalácia

```html
<!-- CSS -->
<link rel="stylesheet" href="css/a11y-accordion.core.css">
<link rel="stylesheet" href="css/a11y-accordion.theme.css">

<!-- JavaScript -->
<script src="js/a11y-accordion.js"></script>
```

## Použitie

### Základný accordion (Single Expand)

Iba jedna sekcia môže byť otvorená naraz.

```html
<div data-accordion>
    <div data-accordion-item>
        <button data-accordion-trigger>
            Sekcia 1
        </button>
        <div data-accordion-panel>
            <div>
                <div>
                    Obsah sekcie 1
                </div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>
            Sekcia 2
        </button>
        <div data-accordion-panel>
            <div>
                <div>
                    Obsah sekcie 2
                </div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>
            Sekcia 3
        </button>
        <div data-accordion-panel>
            <div>
                <div>
                    Obsah sekcie 3
                </div>
            </div>
        </div>
    </div>
</div>
```

### Animácie

Accordion má **CSS Grid animácie default** pri otváraní/zatváraní.

```html
<div data-accordion>
    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 1</button>
        <div data-accordion-panel>
            <!-- Prvý div: overflow wrapper (overflow: hidden, grid-row: 1/span 2) -->
            <div>
                <!-- Druhý div: content wrapper (padding) -->
                <div>
                    Obsah sekcie 1
                </div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 2</button>
        <div data-accordion-panel>
            <div>
                <div>
                    Obsah sekcie 2
                </div>
            </div>
        </div>
    </div>
</div>
```

**Dôležité pre animáciu:**
- Potrebná štruktúra: `data-accordion-panel > wrapper (overflow) > obsah (padding)`
- Prvý vnorený div: technický wrapper s `overflow: hidden` (BEZ paddingu)
- Druhý vnorený div: kontajner pre obsah (má padding)
- Animácia: CSS Grid (`grid-template-rows: 0fr → 1fr`)
- Funguje bez potreby poznať výšku obsahu vopred
- Animácia sa automaticky vypne pri `prefers-reduced-motion: reduce`

**Vlastná rýchlosť animácie:**

```html
<!-- Inline pomocou style atribútu -->
<div data-accordion style="--a11y-accordion-duration: 0.6s;">
    <!-- accordion items -->
</div>

<!-- Vlastný easing -->
<div data-accordion style="--a11y-accordion-duration: 0.4s; --a11y-accordion-easing: ease-in-out;">
    <!-- accordion items -->
</div>
```

```css
/* Alebo globálne v CSS */
[data-accordion] {
    --a11y-accordion-duration: 0.5s;
    --a11y-accordion-easing: ease-in-out;
}
```

**Dostupné CSS custom properties:**
- `--a11y-accordion-duration` - Dĺžka animácie (default: `0.3s`)
- `--a11y-accordion-easing` - Easing funkcia (default: `ease`)

**Vypnutie animácií:**

```html
<!-- Vypnúť animácie pre konkrétny accordion -->
<div data-accordion data-no-animation>
    <!-- panely sa prepínajú okamžite bez animácie -->
</div>
```

**Automatická podpora prefers-reduced-motion:**
- Animácie sa automaticky vypnú, ak má používateľ v systéme nastavené `prefers-reduced-motion: reduce`
- Nemusíte nič programovať, funguje automaticky

### Multiple Expand Accordion

Viacero sekcií môže byť otvorených súčasne.

```html
<div data-accordion data-accordion-multiple>
    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 1</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 1</div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 2</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 2</div>
            </div>
        </div>
    </div>
</div>
```

### JavaScript inicializácia

```javascript
// Automatická inicializácia
initAccordions();

// Manuálna inicializácia
const accordion = new AccessibleAccordion();
```

## Klávesová navigácia

V accordion groups:

- **↓** - Presun na ďalší trigger
- **↑** - Presun na predchádzajúci trigger
- **Home** - Presun na prvý trigger
- **End** - Presun na posledný trigger
- **Enter** / **Space** - Toggle accordion item

## Rozšírené použitie

### Toggle All Control

Jedno toggle tlačidlo, ktoré prepína všetky sekcie naraz. Tlačidlo automaticky mení text a ikonu podľa stavu.

```html
<div data-accordion data-accordion-multiple>
    <!-- Toggle control na vrchu (vytvorí sa automaticky) -->
    <div data-accordion-controls="top"></div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 1</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 1</div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 2</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 2</div>
            </div>
        </div>
    </div>

    <!-- Toggle control na spodku (vytvorí sa automaticky) -->
    <div data-accordion-controls="bottom"></div>
</div>
```

**Správanie:**
- Keď sú všetky sekcie zatvorené → text v `<span>` = "Otvoriť všetko", aria-label = "Otvoriť všetky panely", ikona = plus (+)
- Keď sú všetky sekcie otvorené → text v `<span>` = "Zatvoriť všetko", aria-label = "Zatvoriť všetky panely", ikona = mínus (−)
- `aria-expanded` atribút reflektuje aktuálny stav (`true`/`false`)
- `aria-controls` obsahuje ID všetkých panelov, ktoré tlačidlo ovláda
- Ak existujú viaceré toggle buttony (top a bottom), všetky sa synchronizujú pri kliknutí

**Default hodnoty pre automaticky generovaný toggle button:**
- `data-text-for-show="Otvoriť všetko"`
- `data-text-for-hide="Zatvoriť všetko"`
- `data-aria-label-for-show="Otvoriť všetky panely"`
- `data-aria-label-for-hide="Zatvoriť všetky panely"`

### Custom Toggle All Button

Ak chcete vlastný toggle button namiesto automaticky generovaného:

```html
<div data-accordion data-accordion-multiple>
    <div data-accordion-controls="top">
        <button
            data-accordion-toggle-all
            data-text-for-show="Rozbaliť všetko"
            data-text-for-hide="Zbaliť všetko"
            data-aria-label-for-show="Rozbaliť všetky sekcie"
            data-aria-label-for-hide="Zbaliť všetky sekcie">
            <svg aria-hidden="true" width="16" height="16">
              <path class="toggle-icon-expand" d="M8 3v10M3 8h10" stroke="currentColor"/>
              <path class="toggle-icon-collapse" d="M3 8h10" stroke="currentColor" style="display: none;"/>
            </svg>
            <span>Rozbaliť všetko</span>
        </button>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 1</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 1</div>
            </div>
        </div>
    </div>

    <div data-accordion-item>
        <button data-accordion-trigger>Sekcia 2</button>
        <div data-accordion-panel>
            <div>
                <div>Obsah 2</div>
            </div>
        </div>
    </div>
</div>
```

**Dôležité:**
- Button **musí obsahovať** `<span>` element pre dynamický text
- Ikony používajú triedy `.toggle-icon-expand` a `.toggle-icon-collapse` pre prepínanie
- Atribút `data-accordion-toggle-all` je povinný

### Dynamické texty (data-text-for-show / data-text-for-hide)

Button môže meniť svoj aria-label podľa stavu (otvorené/zatvorené):

```html
<div data-accordion data-accordion-multiple>
    <div data-accordion-item>
        <button
            data-accordion-trigger
            data-text-for-show="Rozbaliť informácie"
            data-text-for-hide="Zabaliť informácie">
            Rozbaliť informácie
        </button>
        <div data-accordion-panel>
            <div>
                <div>
                    Obsah...
                </div>
            </div>
        </div>
    </div>
</div>
```

## Varianty

### Bordered variant

Accordion bez okrajov, iba s oddeľovačmi medzi položkami.

```html
<div data-accordion data-variant="bordered">
    <!-- accordion items -->
</div>
```

### Separated variant

Accordion s väčším odstupom a tieňom medzi položkami.

```html
<div data-accordion data-variant="separated" data-accordion-multiple>
    <!-- accordion items -->
</div>
```

### Compact variant

Menšie paddingy a font size pre kompaktnejší vzhľad.

```html
<div data-accordion data-size="compact">
    <!-- accordion items -->
</div>
```

### Large variant

Väčšie paddingy a font size pre výraznejší vzhľad.

```html
<div data-accordion data-size="large">
    <!-- accordion items -->
</div>
```

## Data atribúty - prehľad

### Collapse (standalone toggles)

- `data-collapse-toggle="selector"` - Na buttone, CSS selector panelu/panelov
- `data-text-for-show="text"` - Text v `<span>` keď je panel zatvorený (aj aria-label ak nie je nastavený aria-label atribút)
- `data-text-for-hide="text"` - Text v `<span>` keď je panel otvorený (aj aria-label ak nie je nastavený aria-label atribút)
- `data-aria-label-for-show="text"` - Voliteľný: Samostatný aria-label text pre zatvorený stav
- `data-aria-label-for-hide="text"` - Voliteľný: Samostatný aria-label text pre otvorený stav

### Accordion groups

- `data-accordion` - Označuje accordion skupinu
- `data-accordion-multiple` - Povolí multiple expand
- `data-accordion-item` - Jednotlivý accordion item
- `data-accordion-trigger` - Button na toggle accordion item
- `data-accordion-panel` - Panel s obsahom
- `data-accordion-controls="top|bottom"` - Kontajner pre toggle all button (vytvorí sa automaticky)
- `data-accordion-toggle-all` - Toggle button na prepnutie všetkých sekcií (automaticky generovaný alebo vlastný)
- `data-text-for-show="text"` - Text v `<span>` pre zatvorený stav (na accordion trigger alebo toggle all buttone)
- `data-text-for-hide="text"` - Text v `<span>` pre otvorený stav
- `data-aria-label-for-show="text"` - Voliteľný: Samostatný aria-label text pre zatvorený stav
- `data-aria-label-for-hide="text"` - Voliteľný: Samostatný aria-label text pre otvorený stav

## Demo

Kompletnú demo stránku nájdete v [demo/accordion.html](demo/accordion.html)

---

## Použitie s module bundlermi

Všetky komponenty podporujú ES6 import/export pre použitie s Webpack, Vite, Astro, atď.

> **💡 Tip:** Pre prehľad všetkých spôsobov inicializácie (CDN, manuálne, ES6 import) pozrite sekciu [Inicializácia komponentov](#inicializácia-komponentov) vyššie.

### Použitie s NPM package

#### 1. Import všetkých komponentov naraz

```javascript
// Import všetkých komponentov naraz
import { initAll } from 'a11y-kit';

// Auto-initialize všetky komponenty
initAll();
```

#### 2. Wildcard import (importovať všetko, volať postupne)

```javascript
// Import všetkých exportov ako namespace
import * as a11yKit from 'a11y-kit';

// Init funkcie:
a11yKit.initAll(); // všetko naraz
a11yKit.initDropdowns();
a11yKit.initTabs();
a11yKit.initModals();
a11yKit.initCollapses();
a11yKit.initAccordions();

// Bootstrap štýl - krátke aliasy (odporúčané):
const dropdown = new a11yKit.Dropdown(element, options);
const tabs = new a11yKit.Tabs(element, options);
const modal = new a11yKit.Modal(element, options);
const collapse = new a11yKit.Collapse();
const accordion = new a11yKit.Accordion();

// Alebo plné názvy (backwards compatible):
const dropdown2 = new a11yKit.AccessibleDropdown(element, options);
const collapse2 = new a11yKit.AccessibleCollapse();
```

#### 3. Named imports (len špecifické komponenty)

```javascript
// Init funkcie
import { initDropdowns } from 'a11y-kit/dropdown';
import { initTabs } from 'a11y-kit/tabs';
import { initModals } from 'a11y-kit/modal';

// Alebo Bootstrap štýl - krátke aliasy
import { Dropdown, Modal, Tabs } from 'a11y-kit/dropdown';
// alebo jednotlivo:
import { Dropdown } from 'a11y-kit/dropdown';
import { Tabs } from 'a11y-kit/tabs';

// CSS import
import 'a11y-kit/styles/dropdown-core';
import 'a11y-kit/styles/dropdown-theme';
import 'a11y-kit/styles/tabs-core';
import 'a11y-kit/styles/tabs-theme';

// Initialize - init funkcie:
initDropdowns();
initTabs();
initModals();

// Alebo Bootstrap štýl:
const dropdown = new Dropdown(element, options);
const tabs = new Tabs(element, options);
```

### Astro (s NPM package)

```javascript
// src/scripts/main.js
import { initAll } from 'a11y-kit';

// Inicializovať všetky komponenty
document.addEventListener('DOMContentLoaded', () => {
    initAll();
});
```

### Astro (lokálne súbory bez NPM)

#### Named imports (štandardný spôsob)

```javascript
// src/scripts/main.js

// S .js príponou (explicitné)
import { initDropdowns } from '../assets/js/a11y-kit/a11y-dropdown.js';
import { initTabs } from '../assets/js/a11y-kit/a11y-tabs.js';
import { initModals } from '../assets/js/a11y-kit/a11y-modal.js';
import { initAccordions } from '../assets/js/a11y-kit/a11y-accordion.js';

// ALEBO bez .js prípony (podľa konfigurácie bundlera)
import { initDropdowns } from '../assets/js/a11y-kit/a11y-dropdown';
import { initTabs } from '../assets/js/a11y-kit/a11y-tabs';
import { initModals } from '../assets/js/a11y-kit/a11y-modal';
import { initAccordions } from '../assets/js/a11y-kit/a11y-accordion';

// Inicializovať komponenty
initDropdowns();
initTabs();
initModals();
initAccordions();
```

#### Wildcard import z jednotlivých súborov

```javascript
// Import všetkých exportov z jednotlivých súborov ako namespace

// S .js príponou
import * as dropdown from '../assets/js/a11y-kit/a11y-dropdown.js';
import * as tabs from '../assets/js/a11y-kit/a11y-tabs.js';

// ALEBO bez .js prípony
import * as dropdown from '../assets/js/a11y-kit/a11y-dropdown';
import * as tabs from '../assets/js/a11y-kit/a11y-tabs';
import * as modal from '../assets/js/a11y-kit/a11y-modal';
import * as accordion from '../assets/js/a11y-kit/a11y-accordion';

// Potom volať funkcie:
dropdown.initDropdowns();
tabs.initTabs();
modal.initModals();
accordion.initAccordions();

// Alebo vytvoriť manuálne instance:
const myDropdown = new dropdown.AccessibleDropdown(element, options);
const myTabs = new tabs.AccessibleTabs(element, options);
```

#### Import cez index.js (všetko naraz)

```javascript
// Import všetkého z index.js ako namespace

// S .js príponou
import * as a11yKit from '../assets/js/a11y-kit/index.js';

// ALEBO bez .js prípony
import * as a11yKit from '../assets/js/a11y-kit/index';
// alebo ešte kratšie (ak bundler automaticky hľadá index):
import * as a11yKit from '../assets/js/a11y-kit';

// Volať funkcie postupne:
a11yKit.initDropdowns();
a11yKit.initTabs();
a11yKit.initModals();

// Alebo všetko naraz:
a11yKit.initAll();
```

**Dôležité pre Astro:**
- Všetky JavaScript súbory teraz používajú ES6 exports
- Auto-initialize sa deaktivuje automaticky v module bundler prostredí
- Môžete volať `initDropdowns()` a ostatné funkcie kedykoľvek

**Príklad Astro Layout s lokálnymi súbormi:**

```astro
---
// src/layouts/Layout.astro
---

<html>
  <head>
    <!-- Import CSS -->
    <link rel="stylesheet" href="/assets/css/a11y-kit/a11y-dropdown.core.css">
    <link rel="stylesheet" href="/assets/css/a11y-kit/a11y-dropdown.theme.css">
    <link rel="stylesheet" href="/assets/css/a11y-kit/a11y-tabs.core.css">
    <link rel="stylesheet" href="/assets/css/a11y-kit/a11y-tabs.theme.css">
  </head>
  <body>
    <slot />

    <script>
      // Variant 1: Named imports (s .js príponou)
      import { initDropdowns } from '/src/assets/js/a11y-kit/a11y-dropdown.js';
      import { initTabs } from '/src/assets/js/a11y-kit/a11y-tabs.js';

      initDropdowns();
      initTabs();
    </script>

    <!-- ALEBO -->

    <script>
      // Variant 2: Named imports (bez .js prípony)
      import { initDropdowns } from '/src/assets/js/a11y-kit/a11y-dropdown';
      import { initTabs } from '/src/assets/js/a11y-kit/a11y-tabs';

      initDropdowns();
      initTabs();
    </script>

    <!-- ALEBO -->

    <script>
      // Variant 3: Wildcard import z index.js
      import * as a11yKit from '/src/assets/js/a11y-kit/index.js';

      a11yKit.initAll(); // všetko naraz

      // alebo postupne:
      // a11yKit.initDropdowns();
      // a11yKit.initTabs();
    </script>

    <!-- ALEBO -->

    <script>
      // Variant 4: Wildcard import (kratšie, bez index.js)
      import * as a11yKit from '/src/assets/js/a11y-kit';

      a11yKit.initAll();
    </script>
  </body>
</html>
```

### Webpack / Vite

#### Variant 1: Import všetkého naraz (s NPM package)

```javascript
// main.js
import 'a11y-kit/styles/dropdown-core';
import 'a11y-kit/styles/dropdown-theme';
import 'a11y-kit/styles/tabs-core';
import 'a11y-kit/styles/tabs-theme';
import 'a11y-kit/styles/offcanvas-core';
import 'a11y-kit/styles/offcanvas-theme';
import 'a11y-kit/styles/modal-core';
import 'a11y-kit/styles/modal-theme';
import 'a11y-kit/styles/accordion-core';
import 'a11y-kit/styles/accordion-theme';

import { initAll } from 'a11y-kit';

// Auto-initialize všetky komponenty
initAll();
```

#### Variant 2: Wildcard import (s NPM package)

```javascript
import * as a11yKit from 'a11y-kit';

// Volať postupne
a11yKit.initDropdowns();
a11yKit.initTabs();

// Alebo všetko
a11yKit.initAll();
```

#### Variant 3: Lokálne súbory (bez NPM)

```javascript
// S .js príponou
import { initDropdowns } from './a11y-kit/a11y-dropdown.js';
import { initTabs } from './a11y-kit/a11y-tabs.js';

// ALEBO bez .js prípony
import { initDropdowns } from './a11y-kit/a11y-dropdown';
import { initTabs } from './a11y-kit/a11y-tabs';

initDropdowns();
initTabs();
```

#### Variant 4: Wildcard import z lokálnych súborov

```javascript
// Kratšie - bundler automaticky hľadá index.js
import * as a11yKit from './a11y-kit';

// Alebo explicitne s index.js
import * as a11yKit from './a11y-kit/index.js';

a11yKit.initAll();
```

### Manuálna inicializácia (pre špecifické use cases)

```javascript
// S NPM package
import { AccessibleDropdown, AccessibleTabs, AccessibleModal } from 'a11y-kit';

// ALEBO z lokálnych súborov (s .js príponou)
import { AccessibleDropdown } from './a11y-kit/a11y-dropdown.js';
import { AccessibleTabs } from './a11y-kit/a11y-tabs.js';

// ALEBO z lokálnych súborov (bez .js prípony)
import { AccessibleDropdown } from './a11y-kit/a11y-dropdown';
import { AccessibleTabs } from './a11y-kit/a11y-tabs';

// Inicializovať len konkrétne instance s callbackmi
const myDropdown = new AccessibleDropdown(
    document.getElementById('my-dropdown'),
    {
        closeOnSelect: true,
        onSelect: (item, index) => {
            console.log('Selected:', item.textContent);
        }
    }
);

const myTabs = new AccessibleTabs(
    document.querySelector('[data-tabs]'),
    {
        activeIndex: 1,
        onChange: (tab, panel, index) => {
            console.log('Tab changed to:', index);
        }
    }
);
```

### Tree-shaking (len potrebné komponenty)

```javascript
// S NPM package - importovať len to čo potrebuješ
import { initDropdowns } from 'a11y-kit/dropdown';
import 'a11y-kit/styles/dropdown-core';
import 'a11y-kit/styles/dropdown-theme';

// ALEBO z lokálnych súborov
import { initDropdowns } from './a11y-kit/a11y-dropdown.js';
// alebo bez .js prípony:
import { initDropdowns } from './a11y-kit/a11y-dropdown';

// Len dropdown bude v bundle (ostatné komponenty budú vynechané)
initDropdowns();
```

### Poznámka o .js príponách

**Kedy používať `.js` príponu?**

- ✅ **S príponou** (`./a11y-kit/a11y-dropdown.js`) - vždy funguje, jasné a explicitné
- ✅ **Bez prípony** (`./a11y-kit/a11y-dropdown`) - funguje vo väčšine moderných bundlerov (Vite, Webpack 5, Astro)
- ✅ **Kratšie cesty** (`./a11y-kit`) - funguje ak máte `index.js` a bundler ho automaticky hľadá

**Odporúčanie:**
- Pre **produkčné projekty**: používajte `.js` príponu pre explicitnosť
- Pre **rýchle prototypy**: môžete vynechať príponu ak váš bundler to podporuje
- Pre **NPM package importy**: prípona nie je potrebná (`import ... from 'a11y-kit'`)

---

## Vytvorenie vlastnej témy

1. Skopírujte `*.theme.css` súbor ako `my-custom-theme.css`
2. Upravte CSS hodnoty podľa potreby
3. Zmeňte import v HTML:

```html
<link rel="stylesheet" href="css/a11y-dropdown.core.css">
<link rel="stylesheet" href="css/my-custom-theme.css">
```

Alebo v JavaScript:

```javascript
import './styles/a11y-dropdown.core.css';
import './styles/my-custom-theme.css'; // Vaša vlastná téma
```

## Prehliadače

Testované a funkčné v:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Licencia

MIT

## Autor

Vytvorené s dôrazom na prístupnosť a použiteľnosť.
