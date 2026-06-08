import { homePage } from '../pages/POMhomePage'

/**
 * Home spec — "Nuestros insumos" section
 * Covers catalogue cases 25–26 (see cypress/e2e/CLAUDE.md → home.cy.js).
 *
 * These elements live in the home body, not the navbar. "Ver todos los productos"
 * links to /productos/vinilos (the site goes to vinilos, not a general /productos).
 */
describe('Home — insumos section', () => {

  beforeEach(() => {
    homePage.visit()
    cy.get('button[data-bs-dismiss="modal"]').first().click()
  })

  it('TC 25 — "Ver todos los productos" links to /productos/vinilos', () => {
    homePage.assertVerTodosHref()
  })

  it('TC 26 — insumos section shows all 5 category links', () => {
    homePage.assertCategoryCardsPresent()
  })

})
