class FlightSearchPage {
  selectFrom(city) {
    cy.get('[data-selenium="flight-origin-search-input"]')
      .clear()
      .type(city)
      .type('{downarrow}')
      .type('{enter}')
  }

  selectTo(city) {
    cy.get('[data-selenium="flight-destination-search-input"]')
      .clear()
      .type(city)
      .type('{downarrow}')
      .type('{enter}')

    cy.wait(500)

    cy.get('[data-selenium="flight-destination-search-input"]')
      .type('{esc}')
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

    cy.get(`[data-testid="${dateTestId}"]`, {
      timeout: 15000
    })
      .should('be.visible')
      .click()

    const tomorrowDate =
      `${year}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    cy.get('[data-component="flight-search-departureDate"]')
      .should('have.attr', 'data-date', tomorrowDate)
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