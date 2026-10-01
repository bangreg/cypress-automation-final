import AgodaHomePage from '../../pages/agoda/AgodaHomePage'
import FlightSearchPage from '../../pages/agoda/FlightSearchPage'

describe('Agoda Flight Booking', () => {
  const agodaHomePage = new AgodaHomePage()
  const flightSearchPage = new FlightSearchPage()

  it('should set Jakarta, Singapore and tomorrow departure date', () => {
    agodaHomePage.visit()

    agodaHomePage.selectFlights()

    flightSearchPage.selectFrom('Jakarta')
    flightSearchPage.selectTo('Singapore')
    flightSearchPage.openDepartureDate()
    flightSearchPage.selectDepartureDate()
    flightSearchPage.closePassengerPopup()
    flightSearchPage.searchFlights()
  })
})