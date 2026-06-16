// Custom commands for crivo.com.ar
// Example usage: cy.navigateToCategory('Vinilos')

/**
 * Dismisses the home promo modal (#miModal).
 *
 * The modal is opened on DOMContentLoaded via `bootstrap.Modal().show()` with a
 * fade-in transition. It must be closed through Bootstrap's own `hide()` so that
 * Bootstrap restores the page (removes the backdrop, the `modal-open` body lock
 * and the focus-trap `inert`/`aria-hidden` it puts on the background). Just
 * ripping the node out of the DOM leaves the background inert and the contact
 * form unusable ("disabled element" on type).
 *
 * The catch: Bootstrap ignores `hide()` while the open transition is still
 * running (`_isTransitioning`), and Cypress's actionability check is blind to a
 * pure opacity fade, so a plain click can land mid-fade and be dropped — leaving
 * the modal stuck open in fast headless runs. So we hide via the API and cover
 * both states: hide now if it's already shown, and also hide on `shown.bs.modal`
 * if the fade is still in flight (the redundant second hide() is a no-op).
 */
Cypress.Commands.add('dismissPromoModal', () => {
  cy.get('#miModal', { timeout: 10000 }).should('be.visible')
  cy.window().then((win) =>
    new Cypress.Promise((resolve) => {
      const el = win.document.getElementById('miModal')
      if (!el) return resolve()
      const modal = win.bootstrap.Modal.getOrCreateInstance(el)
      el.addEventListener('hidden.bs.modal', () => resolve(), { once: true })
      el.addEventListener('shown.bs.modal', () => modal.hide(), { once: true })
      modal.hide()
    })
  )
  cy.get('#miModal').should('not.be.visible')
})

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
