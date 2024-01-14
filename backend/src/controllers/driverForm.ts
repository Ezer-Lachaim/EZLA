// this controller is used to handle the new driver form
import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';

export function getNewForm(req: CustomRequest, res: Response): void {
  // print the request body to the console
  console.log(req.body);
  // send back a response
  res.status(200).send({
    message: 'Form received'
  });
}
