import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
    httpOnly: false,
    secure: false,
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
  if ([username, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User Already Exists");
  }
  const user = await User.create({
    username,
    email,
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
        refreshToken: undefined,
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

export { Register, Login, Logout };
