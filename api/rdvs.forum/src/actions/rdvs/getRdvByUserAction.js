import { getRdvByUserService } from '../../services/rdvs/getRdvByUserService.js';

export default async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const rdvs = await getRdvByUserService(userId);
    res.status(200).json(rdvs);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
