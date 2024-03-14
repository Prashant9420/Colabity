import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../controllers/user.controller.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.headers);
    const accessToken =
      req.cookies?.accessToken || (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "");
    console.log("accessToken", accessToken);
    if (!accessToken) {
    console.log("access token not found")
      throw new ApiError(409, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken.id).select(
      "-refreshToken -password"
    );
    console.log("user", user);
    if (!user) {
      console.log("user not found");
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { verifyJWT };
