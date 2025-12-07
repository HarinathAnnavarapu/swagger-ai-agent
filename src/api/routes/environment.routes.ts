import express from "express";
import EnvironmentController from "../controllers/environment.controller";

const router = express.Router();

// Create environment
router.post("/environment", (req, res) => EnvironmentController.create(req, res));

// List environments by spec
router.get("/spec/:specId/environments", (req, res) => EnvironmentController.listBySpec(req, res));

// Get environment
router.get("/environment/:envId", (req, res) => EnvironmentController.get(req, res));

// Update environment
router.put("/environment/:envId", (req, res) => EnvironmentController.update(req, res));

// Delete environment
router.delete("/environment/:envId", (req, res) => EnvironmentController.delete(req, res));

export default router;
