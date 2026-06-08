import { contactPage, SELECTORS } from '../pages/POMcontactPage'

/**
 * Contact form spec — crivo.com.ar/#contacto
 * Covers catalogue cases 1–11 (see cypress/e2e/CLAUDE.md → contact.cy.js).
 *
 * [BUG] convention: a [BUG] test asserts the DEFECTIVE behaviour, so it PASSES
 * while the bug is live. The day a [BUG] test FAILS, the bug was fixed — update
 * the test (invert the assertion to the correct behaviour).
 */
describe('Contact Form — crivo.com.ar/#contacto', () => {

  // Load all datasets once before each test via alias.
  // Use function() (not arrow) so Cypress populates this.contact.
  beforeEach(function () {
    cy.fixture('contact').as('contact')
  // This spec uses the action cy.get('button[data-bs-dismiss="modal"]').first().click()
  // inside the method contactPage.visit() to be included in all TCs

  })

  // ── Happy path ─────────────────────────────────────────────────────────────

  it.only('TC 1 — submits successfully with all valid fields', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.validData)
    contactPage.assertSubmissionSuccess()
  })

  it('TC 2 — submits successfully with only required fields filled', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.onlyRequiredFields)
    contactPage.assertSubmissionSuccess()
  })

  // ── Required field validation ──────────────────────────────────────────────

  it('TC 3 — does not submit when all required fields are empty', function () {
    // Browser HTML5 required validation fires and blocks submission.
    // The page must stay on the contact section and the URL must not change.
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.emptyRequiredFields)
    cy.url().should('not.include', '/enviar_mail')
    cy.get(SELECTORS.section).should('be.visible')
  })

  // ── Email validation (BUG-014) ─────────────────────────────────────────────
  // The email field is type="text", so the browser does not validate its format.
  // These [BUG] tests assert that the malformed value IS accepted (the browser
  // lands on /enviar_mail). They PASS while the bug is live; if one FAILS, the
  // site started rejecting the value — the bug was fixed, update the test.

  it('TC 4 [BUG] — submits with an email missing the @ symbol (BUG-014)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.invalidEmail)
    cy.url().should('include', '/enviar_mail')
  })

  it('TC 5 [BUG] — submits with an email that has no domain after @ (BUG-014)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.invalidEmailDomain)
    cy.url().should('include', '/enviar_mail')
  })

  // ── Phone validation (BUG-014) ─────────────────────────────────────────────
  // The phone field is type="text", so the browser accepts any character.
  // Same [BUG] convention as the email cases above.

  it('TC 6 [BUG] — submits with a phone that contains letters (BUG-014)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.invalidPhone)
    cy.url().should('include', '/enviar_mail')
  })

  it('TC 7 [BUG] — submits with a phone under 8 digits (BUG-014)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.shortPhone)
    cy.url().should('include', '/enviar_mail')
  })

  // ── Optional-but-starred fields (BUG-007 / BUG-008) ────────────────────────
  // "Tipo de producto" and "Comentarios" are marked * but accept empty values.
  // These [BUG] tests assert the form still submits; if one FAILS, the field
  // became truly required — the bug was fixed, update the test.

  it('TC 8 [BUG] — submits with an empty "Tipo de producto" (BUG-007)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.emptyProductType)
    cy.url().should('include', '/enviar_mail')
  })

  it('TC 9 [BUG] — submits with empty "Comentarios" (BUG-008)', function () {
    contactPage.visit()
    contactPage.fillAndSubmit(this.contact.emptyComments)
    cy.url().should('include', '/enviar_mail')
  })

  // ── Structural integrity ───────────────────────────────────────────────────

  it('TC 10 — honeypot field input[name="name"] is hidden from the user', function () {
    contactPage.visit()
    contactPage.assertHoneypotHidden()
  })

  it('TC 11 — <select> matches PRODUCT_OPTIONS (every value present and exact count)', function () {
    contactPage.visit()
    contactPage.assertProductOptionsMatch()
  })

})
