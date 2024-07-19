import { deleteUserByIdService } from '../services/deleteUserByIdService.js'

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUserByIdService(id);
    res.json("user deleted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
}