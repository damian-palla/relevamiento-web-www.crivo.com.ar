import { productsPage } from '../pages/POMproductsPage'
import { ENDPOINTS } from '../support/endpoints'
import productsData from '../fixtures/products.json'

/**
 * Products spec — category listing & product detail pages
 * Covers catalogue cases 27–30 (see cypress/e2e/CLAUDE.md → products.cy.js).
 *
 * Single source of truth per datum: category URLs come from support/endpoints.js,
 * product-detail URLs come from fixtures/products.json (the only place that holds them).
 */

// The 5 category listing pages, derived from the canonical endpoint list.
const categoryEndpoints = ENDPOINTS.public.filter(e => e.path.startsWith('/productos/'))

describe('Products — category & detail', () => {

  it('TC 27 — category tabs filter products', () => {
    productsPage.visitCategory('/productos/vinilos')
    productsPage.clickCategoryTab('Lonas')
    cy.url().should('include', '/productos/lonas')
  })

  // One it() per category — every listing page shows visible "Ver producto" buttons.
  categoryEndpoints.forEach(({ path, name }) => {
    it(`TC 28 — ${name} listing shows visible "Ver producto" buttons`, () => {
      productsPage.visitCategory(path)
      productsPage.assertVerProductoLinksExist()
    })
  })

  it('TC 29 — "Ver producto" redirects to the product detail page', () => {
    productsPage.visitCategory('/productos/vinilos')
    productsPage.clickFirstVerProducto()
    cy.url().should('include', '/detalle_producto/vinilos/')
  })

  it('TC 30 — detail page loads with title and image', () => {
    productsPage.visitDetail(productsData.detailPages.lonas[0])
    productsPage.assertDetailPageLoaded()
  })

})
