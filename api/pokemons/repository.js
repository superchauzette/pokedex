const Pokemon = require("./model");

exports.getAllPokemons = (req, res) => {
  return Pokemon.find()
    .populate("evolutions.id_pokemon")
    .then(pokemeons => res.json(pokemeons))
    .catch(() => res.status(404));
};

exports.getPokemeon = async (req, res) => {
  try {
    const p = await Pokemon.findById(req.params.id);
    res.json(p);
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.createPokemon = (req, res) => {
  const p = new Pokemon(req.body);
  p
    .save()
    .then(p => res.json(p))
    .catch(err => res.status(401).json({ err }));
};

exports.updatePokemon = (req, res) => {
  Pokemon.findByIdAndUpdate(req.params.id, req.body, (err, pokemon) => {
    if (err) throw err;
    res.json(pokemon);
  });
};

exports.deletePokemon = (req, res) => {
  Pokemon.findByIdAndRemove(req.params.id)
    .then(() => res.json({ ok: "is delete" }))
    .catch(err => res.json({ err }));
};
