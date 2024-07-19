import { getCompanyPictureByIdService } from '../../services/pictures/getCompanyPictureByIdService.js';
import path from 'path';

export default async (req, res, next) => {
  try {
    const { id_company, id_picture } = req.params;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    if (!id_picture) {
        return res.status(400).json({ error: 'Picture ID is required' });
    }

    const pictures = await getCompanyPictureByIdService(id_company, id_picture);

    if (!pictures) {
      return res.status(404).json({ error: 'No pictures found for the specified company and picture_id' });
    }

    const absolutePath = path.resolve(pictures);
    res.sendFile(absolutePath);

  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
