class FlightResultPage {
  openAllAirlines() {
    cy.get('[data-testid="show-all-flight-filter-item-airline"]')
      .should('be.visible')
      .click()
  }

  selectMalaysiaAirlines() {
    cy.get(
      '[data-component="flight-filter-item-airline"][data-element-value="MH"]'
    )
      .should('be.visible')
      .click()

    cy.get(
      '[data-component="flight-filter-item-airline"][data-element-value="MH"]'
    )
      .should('have.attr', 'aria-selected', 'true')
  }

  selectEarliestFlight() {
    cy.get(
      'button[aria-label^="Expand flight details Malaysia Airlines"]'
    )
      .should('have.length.greaterThan', 0)
      .then(($buttons) => {
        const flights = []

        $buttons.each((index, button) => {
          const label = button.getAttribute('aria-label') || ''
          const match = label.match(
            /Malaysia Airlines\s+(\d{1,2}):(\d{2})/
          )

          if (!match) {
            return
          }

          const hours = Number(match[1])
          const minutes = Number(match[2])

          flights.push({
            index,
            label,
            totalMinutes: hours * 60 + minutes
          })
        })

        if (flights.length === 0) {
          throw new Error(
            'Expand buttons were found, but departure times could not be read from their labels.'
          )
        }

        flights.sort((a, b) => a.totalMinutes - b.totalMinutes)

        const earliestFlight = flights[0]

        cy.log(`Earliest flight: ${earliestFlight.label}`)

        cy.get(
          'button[aria-label^="Expand flight details Malaysia Airlines"]'
        )
          .eq(earliestFlight.index)
          .should('be.visible')
          .and('not.be.disabled')
          .click()

        cy.get(
          'button[aria-label^="Collapse flight details Malaysia Airlines"]'
        )
          .should('be.visible')
          .and('have.attr', 'aria-expanded', 'true')
      })
  }

  clickSelectFlight() {
    cy.get('[data-testid="flight-detail-select-button"]', {
      timeout: 15000
    })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  verifyBookingPage() {
    cy.location('pathname')
      .should('include', '/packages/book')
  }
}

export default FlightResultPage