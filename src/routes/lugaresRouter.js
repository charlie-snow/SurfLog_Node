import express from "express";
import lugaresController from "../controllers/lugaresController.js";

const router = express.Router();

router.get("/lugares", lugaresController);

export default router;
