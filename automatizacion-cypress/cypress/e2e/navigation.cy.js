import { navPage, SELECTORS, CATEGORY_LINKS, NAV_LINKS } from '../pages/POMnavPage'

/**
 * Navigation spec — site-wide navbar (desktop)
 * Covers catalogue cases 20–24 (see cypress/e2e/CLAUDE.md → navigation.cy.js).
 */
describe('Navigation — navbar (desktop)', () => {

  // Generates one it() per navbar tab — 3 tests, all tagged TC 20.
  NAV_LINKS.forEach(({ label, url }) => {
    it(`TC 20 — navbar "${label}" redirects to ${url}`, () => {
      cy.visit('/')
      cy.dismissPromoModal()
      navPage.clickNavLink(url)

      if (url === '/') {
        cy.url().should('eq', Cypress.config('baseUrl') + '/')
      } else {
        cy.url().should('include', url)
      }
    })
  })

  it('TC 21 — logo returns to home from an internal page', () => {
  cy.visit('/')
  cy.dismissPromoModal()
  navPage.clickEmpresa()
  navPage.clickLogo()
  
  cy.url().should('eq', Cypress.config('baseUrl') + '/')
})

  it('TC 22 — "Contacto" from an internal page lands on /#contacto', () => {
    cy.visit('/empresa')
    navPage.clickContacto()
    cy.url().should('include', '/#contacto')
  })

  it('TC 23 — "Productos" dropdown opens with all 5 categories', () => {
    cy.visit('/')
    cy.dismissPromoModal()
    navPage.openProductosHoverMenu()
    //navPage.assertDropdownIsVisible()
    navPage.assertDropdownContains(CATEGORY_LINKS.map(({ label }) => label))
  })

  // Generates one it() per category — 5 tests, all tagged TC 24.
  CATEGORY_LINKS.forEach(({ label, url }) => {
    it(`TC 24 — dropdown "${label}" navigates to ${url}`, () => {
      cy.visit('/')
      cy.dismissPromoModal()
      navPage.openProductosHoverMenu()
      navPage.clickDropdownCategory(label)
      cy.url().should('include', url)
    })
  })

})
