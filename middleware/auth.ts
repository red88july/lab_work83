import {NextFunction, Request, Response} from 'express';
import {HydratedDocument} from 'mongoose';
import {UserTypesExtend} from '../types';
import User from '../models/User';

export interface RequestUser extends Request {
  user?: HydratedDocument<UserTypesExtend>;
}

const auth = async (req: RequestUser, res: Response, next: NextFunction) => {

  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(400).send({ error: 'No Authorization header present' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(400).send({ error: 'No token present' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(400).send({ error: 'Wrong token!' });
  }
  
  req.user = user;


  next();
};

export default auth;