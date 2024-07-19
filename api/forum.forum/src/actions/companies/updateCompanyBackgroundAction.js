import { updateCompanyBackgroundService } from '../../services/companies/updateCompanyBackgroundService.js'

export default async (req, res, next) => {
  try {
    const { id_company } = req.params;
    const backgroundPath = req.file.path;

    if (!id_company) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const result = await updateCompanyBackgroundService(id_company, backgroundPath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};