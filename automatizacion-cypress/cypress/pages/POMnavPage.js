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

  // ── Productos desktop hover menu (.hover_menu, revealed on .bot_nav_prod hover) ─
  // Hovering the desktop "Productos" tab runs $('.hover_menu').addClass('aparece');
  // the menu lists the 5 categories as a.bot_menu_hover links to /productos/[slug].
  hoverMenuTrigger: '.bot_nav_prod',
  hoverMenu:        '.hover_menu',
  hoverMenuLinks:   '.hover_menu a.bot_menu_hover',
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
  { label: 'Placas rígidas',      url: '/productos/placas-rigidas'   },
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

  // Unused: the navbar "Productos" is a hover menu, not a click dropdown — use
  // openProductosHoverMenu() instead. Kept (commented) until confirmed removable;
  // SELECTORS.dropdownTrigger no longer exists.
  // openProductosDropdown() {
  //   cy.get(SELECTORS.dropdownTrigger).click()
  // }

  // ── Assertions ─────────────────────────────────────────────────────────────

  // Unused: superseded by openProductosHoverMenu()'s own visibility check.
  // SELECTORS.openProductosHoverMenu was never a real selector key.
  // assertDropdownIsVisible() {
  //   cy.get(SELECTORS.openProductosHoverMenu).should('be.visible')
  // }

  /** Asserts that each label in the array is visible in the open dropdown. */
  assertDropdownContains(labels) {
    labels.forEach(label => {
      cy.get(SELECTORS.hoverMenuLinks).contains(label).should('be.visible')
    })
  }

  /** Clicks the first-level dropdown item matching the given label. */
  clickDropdownCategory(label) {
    cy.get(SELECTORS.hoverMenuLinks).contains(label).click()
  }

  // ── Productos desktop hover menu ───────────────────────────────────────────

  /**
   * Reveals the desktop .hover_menu. The site shows it via jQuery .hover()
   * on .bot_nav_prod, which adds the 'aparece' class to .hover_menu (the menu
   * is otherwise collapsed and off-screen: height:0, top:-291px, opacity:0).
   * Cypress can't reliably fire jQuery's mouseenter, so we add the class
   * directly — the same DOM state the real hover produces.
   */
  openProductosHoverMenu() {
    cy.get('a.bot_nav_prod').trigger('mouseover')
    cy.get('.hover_menu').should('be.visible')
  }

  /** Clicks a category in the open hover menu, matched by its href path. */
  clickHoverMenuCategory(path) {
    cy.get(`${SELECTORS.hoverMenuLinks}[href*="${path}"]`).click()
  }
}

export const navPage = new NavPage()
export { SELECTORS, CATEGORY_LINKS, NAV_LINKS }
