import { productsPage } from '../pages/POMproductsPage'
import { navPage } from '../pages/POMnavPage'
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

  // Anchor page both TC 27 variants start from. Derived from the canonical list,
  // so no per-category endpoint is hardcoded in any test.
  const startCategory = categoryEndpoints[0].path

  // TC 27 — the in-page .categorias_prod tab bar (desktop) reaches every category.
  categoryEndpoints.forEach(({ path, name }) => {
    it(`TC 27 — category tab "${name}" navigates to ${path}`, () => {
      productsPage.visitCategory(startCategory)
      productsPage.clickCategoryTab(path)
      cy.url().should('include', path)
    })
  })

  // TC 27 bis — same categories reached from the navbar "Productos" desktop hover menu.
  categoryEndpoints.forEach(({ path, name }) => {
    it(`TC 27 bis — navbar hover "${name}" navigates to ${path}`, () => {
      productsPage.visitCategory(startCategory)
      navPage.openProductosHoverMenu()
      navPage.clickHoverMenuCategory(path)
      cy.url().should('include', path)
    })
  })

   /* it('Testing hovering', () => {
    cy.visit('/')
    cy.get('button[data-bs-dismiss="modal"]').first().click()
    cy.get('a.bot_nav_prod').trigger('mouseover')
    cy.get('.hover_menu').should('be.visible')
    
  })
*/

  // One it() per category — every listing page shows visible "Ver producto" buttons.
  categoryEndpoints.forEach(({ path, name }) => {
    it(`TC 28 — Category "${name}" shows visible "Ver producto" buttons`, () => {
      productsPage.visitCategory(path)
      productsPage.assertVerProductoLinksExist()
    })
  })

  // TC 29 — click wiring: a representative "Ver producto" anchor actually
  // navigates to a detail page when clicked.
  it('TC 29 — "Ver producto" redirects to the product detail page', () => {
    productsPage.visitCategory('/productos/vinilos')
    productsPage.clickFirstVerProducto()
    cy.url().should('include', '/detalle_producto/vinilos/')
  })

  // TC 29 bis — link integrity: every category's card links match the fixture
  // exactly (same set, same count). Confirms all "Ver producto" buttons point to
  // the right detail URLs, and flags any drift between the live site and the fixture.
  Object.entries(productsData.detailPages).forEach(([category, urls]) => {
    it(`TC 29 bis — Category "${category}" card links match the fixture exactly`, () => {
      productsPage.visitCategory(`/productos/${category}`)
      productsPage.assertCardLinksExactly(urls)
    })
  })

  // TC 30 — every product detail page loads with a title and image (one it() per
  // product, driven by the fixture).
  Object.entries(productsData.detailPages).forEach(([category, urls]) => {
    urls.forEach((url) => {
      it(`TC 30 — Product detail loads in category "${category}" with h1 and image (${url})`, () => {
        productsPage.visitDetail(url)
        productsPage.assertDetailPageLoaded()
      })
    })
  })

})
