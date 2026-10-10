
import AgodaHomePage from '../../pages/agoda/AgodaHomePage'
import FlightSearchPage from '../../pages/agoda/FlightSearchPage'
import FlightResultPage from '../../pages/agoda/FlightResultPage'
import BookingPage from '../../pages/agoda/BookingPage'

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
  const bookingPage = new BookingPage()

  // Flight test data
  const flight = {
    from: 'Jakarta',
    to: 'Singapore',
    airline: 'Malaysia Airlines'
  }

  // Passenger test data
  const passenger = {
    firstName: 'Samuel',
    lastName: 'Siregar',
    email: 'samuelsiregar@example.com',
    mobileNumber: '81312345678',
    gender: 'Male',
    birthDay: '01',
    birthMonth: 'January',
    birthYear: '1990',
    nationality: 'Indonesia',
    passportNumber: 'A12345678',
    passportCountryOfIssue: 'Indonesia',
    passportExpiryDay: '31',
    passportExpiryMonth: 'December',
    passportExpiryYear: '2030',
  }

  it('should complete flight booking flow until payment page', () => {
    // 1. Open Agoda and search flights
    agodaHomePage.visit()
    agodaHomePage.selectFlights()

    flightSearchPage.selectFrom(flight.from)
    flightSearchPage.selectTo(flight.to)
    flightSearchPage.openDepartureDate()
    flightSearchPage.selectDepartureDate()
    flightSearchPage.closePassengerPopup()
    flightSearchPage.searchFlights()

    // 2. Select Malaysia Airlines' earliest flight
    flightResultPage.openAllAirlines()
    flightResultPage.selectMalaysiaAirlines()
    flightResultPage.selectEarliestFlight()
    flightResultPage.clickSelectFlight()
    flightResultPage.verifyBookingPage()

    // 3. Fill contact details
    bookingPage.fillContactFirstName(passenger.firstName)
    bookingPage.fillContactLastName(passenger.lastName)
    bookingPage.fillContactEmail(passenger.email)
    bookingPage.verifyResidenceCountry()
    bookingPage.verifyCountryCode()
    bookingPage.fillContactMobileNumber(passenger.mobileNumber)

    // 4. Fill passenger details
    bookingPage.selectPassengerGenderMale()
    bookingPage.fillPassengerGivenName(passenger.firstName)
    bookingPage.fillPassengerFamilyName(passenger.lastName)
    bookingPage.fillPassengerDateOfBirth(
      passenger.birthDay,
      passenger.birthMonth,
      passenger.birthYear
    )
    bookingPage.selectPassengerNationality(passenger.nationality)
    bookingPage.fillPassengerPassportNumber(passenger.passportNumber)
    bookingPage.selectPassportCountryOfIssue(passenger.passportCountryOfIssue)
    bookingPage.fillPassengerPassportExpiryDate(
      passenger.passportExpiryDay,
      passenger.passportExpiryMonth,
      passenger.passportExpiryYear
    )


    // 5. Select optional services
    bookingPage.selectBasicSupportLevel()
    bookingPage.selectNoTravelProtection()
    bookingPage.checkAgreeCheckbox()

    // 6. Continue to payment page
    bookingPage.continueToPayment()
    bookingPage.declineSupportUpgrade()
    
    //Expect datanya dilakukan di page memilih pembayaran (gak perlu bayar)
    bookingPage.verifyPaymentPage()
  })
})
