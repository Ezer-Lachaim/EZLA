import njwt from 'njwt';
import config from '../config';

export interface Claims {
  email: string;
  uid: string;
}

export function createJwt(claims: Claims) {
  const token = njwt.create({ ...claims }, config.jwtSecret);
  token.setExpiration(null);
  return token.compact();
}

export function verifyJwt(token: string): njwt.Jwt {
  return njwt.verify(token, config.jwtSecret);
}
