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
  // Note: same href pattern appears in the nav dropdown — use cy.contains()
  // in clickCategoryTab() to match by visible text and avoid ambiguity.
  categoryTabs:     'a[href*="/productos/"]',

  // ── Product listing ───────────────────────────────────────────────────────
  verProductoLinks: 'a[href*="/detalle_producto/"]',

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

  clickCategoryTab(label) {
    cy.contains(SELECTORS.categoryTabs, label).click()
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
