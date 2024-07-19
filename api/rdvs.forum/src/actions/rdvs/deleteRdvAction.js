import { deleteRdvService } from '../../services/rdvs/deleteRdvService.js';

export default async (req, res, next) => {
  try {
    const rdvId = req.params.rdvId;

    const result = await deleteRdvService(rdvId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
