import { Document, model, Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        username: String,
        token: String,
        refreshToken: String,
        tokenExpiryAt: Date,
        refreshTokenExpiryAt: Date,
    },
    { timestamps: true }
);

export interface IToken extends Document {
    username: string;
    token: string;
    refreshToken: string;
    tokenExpiryAt: Date;
    refreshTokenExpiryAt: Date;
}

export default model<IToken>("Token", tokenSchema);
