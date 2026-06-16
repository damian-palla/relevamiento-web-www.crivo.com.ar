/**
 * Page Object for the product category pages and product detail pages.
 *
 * Category pages follow the pattern /productos/[category-slug].
 * Detail pages follow the pattern /detalle_producto/[category]/[product-slug].
 *
 * Selector source: real HTML inspected from https://www.crivo.com.ar
 */

const SELECTORS = {
  // ── Category tabs (on /productos/[slug]) ──────────────────────────────────
  // Scoped to the visible .categorias_prod bar that the listing pages render
  // above the products. The same /productos/ href also appears in the navbar
  // (the mobile dropdown and the desktop hover menu), so an unscoped selector
  // would be ambiguous — keep this bound to .categorias_prod.
  categoryTabs:     '.categorias_prod a',

  // ── Product listing ───────────────────────────────────────────────────────
  // The listing pages use two card layouts, sometimes mixed within one category:
  // image cards (.cont_subcat) and button-only cards (.cont_boton_subcat). The
  // selector unions both so it catches every real "Ver producto" button. Scoping
  // to these containers also excludes the navbar .hover_submenu links, which are
  // hidden until hover — an unscoped a[href*="/detalle_producto/"] would match
  // those too, so .first() could land on a hidden element and break the click
  // (TC 29) and visibility (TC 28) assertions.
  verProductoLinks:
    '.cont_subcat a[href*="/detalle_producto/"], .cont_boton_subcat a[href*="/detalle_producto/"]',

  // ── Product detail (on /detalle_producto/[cat]/[slug]) ────────────────────
  productTitle:     'h1',
  productImage:     'img[src*="/assets/imagenes/productos/"]',
}

class ProductsPage {
  // ── Navigation ─────────────────────────────────────────────────────────────

  visitCategory(slug) {
    cy.visit(slug)
  }

  visitDetail(url) {
    cy.visit(url)
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  /**
   * Clicks a category tab in the visible .categorias_prod bar, matched by its
   * href path (e.g. '/productos/lonas'). Matching by path — not visible text —
   * keeps it decoupled from the tab's exact casing and lets specs drive it
   * straight from the canonical endpoint list.
   */
  clickCategoryTab(path) {
    cy.get(`${SELECTORS.categoryTabs}[href*="${path}"]`).click()
  }

  clickFirstVerProducto() {
    cy.get(SELECTORS.verProductoLinks).first().click()
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  /** Asserts "Ver producto" links are present and every one of them is visible. */
  assertVerProductoLinksExist() {
    cy.get(SELECTORS.verProductoLinks)
      .should('have.length.greaterThan', 0)
      .and('be.visible')
  }

  /**
   * Asserts the visible "Ver producto" links on the current category page point
   * to exactly the expected detail paths — same set and same count, no more, no
   * less. Card hrefs are absolute, so they're normalised to pathname before
   * comparing. Catches the site adding/removing/re-slugging a product behind the
   * fixture's back.
   */
  assertCardLinksExactly(expectedPaths) {
    cy.get(SELECTORS.verProductoLinks).then(($links) => {
      const actual = [...$links].map((a) => new URL(a.href).pathname).sort()
      const expected = [...expectedPaths].sort()
      expect(actual).to.deep.equal(expected)
    })
  }

  /** Asserts the product detail page has a non-empty title and an image. */
  assertDetailPageLoaded() {
    cy.get(SELECTORS.productTitle)
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty')
    cy.get(SELECTORS.productImage).should('exist')
  }
}

export const productsPage = new ProductsPage()
export { SELECTORS }
