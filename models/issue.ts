import { Types } from "mongoose";
import { Schema } from "mongoose";
import { model } from "mongoose";
import { Model } from "mongoose";
export interface IIssue {
  title: String;
  descrption: String;
  priority: Number;
  user: Types.ObjectId;
  createdAt: Date;
}
const IssueSchema = new Schema<IIssue>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  descrption: {
    type: String,
    required: [true, "Description is required"],
  },
  priority: {
    type: Number,
    required: [true, "Priority is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Issue: Model<IIssue> = model<IIssue>("Issue", IssueSchema);
export default Issue;
