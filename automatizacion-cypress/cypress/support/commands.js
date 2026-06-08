// Custom commands for crivo.com.ar
// Example usage: cy.navigateToCategory('Vinilos')

Cypress.Commands.add('navigateToCategory', (category) => {
  cy.get('nav').contains(category, { matchCase: false }).click()
})

Cypress.Commands.add('searchProduct', (term) => {
  cy.get('[data-cy="buscador"], input[type="search"], input[name="search"]')
    .first()
    .clear()
    .type(term)
    .type('{enter}')
})
