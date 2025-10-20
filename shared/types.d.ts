// extend express.Request
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        name: string;
      }
      token?: string;
    }
  }
}

export interface JwtPayload {
  id: string;
  username: string;
  name: string;
  exp?: number;
  iat?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  belongsTo: {
    username: string;
  };
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}