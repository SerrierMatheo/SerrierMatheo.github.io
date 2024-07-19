import { updateCompanyPicturesService } from '../../services/pictures/updateCompanyPicturesService.js';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;
    const newPictures = req.files.map(file => ({
      path: file.path,
      alt: req.body.alt || ''
    }));

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const result = await updateCompanyPicturesService(id_company, newPictures);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
