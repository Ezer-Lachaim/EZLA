import { Request, Response } from "express";
import client from '../repository/redis-client'

/**
 * GET /
 * Home page.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
    res.send([]);
};

export const get = async (req: Request, res: Response): Promise<void> => {
    res.send({ userOne: req.params.userId });
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    res.send({ hello: 'world' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    res.send({ login: 'world' });
};