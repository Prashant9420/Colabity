import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { uploadOnImageKit } from "../utils/imageKit.js";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new ApiError(403, "User Not Found");
  }
  const isPasswordMatch = await foundUser.matchPassword(password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid Credentials");

  const userInfo = foundUser.toJSON();

  const { refreshToken, accessToken } = await generateTokens(userInfo._id);
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User Logged In Successfully", {
        user: userInfo,
        accessToken,
        refreshToken,
      })
    );
});

const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("hi from register controller");
  if ([username, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User Already Exists");
  }
  console.log("req.file: ", req.file);
  if (req.file) {
    // const avatar = await uploadOnCloudinary(req.file.path);
    const avatar = await uploadOnImageKit(req.file.path, req.file.filename);
    if (!avatar) {
      throw new ApiError(
        500,
        "Something went wrong while uploading the avatar"
      );
    }
    console.log("avatar: ", avatar);
    req.body.avatar = avatar.url;
  }
  const user = await User.create({
    username,
    email,
    avatar: req.body.avatar || "",
    password,
  });
  const createdUser = user.toJSON();

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  res
    .status(201)
    .json(new ApiResponse(201, "User Created Successfully", createdUser));
});

const Logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken ||
    req.headers.authorization.replace("Bearer ", "");
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
    console.log(decodedToken)
  const user = await User.findById(decodedToken?.id);
  if (!user) {
    console.log("user not found")
    throw new ApiError(401, "Invalid Refresh Token");
  }
  console.log("incoming refresh: ",incomingRefreshToken);
  console.log("user token refresh: ",user.refreshToken);
  if (incomingRefreshToken !== user.refreshToken) {
  
    throw new ApiError(401, "Invalid Refresh Token");
  }
  
  const { accessToken, refreshToken } = await generateTokens(user._id);
  const userInfo = user.toJSON();
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Token Refreshed Successfully", {
        user:userInfo,
        accessToken,
        refreshToken,
      })
    );
});

export { Register, Login, Logout, refreshAccessToken };
