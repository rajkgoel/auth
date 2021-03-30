import {Document, model, Schema} from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  role: String,
  modified_on: Date
});

export interface IUser extends Document {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;
    modified_on?: Date;
    token?: string;
    refreshToken?: string;
    userRoles?: string[];
}

export default model<IUser>("User", userSchema);
