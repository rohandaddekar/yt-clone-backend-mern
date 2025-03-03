import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../../models/user.model";
import { IJwtPayload } from "../../types/jwt";
import { NextFunction, Request, Response } from "express";

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // CHECK REFRESH TOKEN
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken)
      return next(createHttpError(401, "Refresh token not found"));

    // DECODE REFRESH TOKEN
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as IJwtPayload;
    if (!decodedRefreshToken)
      return next(createHttpError(401, "Invalid refresh token"));

    // FIND USER
    const user = await User.findById(decodedRefreshToken._id);
    if (!user) return next(createHttpError(401, "User not found"));

    // GENERATE NEW ACCESS AND REFRESH TOKEN
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    // UPDATE REFRESH TOKEN
    user.refreshToken = newRefreshToken;
    await user.save();

    // SEND RESPONSE
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
  } catch (error) {
    console.error("Failed to refresh token: ", error);
    next(createHttpError(500, "Failed to refresh token"));
  }
};

export default refreshToken;

// ------- HOW TO IMPLEMENT REFRESH TOKEN IN FRONTEND START

// import axios from 'axios';

// Create axios instance
// const api = axios.create({
//   baseURL: 'https://your-api-url.com/api',
//   withCredentials: true, // Important for cookies
// });

// Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // If error is 401 and we haven't already tried to refresh
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call refresh token endpoint
//         await axios.post('/auth/refresh-token', {}, { withCredentials: true });

//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // If refresh token also fails, redirect to login
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// ------- HOW TO IMPLEMENT REFRESH TOKEN IN FRONTEND END
