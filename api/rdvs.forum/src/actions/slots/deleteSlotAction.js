import { deleteSlotService } from '../../services/slots/deleteSlotService.js';

export default async (req, res, next) => {
  try {
    const slotId = req.params.slotId;

    const result = await deleteSlotService(slotId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
