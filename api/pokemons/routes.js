const repo = require("./repository");

module.exports = app =>
  app
    .get("/pokemons", repo.getAllPokemons)
    .get("/pokemons/:id", repo.getPokemeon)
    .post("/pokemons", repo.createPokemon)
    .patch("/pokemons/:id", repo.updatePokemon)
    .delete("/pokemons/:id", repo.deletePokemon);
