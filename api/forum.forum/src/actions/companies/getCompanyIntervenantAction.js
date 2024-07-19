import { getCompanyIntervenantService } from '../../services/companies/getCompanyIntervenantService.js'

import path from 'path';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;
    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }
    const intervenant = await getCompanyIntervenantService(id_company);
    res.status(200).json(intervenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};