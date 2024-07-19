import { getUserByIdService } from '../services/getUserByIdService.js'

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
}