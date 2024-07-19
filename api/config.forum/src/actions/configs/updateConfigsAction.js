import { updateConfigsService } from '../../services/configs/updateConfigsService.js';

export default async (req, res, next) => {
  try {
    const updateFields = req.body;

    const updatedConfig = await updateConfigsService(updateFields);

    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
