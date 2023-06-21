import { Request, Response } from "express";
import client from '../repository/redis-client'
import { firebase, getAuthConfig, getAuthConfigAdmin } from "../utils/firebase-config";
import { User, UserRoleEnum } from "../models/user";

/**
 * GET /
 * Home page.
 */
const auth = getAuthConfig()
export const getAll = async (req: Request, res: Response): Promise<void> => {
    res.send([]);
};

export const get = async (req: Request, res: Response): Promise<void> => {
    getAuthConfigAdmin().verifyIdToken(req.body.idToken).then((decodedToken) => {
        const uid = decodedToken.uid;
        res.send(decodedToken);
      })
      .catch((error) => {
        // Handle error
      });
    
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    res.send({ hello: 'world' });
};



export const login = async (req: Request, res: Response): Promise<void> => {
    var email = req.body.email;
    var password = req.body.password;
    firebase.signInWithEmailAndPassword(auth, email, password)
        .then(function (userRecord) {
            res.send(userRecord)
        })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    var user : User = req.body;
    firebase.createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async function (userRecord) {
            user.userId = userRecord.user.uid;
            user.role = UserRoleEnum.Requester;
            await client.json.set(`user:${userRecord.user.uid}`, '$', {...user});
            res.send(userRecord)
        })
        .catch(function (error) {
            console.log('Something went wrong %s', error);
            res.status(400).send(error)
        });
    
};
