import { getCompaniesNbService } from "../services/getCompaniesNbService.js";

export default async (req, res, next) => {
    try {
        const compagniesNb = await getCompaniesNbService();
        res.status(200).json(compagniesNb);
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};
