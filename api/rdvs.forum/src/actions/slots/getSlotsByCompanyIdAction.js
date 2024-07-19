import { getSlotsByCompanyIdService } from '../../services/slots/getSlotsByCompanyIdService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;

    const slots = await getSlotsByCompanyIdService(companyId);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
