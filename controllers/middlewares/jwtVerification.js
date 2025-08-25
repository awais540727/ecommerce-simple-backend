import jwt from "jsonwebtoken";

export function jwtAuth(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "Unauthorize, token is missing" });
  }
  token = token.split(" ")[1];
  //   console.log(token);
  jwt.verify(token, process.env.jwtSecret, (error, response) => {
    if (error) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: error.message });
    }
  });
  next();
}
