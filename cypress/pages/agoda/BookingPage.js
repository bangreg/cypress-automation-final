class BookingPage {
    fillContactFirstName(firstName) {
        cy.get('[data-testid="contact.contactFirstName"]')
            .should('be.visible')
            .clear()
            .type(firstName)
            .should('have.value', firstName)
    }

    fillContactLastName(lastName) {
        cy.get('[data-testid="contact.contactLastName"]')
            .should('be.visible')
            .clear()
            .type(lastName)
            .should('have.value', lastName)
    }

    fillContactEmail(email) {
        cy.get('[data-testid="contact.contactEmail"]')
            .should('be.visible')
            .clear()
            .type(email)
            .should('have.value', email)
    }

    verifyResidenceCountry() {
        cy.contains('button[role="combobox"]', 'Indonesia')
            .should('be.visible')
    }

    verifyCountryCode() {
        cy.contains('button[role="combobox"]', '+62')
            .should('be.visible')
    }

    fillContactMobileNumber(mobileNumber) {
        cy.get(
            '[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]'
        )
            .should('be.visible')
            .clear()
            .type(mobileNumber)
            .should('have.value', mobileNumber)
    }

    selectPassengerGenderMale() {
        cy.get('input[type="radio"][aria-label="Male"]')
            .check({ force: true })
            .should('be.checked')
    }

    fillPassengerGivenName(givenName) {
        cy.get(
            '[data-testid="flight.forms.i0.units.i0.passengerFirstName"]'
        )
            .should('be.visible')
            .clear()
            .type(givenName)
            .should('have.value', givenName)
    }

    fillPassengerFamilyName(familyName) {
        cy.get(
            '[data-testid="flight.forms.i0.units.i0.passengerLastName"]'
        )
            .should('be.visible')
            .clear()
            .type(familyName)
            .should('have.value', familyName)
    }

    fillPassengerDateOfBirth(day, month, year) {
        // Day
        cy.get(
            '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]'
        )
            .should('be.visible')
            .clear()
            .type(day)
            .should('have.value', day)

        // Month dropdown
        cy.get(
            '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]'
        )
            .find('button[role="combobox"]')
            .should('be.visible')
            .click()

        cy.contains('[role="option"], [role="listbox"] *', new RegExp(`^${month}$`, 'i'))
            .should('be.visible')
            .click()

        // Year
        cy.get(
            '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]'
        )
            .should('be.visible')
            .clear()
            .type(year)
            .should('have.value', year)
    }

    selectPassengerNationality(nationality) {
        cy.get('button[role="combobox"]')
            .filter(':visible')
            .contains('Select')
            .click()

        cy.contains(
            '[role="option"], [role="listbox"] *',
            new RegExp(`^${nationality}$`, 'i')
        )
            .should('be.visible')
            .click()
    }

    selectBasicSupportLevel() {
        cy.get('[data-testid="ceg-upsell-select-button-option-BASIC"]')
            .should('be.visible')
            .and('have.attr', 'aria-pressed', 'true')
            .and('contain.text', 'Selected')
    }

    selectNoTravelProtection() {
        cy.get('[data-testid="radio-button-option-no"]')
            .should('be.visible')
            .click()

        cy.get('[data-testid="radio-button-option-no"]')
            .should('have.attr', 'aria-checked', 'true')

        cy.get('[data-testid="radio-button-price-option-no"]')
            .should('contain.text', 'Rp 0')
    }

    checkAgreeCheckbox() {
        cy.get(
            '[data-component="NewsletterSubscriptionMessage"] input[type="checkbox"]'
        )
            .check({ force: true })
            .should('be.checked')
    }

    continueToPayment() {
        cy.get('[data-testid="continue-to-payment-button"]', {
            timeout: 15000
        })
            .should('be.visible')
            .and('not.be.disabled')
            .click()
    }

    declineSupportUpgrade() {
        cy.get('[data-component="last-chance-decline-button"]')
            .should('be.visible')
            .and('contain.text', 'No, thanks')
            .click()

        cy.get('[data-testid="addon-last-chance-CEG_UPSELL"]')
            .should('not.exist')
    }

    verifyPaymentPage() {
        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/packages/payment')
        cy.get('body').should('be.visible')
    }
}

export default BookingPage