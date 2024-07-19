import { getCompanyBackgroundService } from '../../services/companies/getCompanyBackgroundService.js'

import path from 'path';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const backgroundPath = await getCompanyBackgroundService(id_company);

    if (!backgroundPath) {
      return res.status(404).json({ error: 'background not found' });
    }

    const absolutePath = path.resolve(backgroundPath);
    res.sendfile(absolutePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};