import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
    res.send({ ride: 'world' });
};

export const get = async (req: Request, res: Response): Promise<void> => {
    res.send({ rideOne: req.params.rideId });
};
