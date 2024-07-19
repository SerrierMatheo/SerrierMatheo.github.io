import { createSlotService } from '../../services/slots/createSlotService.js'

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;

    const { start, duration } = req.body;

    if(!start || !duration) {
      return res.status(400).json('start and duration are required')
    }

    const result = await createSlotService(companyId, start, duration);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message)
    next(error);
  }
}