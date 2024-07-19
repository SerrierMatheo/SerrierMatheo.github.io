import { createCompanyService } from '../../services/companies/createCompanyService.js';

export default async (req, res, next) => {
  try {
    const { name, secteur_activite_id } = req.body;

    if (!name) {
      return res.status(400).json('Company name is required');
    }

    if (!secteur_activite_id) {
      return res.status(400).json('Secteur activite id is required');
    }

    const result = await createCompanyService(name, secteur_activite_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
