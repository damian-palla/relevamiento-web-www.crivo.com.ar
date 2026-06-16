import { footerPage } from '../pages/POMfooterPage'

/**
 * Footer spec — crivo.com.ar
 * Covers catalogue cases 12–19 (case 18 dropped — see cypress/e2e/CLAUDE.md → footer.cy.js).
 *
 * The newsletter is a Mailchimp embed (target="_blank", cross-origin POST). Per the
 * project's "don't touch the network" philosophy, the newsletter cases verify the
 * form wiring and native field validation, not a real subscription (manual check).
 */
describe('Footer — crivo.com.ar', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.dismissPromoModal()
    footerPage.scrollToFooter()
  })

  // ── Newsletter (Mailchimp embed) ───────────────────────────────────────────

  it('TC 12 — newsletter form is wired to Mailchimp and accepts a valid email', () => {
    footerPage.assertNewsletterFormWired()
    footerPage.assertNewsletterAcceptsValidEmail('qa.crivo+test@mailinator.com')
  })

  it('TC 13 — newsletter rejects an email without the @ symbol', () => {
    footerPage.assertNewsletterRejectsInvalidEmail('testing.com')
  })

  it('TC 14 — newsletter rejects an empty email field', () => {
    footerPage.assertNewsletterRejectsEmpty()
  })

  // ── Integrations / contact links ───────────────────────────────────────────

  it('TC 15 — WhatsApp link points to the correct number and prefilled message', () => {
    footerPage.assertWhatsappHref()
  })

  it('TC 16 — Instagram and LinkedIn links are present with a valid href', () => {
    footerPage.assertInstagramPresent()
    footerPage.assertLinkedinPresent()
  })

  it('TC 17 — mailto:info@crivo.com.ar link is correct', () => {
    footerPage.assertEmailLink()
  })

  it('TC 19 — footer shows company contact data (address, phone, email)', () => {
    footerPage.assertCompanyInfoVisible()
  })

})
