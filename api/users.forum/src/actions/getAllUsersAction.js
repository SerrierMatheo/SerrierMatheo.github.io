import { getAllUsersService } from '../services/getAllUsersService.js'

const getAllUsersController = async (req, res) => {
  try {
    const { keyword } = req.query; // Récupération du mot clé depuis les paramètres de requête
    const users = await getAllUsersService(keyword);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllUsersController;
