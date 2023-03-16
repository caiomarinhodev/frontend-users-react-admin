describe("User CRUD Operations", () => {
  beforeEach(() => {
    cy.task("db:erase");
    cy.visit("http://127.0.0.1:3000");
  });

  describe("User list", () => {
    it("Check user list", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "caiomarinho@gmail.com",
        password: "123456",
      });
      cy.contains("Caio");
      cy.contains("caiomarinho@gmail.com");
      cy.contains("123456");
    });

    it("Check is highlight when select item ", () => {
      for (let i = 0; i < 20; i++) {
        cy.task("db:create:user", {
          name: `Caio ${i}`,
          email: "caiomarinho@gmail.com",
          password: "123456",
        });
      }

      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root").click();
      cy.get(".MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root").should(
        "have.class",
        "Mui-selected"
      );
    });
  });

  describe("User create", () => {
    it("Create an user", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Caio");
      cy.get("#email").type("caiomarinho@gmail.com");
      cy.get("#password").type("123456");
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

      cy.contains("Element created");
      cy.contains("Caio");
      cy.contains("caiomarinho@gmail.com");
      cy.contains("123456");
    });
  });

  describe("User edit", () => {
    it("Edit an user", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "caiomarinho@gmail.com",
        password: "123456",
      });

      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get("#name").clear().type("John Doe");
      cy.get("#email").clear().type("john@doe.com");
      cy.get("#password").clear().type("123456");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.contains("Element updated");
      cy.contains("Fulando de Tal");
      cy.contains("fulano@detal.com");
      cy.contains("123456");
    });
  });

  describe("User delete", () => {
    it.only("Delete an user", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "caiomarinho@gmail.com",
        password: "123456",
      });

      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get(".MuiButton-text").click();

      cy.contains("No User yet.");
    });
  });

  describe("CustomCrud component", () => {
    // test if create user with invalid data
    it("Create an user with invalid data", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Caio");
      cy.get("#email").type("email");
      cy.get("#password").type("123456");
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

      cy.contains("Element created");
      cy.contains("Caio");
      cy.contains("email");
    });
    // test if edit user with invalid data
    it("Edit an user with invalid data", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "email",
        password: "123456",
      });
      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get("#name").clear().type("Fulano de Tal");
      cy.get("#email").clear().type("email");
      cy.get("#password").clear().type("123456");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.contains("Element updated");
      cy.contains("Fulando de Tal");
      cy.contains("email");
    });
    // test if delete user with invalid data
    it("Delete an user with invalid data", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "email",
        password: "123456",
      });
      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get(".MuiButton-text").click();

      cy.contains("No User yet.");
    });

    //test if create user already exists
    it("Create an user that already exists", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "email",
        password: "123456",
      });

      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Caio");
      cy.get("#email").type("email");
      cy.get("#password").type("123456");
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

      cy.contains("Element created");
      cy.contains("Caio");
      cy.contains("email");
    });
    //test if edit user already exists
    it("Edit an user that already exists", () => {
      cy.task("db:create:user", {
        name: "Caio",
        email: "email",
        password: "123456",
      });
      cy.task("db:create:user", {
        name: "Caio",
        email: "email",
        password: "123456",
      });

      cy.visit("http://127.0.0.1:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get("#name").clear().type("Fulano de Tal");
      cy.get("#email").clear().type("email");
      cy.get("#password").clear().type("123456");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.contains("Element updated");
      cy.contains("Fulando de Tal");
      cy.contains("email");
    });
  });
});
