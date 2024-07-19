import { updateCompanyOffersService } from '../../services/offers/updateCompanyOffersService.js';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;
    const newOffers = req.files.map(file => ({
      path: file.path,
      title: req.body.title || '', // assuming title is passed in the request body
      type: req.body.type || '' // assuming type is passed in the request body
    }));

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const result = await updateCompanyOffersService(id_company, newOffers);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
