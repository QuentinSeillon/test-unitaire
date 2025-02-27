describe('Gestion des utilisateurs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8888');
  });

  it('Charge correctement la page', () => {
    cy.contains('h1', 'Gestion des utilisateurs');
    cy.get('#userForm').should('exist');
    cy.get('#userList').should('exist');
  });

  it('Ajoute un nouvel utilisateur', () => {
    cy.get('#name').type('Jean Dupont');
    cy.get('#email').type('jean.dupont@example.com');
    cy.get('#userForm').submit();

    cy.wait(500); // Attendre la mise à jour
    cy.get('#userList').should('contain', 'Jean Dupont (jean.dupont@example.com)');
  });

  it('Modifie un utilisateur existant', () => {
    // Rechercher l'utilisateur ajouté et le modifier
    cy.get('#userList').contains('Jean Dupont').parent().within(() => {
      cy.get("button").contains("✏️").click();
    });

    cy.get('#name').clear().type('Jean Dupont Modifié');
    cy.get('#email').clear().type('jean.dupont.modified@example.com');
    cy.get('#userForm').submit();

    cy.wait(500);
    cy.get('#userList').should('contain', 'Jean Dupont Modifié (jean.dupont.modified@example.com)');
  });

  it('Supprime un utilisateur', () => {
    // Supprimer l'utilisateur ajouté
    cy.get('#userList').contains('Jean Dupont').parent().within(() => {
      cy.get("button").contains("❌").click();
    });

    cy.wait(500);
    cy.get('#userList').should('not.contain', 'Jean Dupont');
  });
});
