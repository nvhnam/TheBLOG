import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_cookie;
  console.log(req.cookies);
  if (!token) return res.status(401).json("No Token Provided");
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json("Invalid token");

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).json("Can not verify token ", error);
  }
};

export default authMiddleware;
