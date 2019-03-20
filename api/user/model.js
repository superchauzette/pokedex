const mongoose = require("mongoose");

const pokemonCaptures = mongoose.Schema({
  niveau: { type: Number, required: "Le Niveau est requit" },
  id_pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: "L'id pokemon est requit"
  }
});

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: "L'email est obligatoire" },
  password: { type: String, required: "Le mot de passe est obligatoire" },
  pokemonsCaptures: [pokemonCaptures]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
