import njwt from 'njwt';

export interface Claims {
  email: string;
  uid: string;
}

export function createJwt(claims: Claims) {
  const token = njwt.create({ ...claims }, process.env.JWT_SECRET);
  token.setExpiration(null);
  return token.compact();
}

export function verifyJwt(token: string): njwt.Jwt {
  return njwt.verify(token, process.env.JWT_SECRET);
}
