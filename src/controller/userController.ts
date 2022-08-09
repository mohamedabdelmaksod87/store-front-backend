import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const user = new UserModel();

const fetchAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const fetchUser = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await user.show(req.params.id);
    if (!result)
      return res.status(404).json({ error: `requested user doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashpwd = await bcrypt.hash(
      `${req.body.password}${process.env.PEPPER}`,
      10
    );
    const info = {
      hashpwd,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    const result = await user.create(info);
    const token = jwt.sign(result, process.env.TOKEN_SECRET as string);
    res.status(201).json({ token, result });
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

export default {
  fetchAllUsers,
  fetchUser,
  createUser,
};
