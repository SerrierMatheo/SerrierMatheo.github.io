import { getCompanyLogoService } from '../../services/companies/getCompanyLogoService.js'
import path from 'path';

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const logoPath = await getCompanyLogoService(id_company);

    if (!logoPath) {
      return res.status(404).json({ error: 'logo not found' });
    }

    const absolutePath = path.resolve(logoPath);
    res.sendFile(absolutePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};