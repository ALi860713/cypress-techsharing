describe("group page operate", function () {
    beforeEach(() => {
        cy.visit('localhost:3000');
    })
    it("home page will see element correctly", function() {
        cy.findByText("Home").should("exist");
        cy.findByText("Groups").should("exist");
        cy.findByText("End-to-End Testing with Cypress.io Workshop").should("exist");
        cy.findByText("Visit cypress.io to read the documentation").should("exist");
    })
    it("the address in group page can be edit", function() {
        cy.request('POST', 'http://localhost:8080/api/group', {
            "name": "Shenzhen Tech Community",
            "address": null,
            "city": null,
            "stateOrProvince": null,
            "country": null,
            "postalCode": null,
            "user": null,
            "events": [
                {
                    "date": "2021-09-15T17:30:00Z",
                    "title": "Visual Testing with yeongsheng",
                    "description": "Visual Testing with Cypress + Percy",
                    "attendees": []
                }
            ]
        });
        cy.findByText("Groups").should("exist").click();
        cy.url().should("include", "/groups");
        cy.findByText("Sep 16, 2021 : Visual Testing with yeongsheng").should("exist").then((element) => {
            cy.get(element).parent().should("exist").findByText("Edit").should("exist").click();
        });
        cy.findByLabelText("Address").click().type("AAA");
        cy.findByText("Submit").should("exist").click();
        cy.findByText("AAA").should("exist");
    })
    it("the data in group page can be delete", function() {
        cy.findByText("Groups").should("exist").click();
        cy.url().should("include", "/groups");
        cy.findByText("Sep 16, 2021 : Visual Testing with yeongsheng").should("exist").then((element) => {
            cy.get(element).parent().should("exist").findByText("Delete").should("exist").click();
        });
        cy.findByText("Sep 16, 2021 : Visual Testing with yeongsheng").should("not.exist");
    })
})