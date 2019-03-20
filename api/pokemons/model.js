const mongoose = require("mongoose");

const evolutionSchema = mongoose.Schema({
  niveau: { type: Number, min: 0, max: 100 },
  id_pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon"
  }
});

const pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
    unique: true
  },
  type: {
    type: String,
    enum: ["elec", "feu", "eau"]
  },
  img: String,
  evolutions: [evolutionSchema]
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
