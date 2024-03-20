import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Please login to get access", success: false });
  }
  const user = jwt.verify(token, "NK");
  if (!user) {
    return res
      .status(400)
      .json({ message: "Unathorized Request", success: false });
  }
  req.user = user.id;

  next();
};
