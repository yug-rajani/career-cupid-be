import * as userController from "../users/UserController";
import { Router } from "express";

const router = Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
