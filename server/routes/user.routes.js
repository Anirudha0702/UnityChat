import express from "express"
import { Register ,getUserByKey} from "../controllers/user.controller.js"

const router = express.Router()
router.post("/register",Register);
router.get("/find",getUserByKey);
export default router;