import { getCompanyOffersService } from '../../services/offers/getCompanyOffersService.js';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const offers = await getCompanyOffersService(id_company);

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
