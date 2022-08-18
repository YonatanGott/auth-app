import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../middlewares/responseMiddleware';

export const createAuthToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1m" });
};

export const createAuthRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY_REFRESH, { expiresIn: "3d" });
};

export const decodeAuthToken = (token: string, key: 'accessToken' | 'refreshToken') => {
  if (token) {
    let decodeKey = ''
    if(key === 'accessToken'){
      decodeKey = process.env.JWT_KEY
    }
    if(key === 'refreshToken'){
      decodeKey = process.env.JWT_KEY_REFRESH
    }
    const verify = jwt.verify(token, decodeKey);
    return verify;
  }
  return null;
}


export const getAccessToken = (authorization: string) => {
  if (!authorization) throw new ErrorHandler(403,'Invalid Authorization');
  if (!authorization.startsWith('Bearer ')) throw new ErrorHandler(403,'Invalid Authorization');
  return authorization.split(' ')[1];
};
