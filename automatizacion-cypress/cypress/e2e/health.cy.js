import { ENDPOINTS } from '../support/endpoints'

/**
 * Health spec — endpoint availability
 * Covers catalogue case 37 (see cypress/e2e/CLAUDE.md → health.cy.js).
 *
 * Every public endpoint must respond 200. /productos and /enviar_news are
 * deliberately NOT here — they error out and belong to the security spec.
 */
describe('Health — endpoint availability', () => {

  ENDPOINTS.public.forEach(({ path, name }) => {
    it(`TC 37 — ${name} (${path}) responds 200`, () => {
      cy.request(path).its('status').should('eq', 200)
    })
  })

})
