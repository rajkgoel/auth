//npm libraries
import * as jwt from "jsonwebtoken";
import moment from "moment";

//Edneed objects
import Users, { IUser } from "../models/Users";
import { IError } from "../models/Interfaces";
import Tokens, { IToken } from "../models/Tokens";
import * as constants from "../utils/Constants";

export default class AuthController {

    public async login(username: string, password: string): Promise<IUser | IError> {
        const user = await this.getUser(username, password);

        if (user) {
            const userToken = await this.getNewToken(user);
            user.token = userToken.token;
            user.refreshToken = userToken.refreshToken
            return user;
        } else {
            return { 
                status: 401, 
                statusText: constants.FAILED, 
                message: constants.UNAUTHORIZED_USER 
            }
        }
    }

    public async isTokenValid(username: string, token: string): Promise<boolean> {
        return true;
    }

    private getUser = async (username: string, password: string): Promise<IUser | null> => {
        const user = await Users.findOne({ "username": username, "password": password });
        return user;
    }

    private getNewToken = async(user: IUser): Promise<IToken> => {
        const accessToken = jwt.sign({ username: user.username, role: user.role },
            constants.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role },
            constants.REFRESH_TOKEN_SECRET);
        const expiryDate = moment().utc();

        const token: IToken = new Tokens({
            id: Date.now().toString(),
            username: user.username,
            token: accessToken,
            refreshToken: refreshToken,
            tokenExpiryAt: expiryDate.add(constants.TOKEN_EXPIRY_IN_MINUTES, "minutes"),
            refreshTokenExpiryAt: expiryDate.add(constants.REFRESH_TOKEN_EXPIRY_IN_MINUTES, "minutes")
        })
    
        const newToken: IToken = await token.save();
        return newToken;
    }
}