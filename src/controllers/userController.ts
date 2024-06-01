import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = await User.findById(userId, "name email");

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = await User.findByIdAndUpdate({ _id: userId }, { ...req?.body });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  await User.findByIdAndDelete({ _id: userId });

  res.status(200).json({ msg: "user deleted successfully" });
});

export { getUser, updateUser, deleteUser };
