import { deleteCompanyPictureByIdService } from '../../services/pictures/deleteCompanyPictureByIdService.js';

export default async (req, res, next) => {
  try {
    const { id_company, id_picture } = req.params;

    if (!id_company || !id_picture) {
      return res.status(400).json({ error: 'Company ID and Picture ID are required' });
    }

    const result = await deleteCompanyPictureByIdService(id_company, id_picture);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
