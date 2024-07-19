import { claimRdvService } from '../../services/rdvs/claimRdvService.js';

export default async (req, res, next) => {
  try {
    const { userId, slotId } = req.body;

    if (!userId || !slotId) {
      return res.status(400).json({ error: 'User ID and slot ID are required' });
    }

    const newRdv = await claimRdvService(userId, slotId);
    res.status(201).json(newRdv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
