import { getIntervenantsNbService } from "../services/getIntervenantsNbService.js";

export default async (req, res, next) => {
    try {
        const intervNb = await getIntervenantsNbService();
        res.status(200).json(intervNb);
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};
