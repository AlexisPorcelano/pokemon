const { Pokemon } = require("../db.js");

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);

  try {
    let found = await Pokemon.findOne({ where: { id: parsedId } });
    if (!found) {
      res.status(404).json({ error: "Pokemon not found" });
    } else {
      await found.destroy();
      res.status(200).json({ message: "Pokemon deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePokemon;
