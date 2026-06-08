/**
 * Page Object for the site-wide navigation bar at crivo.com.ar
 *
 * Selector source: real HTML scraped from https://www.crivo.com.ar
 *
 * Notes:
 *  - "Productos" in the navbar opens a two-level dropdown:
 *    first level shows 5 categories (Vinilos, Lonas, etc.),
 *    each category links to /productos/[slug] and also triggers
 *    a sub-dropdown with individual product types on hover.
 *  - openProductosDropdown() uses .click() because Bootstrap JS
 *    requires a click event on the toggle, not just mouseover.
 */

const SELECTORS = {
  // ── Logo ──────────────────────────────────────────────────────────────────
  logo: 'a.navbar-brand',

  // ── Top-level nav links ───────────────────────────────────────────────────
  navHome:      '.navbar-nav a[href$="/"]',
  navEmpresa:   '.navbar-nav a[href$="/empresa"]',
  navContacto:  '.navbar-nav a[href$="/#contacto"]',

  // ── Productos dropdown ────────────────────────────────────────────────────
  dropdownTrigger: '.navbar-nav .dropdown > .nav-link',
  dropdownMenu:    '.navbar-nav .dropdown-menu',
  dropdownLinks:   '.navbar-nav .dropdown-menu > .nav-item > a',
}

/**
 * The three simple top-level navbar tabs (the Productos dropdown is separate).
 * Used in TC 20 to generate one it() per tab.
 */
const NAV_LINKS = [
  { label: 'Home',     url: '/'          },
  { label: 'Empresa',  url: '/empresa'   },
  { label: 'Contacto', url: '/#contacto' },
]

/**
 * The five first-level categories in the Productos dropdown.
 * Each entry is used in TC 24 to generate one it() per category.
 */
const CATEGORY_LINKS = [
  { label: 'Vinilos',             url: '/productos/vinilos'          },
  { label: 'Lonas',               url: '/productos/lonas'            },
  { label: 'Placas Rígidas',      url: '/productos/placas-rigidas'   },
  { label: 'Portabanners',        url: '/productos/portabanners'     },
  { label: 'Tintas y Accesorios', url: '/productos/tintas-accesorios'},
]

class NavPage {
  // ── Navigation ─────────────────────────────────────────────────────────────

  clickLogo() {
    cy.get(SELECTORS.logo).click()
  }

  /** Clicks a top-level navbar link by its href. */
  clickNavLink(url) {
    cy.get(`.navbar-nav a[href$="${url}"]`).click()
  }

  clickEmpresa() {
    cy.get(SELECTORS.navEmpresa).click()
  }
  
  clickContacto() {
    cy.get(SELECTORS.navContacto).click()
  }

  // ── Productos dropdown ─────────────────────────────────────────────────────

  openProductosDropdown() {
    cy.get(SELECTORS.dropdownTrigger).click()
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  assertDropdownIsVisible() {
    cy.get(SELECTORS.dropdownMenu).should('be.visible')
  }

  /** Asserts that each label in the array is visible in the open dropdown. */
  assertDropdownContains(labels) {
    labels.forEach(label => {
      cy.get(SELECTORS.dropdownLinks).contains(label).should('be.visible')
    })
  }

  /** Clicks the first-level dropdown item matching the given label. */
  clickDropdownCategory(label) {
    cy.get(SELECTORS.dropdownLinks).contains(label).click()
  }
}

export const navPage = new NavPage()
export { SELECTORS, CATEGORY_LINKS, NAV_LINKS }
