import { getAllCompaniesService } from '../../services/companies/getAllCompaniesService.js';

export default async (req, res, next) => {
  try {
    const keyword = req.query.keyword || ''; // Récupérer le mot-clé de la requête
    const sectorIds = req.query.sectorIds ? req.query.sectorIds.split(',').map(Number) : []; // Récupérer les IDs des secteurs d'activité de la requête
    const tagIds = req.query.tagIds ? req.query.tagIds.split(',').map(Number) : []; // Récupérer les IDs des tags de la requête
    const companies = await getAllCompaniesService(keyword, sectorIds, tagIds);
    res.status(200).json(companies);
  } catch (error) {
    next(500);
  }
};
