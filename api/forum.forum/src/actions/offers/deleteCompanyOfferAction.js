import { deleteCompanyOfferService } from '../../services/offers/deleteCompanyOfferService.js';

export default async (req, res, next) => {
  try {
    const { id_company, id_offer } = req.params;

    if (!id_company || !id_offer) {
      return res.status(400).json({ error: 'Company ID and Offer ID are required' });
    }

    const result = await deleteCompanyOfferService(id_company, id_offer);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
