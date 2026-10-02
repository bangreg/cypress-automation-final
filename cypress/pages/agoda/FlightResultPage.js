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
    cy.get('[data-testid="web-refresh-flights-card"]')
      .should('have.length.greaterThan', 0)
      .then(($cards) => {

        let earliestIndex = 0
        let earliestMinutes = Infinity

        $cards.each((index, card) => {

          const departureText = Cypress.$(card)
            .find('[data-testid="departure-time"]')
            .first()
            .text()
            .trim()

          if (!departureText) {
            return
          }

          const [hours, minutes] =
            departureText.split(':').map(Number)

          const totalMinutes =
            (hours * 60) + minutes

          if (totalMinutes < earliestMinutes) {
            earliestMinutes = totalMinutes
            earliestIndex = index
          }
        })

        const earliestHour =
          Math.floor(earliestMinutes / 60)

        const earliestMinute =
          String(earliestMinutes % 60).padStart(2, '0')

        cy.log(
          `Earliest flight: ${earliestHour}:${earliestMinute}`
        )

        cy.log(
          `Earliest card index: ${earliestIndex}`
        )

        // Cari tombol Expand pada earliest flight
        cy.get('[data-testid="web-refresh-flights-card"]')
          .eq(earliestIndex)
          .find('button[aria-label^="Expand flight details"]')
          .should('be.visible')
          .then(($button) => {

            cy.log(
              `Expand button: ${$button.attr('aria-label')}`
            )

            // Native click untuk menghindari React re-render
            $button[0].click()
          })

        // Pastikan tombol benar-benar berubah menjadi expanded
        cy.get('[data-testid="web-refresh-flights-card"]')
          .eq(earliestIndex)
          .find('button[aria-label^="Collapse flight details"]')
          .should('have.attr', 'aria-expanded', 'true')

        // Setelah expand, detail flight harus muncul
        cy.get('[data-testid="flight-details-expand"]', {
          timeout: 15000
        })
          .should('be.visible')
      })
  }

  clickSelectFlight() {
    cy.get('[data-testid="flight-details-expand"]', {
      timeout: 15000
    })
      .should('be.visible')

    cy.get('[data-testid="flight-details-expand"]')
      .find('[data-testid="flight-detail-select-button"]')
      .should('be.visible')
      .click()
  }
}

export default FlightResultPage