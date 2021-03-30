import express from "express";

import AuthController from "../controllers/AuthController";
import { ILogin } from "../models/Interfaces";
import { getServerError, getGuid } from "../utils/Functions";

const router = express.Router();

router.post("/login", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body as Pick<ILogin, "username" | "password">
        const controller = new AuthController();
        const response = await controller.login(body.username, body.password);
        return res.send(response);
    } catch(error) {
        console.error("error in /login", error);
        const serverError = await getServerError(guid);
        return res.send(serverError);
    }
});

export default router;