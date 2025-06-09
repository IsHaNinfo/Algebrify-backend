import express from "express";
import pointController from "../controllers/point.controller.js";
const router = express.Router();
import { authenticate } from "../middleware/auth.middleware.js";

router.post("/create", authenticate, pointController.create);
router.get("/getAll",  pointController.getAll);

export default router; 