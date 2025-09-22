import jwt from "jsonwebtoken";

const SECRET: jwt.Secret = process.env.JWT_SECRET as string; // store securely in env

export function signJwt(payload: object, expiresIn: number = 1800) {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}
