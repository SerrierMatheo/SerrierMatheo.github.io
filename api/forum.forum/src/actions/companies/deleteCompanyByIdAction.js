import { deleteCompanyByIdService } from '../../services/companies/deleteCompanyByIdService.js'

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteCompanyByIdService(id);
    res.json("company deleted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
}