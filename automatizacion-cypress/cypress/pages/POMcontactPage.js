/**
 * Page Object for the contact/quote form at crivo.com.ar/#contacto
 *
 * The form lives on the homepage (not a dedicated route) and POSTs to
 * /enviar_mail, which responds with a standalone thank-you page.
 *
 * Selector source: real HTML scraped from https://www.crivo.com.ar
 *
 * Notes:
 *  - No id attributes exist on the text inputs; name attributes are used instead.
 *  - input[name="name"] (.input_h) is a honeypot anti-spam field — never fill it.
 *  - The textarea has id="exampleFormControlTextarea1" but name="comentarios" is
 *    preferred as it is more stable to implementation changes.
 *  - After a successful POST the browser lands on /enviar_mail (a new full page).
 */

const SELECTORS = {
  // ── Form container ────────────────────────────────────────────────────────
  section:       '#contacto',
  form:          'form[action="https://www.crivo.com.ar/enviar_mail"]',

  // ── Input fields ──────────────────────────────────────────────────────────
  firstName:     'input[name="nombre"]',
  lastName:      'input[name="apellido"]',
  company:       'input[name="empresa"]',
  email:         'input[name="email"]',
  phone:         'input[name="telefono"]',

  // ── Product type dropdown ─────────────────────────────────────────────────
  productType:   'select[name="tipo_producto"]',

  // ── Comments textarea ─────────────────────────────────────────────────────
  comments:      'textarea[name="comentarios"]',

  // ── Honeypot (anti-spam trap) ─────────────────────────────────────────────
  // Selected by its name attribute (robust), never by the .input_h class.
  // Must stay invisible to real users; tests assert it is hidden, never fill it.
  honeypot:      'input[name="name"]',

  // ── Submit button ─────────────────────────────────────────────────────────
  submitButton:  'input[type="submit"].bot_enviar',

  // ── Success page (rendered at /enviar_mail after POST) ───────────────────
  successBanner: '.banner_gracias',
  successTitle:  '.tit_gracias',
  successBody:   '.texto_gracias',
}

/**
 * All valid option values for the product type <select>.
 * Use these constants in tests instead of raw strings to avoid typos.
 */

const PRODUCT_OPTIONS = {
  
  // Vinilos
  VINILOS_IMPRESION:                'Vinilos de impresión',
  VINILOS_IMPRESION_MICROPERFORADO: 'Vinilos de impresión microperforado',
  VINILOS_IMPRESION_TRANSPARENTE:   'Vinilos de impresión transparente',
  VINILOS_IMPRESION_ESMERILADO:     'Vinilos de impresión esmerilado',
  VINILOS_CORTE:                    'Vinilos de corte',
  VINILOS_ALTO_TRANSITO:            'Vinilos de alto tránsito',
  VINILOS_VEHICULARES:              'Vinilos vehiculares',
  
  // Lonas
  LONAS_FRONT:                      'Lonas Front',
  LONAS_BACKLIGHT:                  'Lonas Backlight',
  LONAS_BLOCKOUT:                   'Lonas Blockout',
  LONAS_MESH:                       'Lonas Mesh',

  // Placas rígidas
  PLACAS_PVC_ESPUMADO:              'Placas PVC Espumado',
  FOAMBOARD:                        'Foamboard',
  CORRUGADO_PLASTICO:               'Corrugado plástico',
  BICAPA:                           'Bicapa',

  // Portabanners
  PORTABANNERS_HIERRO:              'Portabanners de hierro',
  PORTABANNERS_ROLL_UP:             'Portabanners Roll Up',
  
  // Accessories
  MAQUINA_SEMIAUTOMATICA_OJALES:    'Máquina semiautomática de ojales',
  OJALES:                           'Ojales',
  TINTAS_ECOSOLVENTES:              'Tintas ecosolventes',
  PAPEL_POSICIONADOR_TRANSFER:      'Papel posicionador transfer',
}

class ContactPage {
  // ── Navigation ─────────────────────────────────────────────────────────────

  /** Loads the homepage and scrolls the viewport to the contact section. */
  visit() {
    cy.visit('/')
    cy.get('button[data-bs-dismiss="modal"]').first().click()
    this.scrollToForm()
  }

  /** Scrolls the contact section into view without a full page reload. */
  scrollToForm() {
    cy.get(SELECTORS.firstName).scrollIntoView()
    cy.get(SELECTORS.firstName).should('be.visible')
  }

