/**
 * Page Object for home-page sections at crivo.com.ar (the "/" route).
 *
 * Covers the "Nuestros insumos" section: the "Ver todos los productos" link and
 * the 5 category cards.
 *
 * Selector source: real HTML scraped from https://www.crivo.com.ar
 *
 * Notes:
 *  - These elements live in the home page body, not in the global navbar
 *    (modelled in POMnavPage). They are kept here to separate concerns.
 *  - The section has no id/data-testid; its classes (`.tit_insumos_home`,
 *    `.caja_prod_home`) are used ONLY as scope containers. Every tested link is
 *    anchored by its `href`.
 *  - "Ver todos los productos" links to /productos/vinilos (not a general
 *    /productos page) — this matches the site as built; tests expect that URL.
 */

const SELECTORS = {
  // ── "Nuestros insumos" section (classes used only as scope containers) ──────
  insumosHeader: '.tit_insumos_home',   // heading + "Ver todos los productos" link
  insumosCards:  '.caja_prod_home',     // the 5 category cards

  // ── Tested links anchored by href ───────────────────────────────────────────
  verTodosLink:  '.tit_insumos_home a[href="https://www.crivo.com.ar/productos/vinilos"]',
}

/**
 * The 5 category cards in the "Nuestros insumos" section, anchored by href path.
 * `url` is the path portion used to build the per-card selector and assert navigation.
 */
const INSUMOS_CATEGORIES = [
  { label: 'Vinilos',             url: '/productos/vinilos'           },
  { label: 'Lonas',               url: '/productos/lonas'             },
  { label: 'Placas rígidas',      url: '/productos/placas-rigidas'    },
  { label: 'Portabanners',        url: '/productos/portabanners'      },
  { label: 'Tintas y Accesorios', url: '/productos/tintas-accesorios' },
]

class HomePage {
  // ── Navigation ─────────────────────────────────────────────────────────────

  visit() {
    cy.visit('/')
  }

  /** Clicks the "Ver todos los productos" link in the insumos section. */
  clickVerTodos() {
    cy.get(SELECTORS.verTodosLink).click()
  }

  /** Clicks the category card whose link points to the given path. */
  clickCategoryCard(url) {
    cy.get(`${SELECTORS.insumosCards} a[href$="${url}"]`).click()
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  /** Asserts the "Ver todos los productos" link points to /productos/vinilos. */
  assertVerTodosHref() {
    cy.get(SELECTORS.verTodosLink)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', '/productos/vinilos')
  }

  /** Asserts each of the 5 category cards is present and visible with its href. */
  assertCategoryCardsPresent() {
    INSUMOS_CATEGORIES.forEach(({ url }) => {
      cy.get(`${SELECTORS.insumosCards} a[href$="${url}"]`).should('be.visible')
    })
  }
}

export const homePage = new HomePage()
export { SELECTORS, INSUMOS_CATEGORIES }
