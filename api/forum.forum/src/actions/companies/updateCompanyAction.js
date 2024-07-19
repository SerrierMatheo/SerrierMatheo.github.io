import { updateCompanyService } from '../../services/companies/updateCompanyService.js';

export default async (req, res, next) => {
  try {
    /**
    const user = req.user; // Supposons que l'utilisateur soit ajouté à la requête par un middleware d'authentification

    if (user.type !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Only admins can update companies' });
    }**/

    const id = req.params.id;
    console.log(id)
    const updateFields = req.body;

    const company = await updateCompanyService(id, updateFields);
    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    res.status(400).json(error.message)
    next(error);
  }
};
