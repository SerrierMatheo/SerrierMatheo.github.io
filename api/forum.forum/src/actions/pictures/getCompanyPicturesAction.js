import { getCompanyPicturesService } from '../../services/pictures/getCompanyPicturesService.js';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const pictures = await getCompanyPicturesService(id_company);

    res.status(200).json(pictures);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
