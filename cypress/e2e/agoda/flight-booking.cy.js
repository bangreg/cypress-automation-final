import AgodaHomePage from '../../pages/agoda/AgodaHomePage'
import FlightSearchPage from '../../pages/agoda/FlightSearchPage'
import FlightResultPage from '../../pages/agoda/FlightResultPage'
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver loop completed with undelivered notifications') ||
    err.message === 'Script error.'
  ) {
    return false
  }
})

describe('Agoda Flight Booking', () => {
  const agodaHomePage = new AgodaHomePage()
  const flightSearchPage = new FlightSearchPage()
  const flightResultPage = new FlightResultPage()

  it('should set Jakarta, Singapore and tomorrow departure date', () => {
    agodaHomePage.visit()

    agodaHomePage.selectFlights()

    flightSearchPage.selectFrom('Jakarta')
    flightSearchPage.selectTo('Singapore')
    flightSearchPage.openDepartureDate()
    flightSearchPage.selectDepartureDate()
    flightSearchPage.closePassengerPopup()
    flightSearchPage.searchFlights()

    flightResultPage.openAllAirlines()
    flightResultPage.selectMalaysiaAirlines()
    flightResultPage.selectEarliestFlight()
    flightResultPage.clickSelectFlight()
    cy.pause()
  })
})