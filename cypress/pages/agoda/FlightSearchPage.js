class FlightSearchPage {

  selectFrom(city) {
    cy.get('[data-selenium="flight-origin-search-input"]')
      .clear()
      .type(city)

    cy.contains(
      'p[data-testid="wrap-highlight-text"]',
      'Jakarta, Indonesia'
    )
      .should('be.visible')
      .click()

    cy.get('[data-selenium="flight-origin-search-input"]')
      .should('have.value', 'Jakarta')
  }

  selectTo(city) {
    cy.get('[data-selenium="flight-destination-search-input"]')
      .clear()
      .type(city)

    cy.contains(
      'p[data-testid="wrap-highlight-text"]',
      'Singapore, Singapore'
    )
      .should('be.visible')
      .click()

    cy.get('[data-selenium="flight-destination-search-input"]')
      .should('have.value', 'Singapore')
  }

  openDepartureDate() {
    cy.get('[data-component="flight-search-departureDate"]')
      .should('be.visible')
      .click()
  }

  selectDepartureDate() {
    const tomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)

    const day = tomorrow.getDate()

    const month = tomorrow.toLocaleString('en-US', {
      month: 'long'
    })

    const year = tomorrow.getFullYear()

    const weekday = tomorrow.toLocaleString('en-US', {
      weekday: 'long'
    })

    const ordinal = this.getOrdinal(day)

    const dateTestId =
      `${weekday}, ${month} ${day}${ordinal}, ${year}`

    cy.log(`Tomorrow: ${dateTestId}`)

    cy.get('[data-component="flight-search-departureDate"]')
      .should('be.visible')

    cy.get('[data-testid]', {
      timeout: 15000
    })
      .filter(`[data-testid="${dateTestId}"]`)
      .should('exist')
      .then(($date) => {
        $date[0].click()
      })

    cy.get('[data-component="flight-search-departureDate"]')
      .should('be.visible')

    cy.log(`Departure date selected: ${dateTestId}`)
  }

  getOrdinal(day) {
    if (day >= 11 && day <= 13) {
      return 'th'
    }

    switch (day % 10) {
      case 1:
        return 'st'

      case 2:
        return 'nd'

      case 3:
        return 'rd'

      default:
        return 'th'
    }
  }

  closePassengerPopup() {
    cy.get('#flight-occupancy')
      .should('be.visible')
      .click()

    cy.get('#flight-occupancy')
      .should('have.attr', 'aria-expanded', 'false')
  }

  searchFlights() {
    cy.get('[data-component="flight-search-button"]')
      .should('be.visible')
      .click()
  }
}

export default FlightSearchPage