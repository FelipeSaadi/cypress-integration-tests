describe('Pokemon App', () => {
  it('displays a input with all pokemons mocked', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon', { fixture: 'pokemons.json' }).as('getAllPokemons');
    cy.visit('/');
    cy.wait('@getAllPokemons');
    cy.get('select').should('have.value', 'bulbasaur')
  });

  it('displays a pokemon with mock data', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/bulbasaur', { fixture: 'bulbasaur.json' }).as('getPokemon');
    cy.visit('/');
    cy.wait('@getPokemon');
    cy.get('h2').should('contain', 'BULBASAUR');
  });

  it('displays a pokemon description with mock data', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1', { fixture: 'bulbasaur-description.json' }).as('getPokemonDescription');
    cy.visit('/');
    cy.wait('@getPokemonDescription');
    cy.get('p').should('contain', 'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.');
  });
});