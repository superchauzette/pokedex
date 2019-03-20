const jwt = require("jsonwebtoken");
const repo = require("./repository");
const verifyToken = require("../../utils/verifyToken");

module.exports = app => {
  app.post("/users/login", repo.login).post("/users", repo.createUser);

  app
    .use(verifyToken)
    .get("/users", repo.getAllUsers)
    .get("/users/:iduser/pokemons", repo.getUserPokemons)
    .post("/users/:iduser/pokemons", repo.createUserPokemon)
    .patch("/users/:iduser/pokemons/:idpokemon", repo.updateUserPokemon)
    .delete("/users/:iduser/pokemons/:idpokemon", repo.deleteUserPokemon);
};