  // ── Field interactions ─────────────────────────────────────────────────────

  fillFirstName(value) {
  cy.get(SELECTORS.firstName).clear({ force: true })
  if (value) cy.get(SELECTORS.firstName).type(value, { force: true })
}

  fillLastName(value) {
    const el = cy.get(SELECTORS.lastName).clear({ force: true })
    if (value) el.type(value, { force: true })
  }

  fillCompany(value) {
    const el = cy.get(SELECTORS.company).clear({ force: true })
    if (value) el.type(value, { force: true })
  }

  fillEmail(value) {
    const el = cy.get(SELECTORS.email).clear({ force: true })
    if (value) el.type(value, { force: true })
  }

  fillPhone(value) {
    const el = cy.get(SELECTORS.phone).clear({ force: true })
    if (value) el.type(value, { force: true })
  }

  /**
   * Selects a product type from the dropdown.
   * Skips the interaction when value is empty, leaving the default placeholder selected.
   * @param {string} productValue - One of the PRODUCT_OPTIONS values.
   */
  selectProductType(productValue) {
    if (productValue) cy.get(SELECTORS.productType).select(productValue,{ force: true })
  }

  fillComments(value) {
  cy.get(SELECTORS.comments).clear({ force: true })
  if (value) cy.get(SELECTORS.comments).type(value, { force: true })
}

  // ── Full form ──────────────────────────────────────────────────────────────

  /**
   * Fills every required field in the form.
   * @param {object} data
   * @param {string} data.firstName
   * @param {string} data.lastName
   * @param {string} data.company
   * @param {string} data.email
   * @param {string} data.phone
   * @param {string} data.productType  - A value from PRODUCT_OPTIONS
   * @param {string} [data.comments]   - Optional free text
   */
  fillForm({ firstName, lastName, company, email, phone, productType, comments = '' }) {
    this.fillFirstName(firstName)
    this.fillLastName(lastName)
    this.fillCompany(company)
    this.fillEmail(email)
    this.fillPhone(phone)
    this.selectProductType(productType)
    if (comments) this.fillComments(comments)
  }

  // ── Submission ─────────────────────────────────────────────────────────────

  submit() {
    cy.get(SELECTORS.submitButton).click()
  }

  /** Fills the form and submits it in one step. */
  fillAndSubmit(data) {
    this.fillForm(data)
    this.submit()
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  /** Asserts that the browser has landed on the /enviar_mail thank-you page. */
  assertSubmissionSuccess() {
    cy.url().should('include', '/enviar_mail')
    cy.get(SELECTORS.successBanner).should('be.visible')
    cy.get(SELECTORS.successTitle).should('contain.text', 'GRACIAS')
  }

  /** Asserts every required input is present and visible. */
  assertFormIsVisible() {
    cy.get(SELECTORS.form).should('be.visible')
    cy.get(SELECTORS.firstName).should('be.visible')
    cy.get(SELECTORS.lastName).should('be.visible')
    cy.get(SELECTORS.company).should('be.visible')
    cy.get(SELECTORS.email).should('be.visible')
    cy.get(SELECTORS.phone).should('be.visible')
    cy.get(SELECTORS.productType).should('be.visible')
    cy.get(SELECTORS.comments).should('be.visible')
    cy.get(SELECTORS.submitButton).should('be.visible')
  }

  /**
   * Asserts the honeypot field stays invisible to real users.
   * not.be.visible covers display:none, visibility:hidden and zero-size, so the
   * assertion does not depend on how the field is hidden.
   */
  assertHoneypotHidden() {
    cy.get(SELECTORS.honeypot).should('not.be.visible')
  }

  /**
   * Asserts the product-type <select> matches PRODUCT_OPTIONS exactly:
   * every expected value is present (none missing) and the option count is exact
   * (none extra). Expected count = PRODUCT_OPTIONS entries + 1 placeholder = 22.
   */
  assertProductOptionsMatch() {
    Object.values(PRODUCT_OPTIONS).forEach(option => {
      cy.get(SELECTORS.productType).should('contain', option)
    })
    cy.get(`${SELECTORS.productType} option`)
      .should('have.length', Object.keys(PRODUCT_OPTIONS).length + 1)
  }
}

// Export both the class and the constants so tests can import what they need.
export const contactPage = new ContactPage()
export { SELECTORS, PRODUCT_OPTIONS }
