import * as Constants from "../support/constants";

describe("Landing page tests for the amount field", () => {
  beforeEach(() => {
    //opening a page
    cy.visit("https://csgoempire.com/roulette");
  });

  it("Verify if user has landed on landing page by checking key elements", () => {
    //input field for the amount should be visible
    cy.get(Constants.AMOUNT_INPUT_PATH).should("be.visible");
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");
    //sign in button
    cy.contains("button", "Sign In");
    //message
    cy.contains("div", Constants.INFO_MESSAGE);
  });

  it("User shoud be able to enter positive numbers in amount input field and get number transformed to decimal value", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //input 30 in amount field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, 30);

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "30.00");

    //input 30 in amount field with special characher +
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "+30");

    //click away
    cy.get("body").click(0, 0);
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "30.00");
  });

  it("When user enters string value in amount input field, he shloud get NaN as final value", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //input string in amount field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "some text");

    //click away
    cy.clickAway();

    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "NaN");

    //input string with number in the input field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "stringWith890number");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "NaN");
  });

  it("User shoud be able to enter negative number in amount input field", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //input -30 in amount field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, -30);

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "-30.00");
  });

  it("User shoud be able to do the addition, multiplication and division and clear input", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");
    //addition
    cy.contains("button", "+ 10").click();
    cy.contains("button", "+ 100").click();
    //multiplication
    cy.contains("button", "x 2").click();
    //division
    cy.contains("button", "1/ 2").click();
    //assertion for final value should be 110
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "110.00");
    cy.get(Constants.AMOUNT_INPUT_PATH).clear({ force: true });
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");
  });

  it("User should get NaN after entering special characters in the amount input field", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //input special characters in amount field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "!@#$%&*/");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "NaN");

    //input .
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, ".");
    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "NaN");
  });

  it("User should get number value in the amount field if the first part of input is a number", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //add - special characters between numbers in amount field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "200-96");
    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "200.00");

    //add / special character between numbers the amount input field
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "800/7");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "800.00");

    //input number and string - first part as number then string
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "170string");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "170.00");
  });

  it("User should get number with two decimals rounded", () => {
    //input field should be empty
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "");

    //user input with three decinals
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "200.023");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "200.02");

    //user input
    cy.inputValue(Constants.AMOUNT_INPUT_PATH, "800.7895");

    //click away
    cy.clickAway();
    //assertion
    cy.get(Constants.AMOUNT_INPUT_PATH).should("have.value", "800.79");
  });
});
