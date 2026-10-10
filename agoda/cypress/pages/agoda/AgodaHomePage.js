class AgodaHomePage {
  visit() {
    cy.visit(Cypress.expose('AGODA_URL'))
  }
  selectFlights() {
    cy.contains('p', 'Flights').click()
  }
}

export default AgodaHomePage