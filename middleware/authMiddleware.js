import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const passkey = req.body.passkey;

  if (!passkey || passkey !== process.env.ADMIN_PASSKEY) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or missing passkey" });
  }

  next();
};
