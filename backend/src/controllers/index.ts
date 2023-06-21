import { Request, Response } from "express";
import client from "../repository/redis-client";

export const getHospitals = async (req: Request, res: Response): Promise<void> => {
    res.send(['תל השומר']);
};

export const getAllKeys = async (req: Request, res: Response): Promise<void> => {
    const keys = await client.keys("*");
    res.send(keys);
};