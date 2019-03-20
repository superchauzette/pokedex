const User = require("./model");
const verifyToken = require("../../utils/verifyToken");

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.status(404);
    res.json(users);
  });
};

exports.createUser = (req, res) => {
  const u = new User(req.body);
  u
    .save()
    .then(p => res.json(p))
    .catch(err => res.status(401).json(err));
};

exports.login = async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password)
    return res
      .status(400)
      .json({ err: "un email et un password sont attendu" });

  const u = await User.findOne({ email: user.email });

  if (!u) return res.status(404).json({ err: "user not found" });
  if (user.password !== u.password)
    res.status(401).json({ err: "mauvais mot de passe" });

  const token = await jwt.sign({ user }, verifyToken.SECRETKEY, {
    expiresIn: "300000000s"
  });

  if (!token) return res.status(403).json({ err: "pb with token" });
  return res.json({ token });
};

exports.getUserPokemons = (req, res) => {
  User.findById(req.params.iduser)
    .populate("pokemonsCaptures.id_pokemon")
    .then(p => res.json({ pokemonsCaptures: p.pokemonsCaptures }))
    .catch(err => res.status(404).json({ err }));
};

exports.createUserPokemon = (req, res) => {
  User.findById(req.params.iduser)
    .then(p => {
      const newPoke = req.body;
      p.pokemonsCaptures.push(newPoke);
      p.save().then(p => res.json({ pokemonsCaptures: p.pokemonsCaptures }));
    })
    .catch(err => res.status(404).json({ err }));
};

exports.updateUserPokemon = (req, res) => {
  User.findById(req.params.iduser)
    .then(p => {
      const idPokemon = req.params.idpokemon;
      const niveau = req.body.niveau;

      const pcToModify = p.pokemonsCaptures.find(pc => pc.id === idPokemon);
      pcToModify.niveau = niveau;

      return p
        .save()
        .then(p => res.json({ pokemonsCaptures: p.pokemonsCaptures }));
    })
    .catch(err => res.status(404).json({ err }));
};

exports.deleteUserPokemon = (req, res) => {
  User.findById(req.params.iduser)
    .then(p => {
      const idPokemon = req.params.idpokemon;
      const newListPokemon = p.pokemonsCaptures.filter(
        pc => pc.id !== idPokemon
      );
      p.pokemonsCaptures = newListPokemon;
      p.save().then(p => res.json({ pokemonsCaptures: p.pokemonsCaptures }));
    })
    .catch(err => res.status(404).json({ err }));
};
