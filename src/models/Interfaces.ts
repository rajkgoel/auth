export interface ILogin {
    username: string;
    password: string;
}

export interface IError {
    status: number;
    statusText: string;
    message: string
}

// export interface IUser {
//     username: string;
//     firstname: string;
//     lastname: string
//     userRoles: IRole[];
//     token: string;
//     refreshToken: string;
//     tokenValidity?: Date;
//     refreshTokenValidity?: Date;
// }

// export interface IRole {
//     roleId: number;
//     roleName: string;
//     roleDescription: string;
// }