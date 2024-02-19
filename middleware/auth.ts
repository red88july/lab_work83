import { HydratedDocument } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import User from '../models/User';
import { UserTypesExtend } from '../types';

export interface RequestUser extends Request {
  user?: HydratedDocument<UserTypesExtend>;
}

const auth = async (req: RequestUser, res: Response, next: NextFunction) => {

  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(422).send({ error: 'No Authorization header present' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(422).send({ error: 'No token present' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(422).send({ error: 'Wrong token!' });
  }
  
  req.user = user;

  next();
};

export default auth;