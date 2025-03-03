interface IJwtPayload {
  _id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export { IJwtPayload };
