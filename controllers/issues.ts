import { Request, Response } from "express";
import { IIssue } from "../models/issue";
import { ObjectId } from "mongoose";
import Issue from "../models/issue";
export const postNewIssue = async (req: Request, res: Response) => {
  const { title, descrption, priority }: IIssue = req.body;
  const userId: ObjectId = req.body.usuarioConfirmado._id;
  const issueData = {
    title,
    descrption,
    priority,
    createdAt: new Date(),
    user: userId,
  };

  const issue = new Issue(issueData);
  await issue.save();
  res.status(201).json({
    message: "Issue created",
    data: issue,
  });
};
