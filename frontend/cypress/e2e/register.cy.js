describe("User Registration Flow", () => {
  it("should register user successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="name-input"]').type("Cypress User");
    cy.get('[data-cy="email-input"]').type(
      `cypress${Date.now()}@test.com`
    );
    cy.get('[data-cy="password-input"]').type("123456");

    cy.get('[data-cy="submit-btn"]').click();

    cy.contains("User registered").should("be.visible");
  });
});
