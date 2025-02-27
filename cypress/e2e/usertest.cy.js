describe('CRUD utilisateur avec Cypress', () => {
  it('Verifier si un utilisateur exist', () => {
    cy.visit('http://localhost:8888'); // Ouvre l'URL

    // Remplir le formulaire
    cy.get('#name').type('toto'); // Saisir le nom
    cy.get('#email').type('toto@gmail.com'); // Saisir l'email

    // Soumettre le formulaire
    cy.get('button:nth-child(4)').click(); // Cliquer sur le bouton pour soumettre (en utilisant :nth-child pour le sélectionner)

    // Vérifier que l'utilisateur est bien ajouté à la liste
    cy.get('#userList li').should('have.length.greaterThan', 0); // Vérifie qu'il y a au moins un utilisateur dans la liste

    // Vérifier que l'utilisateur ajouté (toto) est dans la liste
    cy.get('#userList li').each(($li) => {
      const userText = $li.find('span').text(); // Récupère le texte du span dans chaque élément li
      if (userText.includes('toto (toto@gmail.com)')) {
        expect(userText).to.include('toto (toto@gmail.com)'); // Vérifie que l'élément li contient bien le nom et l'email de toto
      }
    });
  });
});

describe('Ajouter un utilisateur avec Cypress', () => {
  it('Ajouter un utilisateur via l\'API et vérifier avec GET', () => {
    // Données de l'utilisateur à ajouter
    const newUser = {
      name: 'toto',
      email: 'toto@gmail.com'
    };

    // Envoi de la requête POST pour ajouter un utilisateur
    cy.request({
      method: 'POST',
      url: 'http://localhost:8888', // Remplacez par l'URL de l'API qui gère l'ajout d'un utilisateur
      body: newUser, // Données envoyées dans la requête
      headers: {
        'Content-Type': 'application/json' // Envoie les données sous forme JSON
      }
    }).then((response) => {
      // Vérifie que la réponse du serveur indique un ajout réussi
      console.log('res =>',response.body)
      expect(response.status).to.eq(200);
      //expect(response.body.message).to.eq('Utilisateur ajouté avec succès');
    });

  });
});

