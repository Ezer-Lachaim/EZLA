import { Request, Response } from "express";

export const getHospitals = async (req: Request, res: Response): Promise<void> => {
    res.send(['תל השומר']);
};
