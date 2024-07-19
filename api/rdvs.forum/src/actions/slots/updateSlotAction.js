import { updateSlotService } from '../../services/slots/updateSlotService.js';

export default async (req, res, next) => {
  try {
    const slotId = req.params.slotId;
    const { start, duration } = req.body;

    if (!start && !duration) {
      return res.status(400).json({ error: 'At least one of start time or duration is required' });
    }

    const updatedSlot = await updateSlotService(slotId, start, duration);
    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
