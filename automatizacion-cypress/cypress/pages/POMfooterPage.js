/**
 * Page Object for the site footer at crivo.com.ar.
 *
 * Covers: newsletter subscription (Mailchimp embed), social/contact links, and
 * company contact data.
 *
 * Selector source: real HTML scraped from https://www.crivo.com.ar
 *
 * Notes:
 *  - The site has no semantic <footer> element; the footer is a `div.footer`.
 *    Since production markup can't be changed, `.footer` is used ONLY as a scope
 *    container, never as the asserted element. Every tested element is anchored by
 *    a robust attribute (`href`, `name`).
 *  - The newsletter is a Mailchimp embed: it POSTs to an external list-manage.com
 *    URL and opens in a new tab (target="_blank"). The email input is
 *    `name="EMAIL"` and the submit is `name="subscribe"`.
 *  - The old `/enviar_news` form is commented out in the HTML (see BUG-009).
 *  - There are two identical WhatsApp links on the page (footer icon + floating
 *    button); scoping by `.footer` selects only the footer one.
 */

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5491162286382&text=¡Hola CRIVO! Quisiera consultar sobre'

const SELECTORS = {
  // ── Scope container (class used only to scope, not as a tested element) ──────
  footerContainer:        '.footer',

  // ── Newsletter (Mailchimp embed) — name attributes, not classes ─────────────
  newsletterForm:   '#mc-embedded-subscribe-form',
  newsletterEmail:  'input[name="EMAIL"]',
  newsletterSubmit: 'input[name="subscribe"]',

  // ── Links anchored by exact href ────────────────────────────────────────────
  whatsappLink:     `.footer a[href="${WHATSAPP_URL}"]`,
  instagramLink:    '.footer a[href="https://www.instagram.com/crivoinsumosgraficos"]',
  linkedinLink:     '.footer a[href="https://linkedin.com/company/crivo-srl"]',
  emailLink:        '.footer a[href="mailto:info@crivo.com.ar"]',
}

/**
 * Expected company contact data (Spanish site content).
 * `address` is a partial string so the assertion tolerates the <br> and exact
 * formatting in the markup.
 */
const COMPANY_INFO = {
  address: 'Goncalves Dias 691',
  phone:   '47961366',
  email:   'info@crivo.com.ar',
}

class FooterPage {
  // ── Navigation ─────────────────────────────────────────────────────────────

  scrollToFooter() {
    cy.get(SELECTORS.footerContainer).scrollIntoView()
  }

  // ── Newsletter interactions ────────────────────────────────────────────────

  fillNewsletterEmail(value) {
    const el = cy.get(SELECTORS.newsletterEmail).clear()
    if (value) el.type(value)
  }

  submitNewsletter() {
    cy.get(SELECTORS.newsletterSubmit).click()
  }

  // ── Newsletter assertions ──────────────────────────────────────────────────

  /**
   * Asserts the newsletter form is wired to the Mailchimp endpoint
   * (action points to list-manage.com/subscribe/post, method post).
   */
  assertNewsletterFormWired() {
    cy.get(SELECTORS.newsletterForm)
      .should('have.attr', 'action')
      .and('include', 'list-manage.com/subscribe/post')
    cy.get(SELECTORS.newsletterForm).should('have.attr', 'method', 'post')
  }

  /**
   * Fills the newsletter field with a valid email and asserts the input passes
   * native validation (type="email" + required). Does not actually subscribe:
   * the form has target="_blank" and POSTs cross-origin to Mailchimp, so the real
   * subscription is verified manually.
   */
  assertNewsletterAcceptsValidEmail(email) {
    this.fillNewsletterEmail(email)
    cy.get(SELECTORS.newsletterEmail)
      .invoke('prop', 'validity')
      .its('valid')
      .should('be.true')
  }

  /**
   * Fills the newsletter field with a malformed email and asserts the browser
   * rejects it (type="email" → validity.typeMismatch). The URL is not checked
   * because target="_blank" means the page never navigates anyway.
   */
  assertNewsletterRejectsInvalidEmail(email) {
    this.fillNewsletterEmail(email)
    cy.get(SELECTORS.newsletterEmail)
      .invoke('prop', 'validity')
      .then(validity => {
        expect(validity.valid).to.be.false
        expect(validity.typeMismatch).to.be.true
      })
  }

  /**
   * Clears the newsletter field and asserts the browser rejects the empty value
   * (required → validity.valueMissing).
   */
  assertNewsletterRejectsEmpty() {
    this.fillNewsletterEmail('')
    cy.get(SELECTORS.newsletterEmail)
      .invoke('prop', 'validity')
      .then(validity => {
        expect(validity.valid).to.be.false
        expect(validity.valueMissing).to.be.true
      })
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  /** Asserts the WhatsApp link href matches the expected URL with number and message. */
  assertWhatsappHref() {
    cy.get(SELECTORS.whatsappLink)
      .should('have.attr', 'href', WHATSAPP_URL)
  }

  /** Asserts the Instagram link exists in the footer with a non-empty href. */
  assertInstagramPresent() {
    cy.get(SELECTORS.instagramLink)
      .should('exist')
      .and('have.attr', 'href', 'https://www.instagram.com/crivoinsumosgraficos')
  }

  /** Asserts the LinkedIn link exists in the footer with a non-empty href. */
  assertLinkedinPresent() {
    cy.get(SELECTORS.linkedinLink)
      .should('exist')
      .and('have.attr', 'href', 'https://linkedin.com/company/crivo-srl')
  }

  /** Asserts the email link is visible and points to the correct mailto address. */
  assertEmailLink() {
    cy.get(SELECTORS.emailLink)
      .should('be.visible')
      .and('have.attr', 'href', `mailto:${COMPANY_INFO.email}`)
  }

  /**
   * Asserts the company contact data (address, phone, email) is visible and
   * correct inside the footer. Text is compared against COMPANY_INFO.
   */
  assertCompanyInfoVisible() {
    cy.get(SELECTORS.footerContainer).within(() => {
      cy.contains(COMPANY_INFO.address).should('be.visible')
      cy.contains(COMPANY_INFO.phone).should('be.visible')
      cy.contains(COMPANY_INFO.email).should('be.visible')
    })
  }
}

export const footerPage = new FooterPage()
export { SELECTORS, WHATSAPP_URL, COMPANY_INFO }
