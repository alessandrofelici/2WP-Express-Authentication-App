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