import { getAllRdvService } from '../../services/rdvs/getAllRdvService.js';

export default async (req, res, next) => {
  try {
    const rdvs = await getAllRdvService();
    res.status(200).json(rdvs);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
