import { getCompanyByIdService } from '../../services/companies/getCompanyByIdService.js'

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    const company = await getCompanyByIdService(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};